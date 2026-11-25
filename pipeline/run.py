#!/usr/bin/env python3
"""Market Research Hub - weekly ingestion pipeline (stdlib only, Python 3.9+).

    python3 pipeline/run.py                 # weekly run: last 14 days, merged into store
    python3 pipeline/run.py --backfill 10   # seed: last 10 weeks
    python3 pipeline/run.py --republish     # re-classify and rewrite site/data from store

Fetch -> normalise -> de-duplicate -> classify (pillar / horizon / empirical / methods)
-> summarise -> score -> write site/data/{index.json, issues/<week>.json}.

Summaries are extractive (verbatim from abstract / publisher text). If ANTHROPIC_API_KEY
is set and `anthropic` is installed, new items with abstracts also receive plain-language
EN & FA summaries and a key finding.
"""
import argparse
import concurrent.futures as cf
import datetime as dt
import hashlib
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

sys.path.insert(0, os.path.dirname(__file__))
import sources as S  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STORE = os.path.join(ROOT, "data", "store.json")
OUT = os.path.join(ROOT, "site", "data")
UA = "Mozilla/5.0 (compatible; MarketResearchHub/1.0; equity research observatory)"
KEEP_WEEKS = 26

# ------------------------------------------------------------------ taxonomy
TOPICS = {
    "winners": (
        "Winners & Indexing",
        r"index(ing| funds?)?|passive(ly)?|active management|stock pick|stock select|wealth creation|bessembinder|skew(ness|ed)|power law|outperform|beat(ing)? the (market|index)|spiva|s&p 500|benchmark|concentration|top \d+%? (of )?stocks|equity (risk )?premium|factor invest|fama.french|alpha\b|portfolio concentration|diversif|winner|compounder|tenbagger|long.term (stock )?returns?|historical returns?"
    ),
    "moats": (
        "Quality & Moats",
        r"economic moat|moat\b|competitive advantage|business quality|quality (factor|stocks?|minus junk|investing)|return on invested capital|\broic\b|\broe\b|gross profitab|profitab|earnings growth|\beps\b|earnings per share|earnings persistence|capital allocation|reinvestment|compound(ing)?|free cash flow|\bfcf\b|cash flow|owner earnings|pricing power|switching cost|network effect|intangible|balance sheet|durable|wide moat|franchise|compound annual|peter lynch|mauboussin|base rate"
    ),
    "valuation": (
        "Valuation & Safety",
        r"valuation|intrinsic value|margin of safety|value invest|fundamental (analysis|investing|value)|price.to.earnings|\bp/e\b|\bcape\b|multiple|discount(ed)? cash flow|\bdcf\b|cost of capital|mispric|undervalu|overpric|growth (stocks?|trap)|value (stocks?|premium|factor)|great compan|good (stock|investment)|narrative and numbers|damodaran|buffett|benjamin graham|capex|artificial intelligence|\bai\b.*(stock|equit|valuat|bubble|return|capex)|industry growth|technological revolution|expected return"
    ),
    "bubbles": (
        "Bubbles & Behavior",
        r"bubble|speculat|euphoria|manias?|crash|boom.and.bust|run.up|exuberan|overvalu|fomo|herding|herd behav|behavioral finance|behavioural finance|investor sentiment|sentiment|cognitive bias|overconfidence|loss aversion|disposition effect|mr\.? market|pendulum|market cycle|volatility|drawdown|panic|greed|fear|retail investor|meme stock|narrative|hype|shleifer|greenwood|shiller|howard marks|second.level thinking|anomal"
    ),
}
TOPIC_RE = {k: re.compile(v, re.I) for k, (_, v) in TOPICS.items()}
TOPIC_W = {"winners": 1.35, "moats": 1.65, "valuation": 1.35, "bubbles": 1.45}

DOMAIN_RE = re.compile(
    r"\b(stock|stocks|equit(y|ies)|shareholder|investing|investor|investors|valuation|asset pricing|portfolio|index fund|indexing|s&p 500|earnings|\beps\b|\broic\b|moat|margin of safety|value investing|fundamental analysis|capital allocation|market bubble|asset bubble|speculative|behavioral finance|behavioural finance|equity premium|stock market|financial market|active management|passive investing|wealth creation|dividend|cash flow|profitability|price.to.earnings|p/e ratio|buffett|peter lynch|bessembinder|fama|shiller|damodaran|mauboussin|howard marks)\b",
    re.I,
)
NOISE_RE = re.compile(
    r"press release|\bsponsored\b|^erratum|^corrigendum|^correction|retraction|"
    r"\((audio|video|podcast)\)|podcast episode|webinar|register now|"
    r"earnings call transcript|q[1-4] 20\d\d (results|earnings)|form 10-[kq]|"
    r"\b(buy|sell) (this|these) \d+ stocks?\b|top \d+ stocks to buy|best stocks to buy|"
    r"price target (raised|cut|lowered)|initiates coverage|upgrades? to buy|downgrades? to sell|"
    r"\bforex\b|\bcrypto\s+casino\b|gambling|betting|"
    r"\bjobs? at\b|careers? at|we.re hiring|internship in ",
    re.I,
)
DEDICATED_INVESTING_PUBS = {
    "Oaktree Capital", "AQR Capital Management", "GMO", "Research Affiliates",
    "Verdad Research", "Musings on Markets (Damodaran)", "Alpha Architect",
    "CFA Institute Enterprising Investor", "Collaborative Fund", "A Wealth of Common Sense",
    "Behavioural Investment", "Klement on Investing", "Of Dollars And Data",
    "Novel Investor", "Dimensional Fund Advisors", "Vanguard Research", "Morningstar",
    "Man Institute", "S&P Dow Jones Indices", "Counterpoint Global",
    "The Journal of Finance", "Journal of Financial Economics",
    "The Review of Financial Studies", "Financial Analysts Journal",
    "The Journal of Portfolio Management", "Journal of Behavioral Finance",
    "Review of Finance", "Review of Asset Pricing Studies",
}
EN_RE = re.compile(r"\b(the|of|and|in|for|to|with|on|among|a|an|is|are|from|by)\b", re.I)
GOOD_PUB = re.compile(
    r"journal of finance|journal of financial economics|review of financial studies|"
    r"financial analysts journal|journal of portfolio management|journal of behavioral finance|"
    r"review of finance|review of asset pricing|journal of corporate finance|journal of banking|"
    r"nber|national bureau of economic|bis|bank for international settlements|federal reserve|"
    r"cfa institute|counterpoint global|morgan stanley|oaktree|aqr|gmo|research affiliates|"
    r"verdad|damodaran|alpha architect|collaborative fund|vanguard|dimensional|morningstar|"
    r"man institute|s&p dow jones|blackrock|goldman sachs|financial times|economist|harvard|"
    r"oxford|wiley|elsevier|cambridge|springer|taylor|informs|chicago|mit press",
    re.I,
)

LONG_HORIZON_RE = re.compile(
    r"long.term|long.horizon|5.year|10.year|multi.decade|decade|century|historical|"
    r"19\d\d|compounding|compounder|wealth creation|persistence|sustainable|durable|moat|"
    r"structural|secular|buy and hold|patient capital|intergenerational|life.?cycle|base rate",
    re.I,
)
EMPIRICAL_RE = re.compile(
    r"empirical|evidence|backtest|sample of|panel data|cross.section|longitudinal|"
    r"regression|difference.in.differences|event study|dataset|crsp|compustat|"
    r"historical data|t.stat|statistically significant|out.of.sample|factor model|"
    r"spiva|scorecard|meta.analysis|systematic review|19\d\d.{0,12}20\d\d",
    re.I,
)

METHODS = [
    ("Long-horizon empirical", r"long.horizon|multi.decade|crsp|19\d\d.{0,15}20\d\d|century|wealth creation"),
    ("Factor / Cross-sectional", r"factor (model|investing|premium)|cross.section|fama.french|sorting|decile|quintile|alpha\b"),
    ("Valuation model", r"discounted cash flow|\bdcf\b|intrinsic value|valuation model|price.to.earnings|\bcape\b|multiples?"),
    ("Behavioral / Experimental", r"behavioral|behavioural|experiment|survey|sentiment|cognitive|bias|psychology|herding"),
    ("Event study", r"event study|abnormal return|announcement|crash|run.up|bubble"),
    ("Econometric", r"regression|panel data|difference.in.differences|instrumental variable|fixed effects|time.series"),
    ("AI & Text mining", r"machine learning|large language model|\bllm\b|natural language processing|text mining|neural network"),
    ("Simulation", r"monte carlo|bootstrap|simulation|agent.based"),
    ("Meta-analysis / Review", r"systematic review|meta.analys|literature review|survey of the literature"),
]
METHOD_RE = [(n, re.compile(p, re.I)) for n, p in METHODS]
FINDING_RE = re.compile(
    r"\b(found|find|show(s|ed)?|reveal|suggest|indicat|demonstrat|outperform|underperform|"
    r"explain|account(s|ed)? for|predict|associat|increas|decreas|reduc|higher|lower|"
    r"more likely|less likely|probabilit|significant|\d+(\.\d+)?\s?%)\b",
    re.I,
)

# ------------------------------------------------------------------ helpers
def log(*a):
    print(*a, file=sys.stderr, flush=True)


def get(url, accept="*/*", timeout=35, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": accept})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.4 * (i + 1))
    raise last


def clean(text):
    if not text:
        return ""
    text = html.unescape(re.sub(r"<[^>]+>", " ", str(text)))
    text = re.sub(r"\s+", " ", text).strip()
    return text


def norm_title(t):
    return re.sub(r"[^a-z0-9]", "", (t or "").lower())[:120]


def iso_week(d):
    y, w, _ = d.isocalendar()
    return "%d-W%02d" % (y, w)


def week_bounds(week):
    y, w = week.split("-W")
    monday = dt.date.fromisocalendar(int(y), int(w), 1)
    return monday, monday + dt.timedelta(days=6)


def parse_date(s):
    if not s:
        return None
    s = s.strip()
    try:
        return parsedate_to_datetime(s).date()
    except Exception:  # noqa: BLE001
        pass
    for fmt in ("%a, %d %b %Y", "%d %b %Y", "%a, %d %B %Y"):
        try:
            return dt.datetime.strptime(s[: len(dt.date.today().strftime(fmt)) + 3].strip(), fmt).date()
        except ValueError:
            pass
    m = re.match(r"(\d{4})-(\d{2})-(\d{2})", s)
    if m:
        try:
            return dt.date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
        except ValueError:
            return None
    return None


def trim(s, n):
    s = (s or "").strip()
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(" ", 1)[0]
    return cut.rstrip(",;:") + "…"


def sentences(text):
    text = re.sub(
        r"\b(BACKGROUND|OBJECTIVES?|AIMS?|METHODS?|RESULTS?|FINDINGS|CONCLUSIONS?|IMPLICATIONS?|PURPOSE|ABSTRACT)\s*[:.]",
        r"\n\1: ",
        text,
        flags=re.I,
    )
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z(“\"])|\n", text)
    return [p.strip() for p in parts if len(p.strip()) > 28]


def extractive(text, title=""):
    """Return (summary, key_finding) using verbatim sentences from source text."""
    sents = sentences(text)
    if not sents:
        return "", ""
    lab = lambda s: re.match(r"(\w+):\s*", s)  # noqa: E731

    def strip_label(s):
        s = re.sub(r"^\w+:\s*", "", s).strip()
        return re.sub(r"^(Abstract|Background|Purpose|Methods?|Results?|Findings|Conclusions?)\s+(?=[A-Z])", "", s).strip()

    concl = [s for s in sents if lab(s) and lab(s).group(1).lower().startswith(("conclu", "implic"))]
    results = [s for s in sents if lab(s) and lab(s).group(1).lower().startswith(("result", "finding"))]
    scored = sorted(
        ((len(FINDING_RE.findall(s)) - (0.35 if i == 0 else 0), i, s) for i, s in enumerate(sents)),
        reverse=True,
    )
    finding = strip_label((results or [x[2] for x in scored])[0])
    if concl:
        summary = strip_label(concl[0])
    else:
        first = strip_label(sents[0])
        summary = first if first != finding else (strip_label(sents[1]) if len(sents) > 1 else first)
    return trim(summary, 320), trim(finding, 260)


def classify(item):
    text = " ".join([item["title"], item["title"], item.get("abstract", ""), " ".join(item.get("keywords", []))])
    scores = {
        k: round((len(r.findall(text)) + 2 * len(r.findall(item["title"]))) * TOPIC_W[k], 2)
        for k, r in TOPIC_RE.items()
    }
    topics = [k for k, v in sorted(scores.items(), key=lambda kv: -kv[1]) if v > 0]
    dedicated = item.get("publisher") in DEDICATED_INVESTING_PUBS
    if not topics and dedicated:
        if re.search(r"\bai\b|artificial intelligence|tech|ipo|price|cost|value", text, re.I):
            topics, scores["valuation"] = ["valuation"], 2.0
        elif re.search(r"risk|fear|greed|crash|volatil|recession|macro|credit|debt", text, re.I):
            topics, scores["bubbles"] = ["bubbles"], 2.0
        elif re.search(r"business|company|firm|ceo|management|margin|profit|quality", text, re.I):
            topics, scores["moats"] = ["moats"], 2.0
        elif re.search(r"stock|equit|market|invest|fund|return|portfolio|wealth|etf", text, re.I):
            topics, scores["winners"] = ["winners"], 2.0
    item["topics"] = topics[:3]
    item["topic"] = topics[0] if topics else None
    item["topic_score"] = scores[topics[0]] if topics else 0
    item["horizon"] = "long_term" if LONG_HORIZON_RE.search(text) else "general"
    item["empirical"] = bool(EMPIRICAL_RE.search(text)) or item["kind"] == "paper"
    item["methods"] = [n for n, r in METHOD_RE if r.search(text)][:3]
    title_dom = bool(DOMAIN_RE.search(item["title"]))
    item["core"] = title_dom or len(DOMAIN_RE.findall(item.get("abstract", ""))) >= 2 or (dedicated and bool(topics))
    words = item["title"].split()
    en = len(EN_RE.findall(item["title"])) / max(len(words), 1)
    item["noise"] = (
        bool(NOISE_RE.search(item["title"]))
        or (len(words) > 5 and en < 0.08)
        or bool(re.search(r"[^\x00-\u024F\u2010-\u206F€£¥%$]", item["title"]))
    )
    return item


def relevant(item, strict):
    if not item["topic"] or not item["core"] or item.get("noise"):
        return False
    if strict:
        return bool(DOMAIN_RE.search(item["title"])) and item["topic_score"] >= 2.0
    return True


def make_id(item):
    key = (item.get("doi") or "").lower() or norm_title(item["title"])
    return hashlib.sha1(key.encode()).hexdigest()[:12]


def base_item(**kw):
    it = {
        "title": "", "url": "", "publisher": "", "venue": "", "kind": "paper", "date": None,
        "authors": [], "countries": [], "abstract": "", "keywords": [], "doi": "",
        "oa": False, "cited": 0, "access": "abstract", "via": "",
    }
    it.update(kw)
    it["title"] = clean(it["title"]).rstrip(".")
    it["abstract"] = clean(it["abstract"])
    return it


# ------------------------------------------------------------------ fetchers
def openalex_abstract(inv):
    if not inv:
        return ""
    pos = [(i, w) for w, idxs in inv.items() for i in idxs]
    return " ".join(w for _, w in sorted(pos))


def fetch_openalex(query, since, until, cap=250):
    out, cursor = [], "*"
    sel = "id,doi,title,publication_date,type,authorships,primary_location,open_access,cited_by_count,abstract_inverted_index,keywords"
    while cursor and len(out) < cap:
        params = {
            "filter": "title_and_abstract.search:%s,from_publication_date:%s,to_publication_date:%s,type:article|review|preprint|report|book-chapter,is_retracted:false"
            % (query, since, until),
            "per-page": "200",
            "cursor": cursor,
            "select": sel,
            "mailto": "market-research-hub@users.noreply.github.com",
        }
        if os.environ.get("OPENALEX_API_KEY"):
            params["api_key"] = os.environ["OPENALEX_API_KEY"]
        url = "https://api.openalex.org/works?" + urllib.parse.urlencode(params)
        try:
            data = json.loads(get(url, "application/json", timeout=30, tries=2))
        except Exception as e:  # noqa: BLE001
            log("  openalex fail", query, str(e)[:100])
            break
        for w in data.get("results", []):
            loc = w.get("primary_location") or {}
            src = loc.get("source") or {}
            countries = sorted({c for a in (w.get("authorships") or []) for c in (a.get("countries") or [])})
            authors = [((a.get("author") or {}).get("display_name") or "") for a in (w.get("authorships") or [])][:8]
            doi = (w.get("doi") or "").replace("https://doi.org/", "")
            kind = "preprint" if w.get("type") == "preprint" else ("report" if w.get("type") == "report" else "paper")
            abstract = openalex_abstract(w.get("abstract_inverted_index"))
            out.append(base_item(
                title=w.get("title") or "",
                url=(w.get("doi") or loc.get("landing_page_url") or w.get("id")),
                publisher=src.get("host_organization_name") or src.get("display_name") or "Journal",
                venue=src.get("display_name") or "",
                kind=kind,
                date=w.get("publication_date"),
                authors=[a for a in authors if a],
                countries=countries,
                abstract=abstract,
                keywords=[k.get("display_name", "") for k in (w.get("keywords") or [])][:6],
                doi=doi,
                oa=bool((w.get("open_access") or {}).get("is_oa")),
                cited=w.get("cited_by_count") or 0,
                access="abstract" if abstract else "headline",
                via="OpenAlex",
            ))
        cursor = (data.get("meta") or {}).get("next_cursor")
        if len(data.get("results", [])) < 200:
            break
    return out


def _crossref_date(item):
    for key in ("published-online", "published-print", "issued", "created"):
        parts = (item.get(key) or {}).get("date-parts") or []
        if parts and parts[0]:
            p = parts[0]
            y = p[0]
            m = p[1] if len(p) > 1 else 1
            d = p[2] if len(p) > 2 else 1
            try:
                return dt.date(int(y), int(m), int(d)).isoformat()
            except ValueError:
                continue
    return None


def fetch_crossref_journal(j, since, until):
    time.sleep(0.35)
    params = {
        "filter": f"from-pub-date:{since},until-pub-date:{until},type:journal-article",
        "rows": "100",
        "sort": "published",
        "order": "desc",
        "mailto": "market-research-hub@users.noreply.github.com",
    }
    url = f"https://api.crossref.org/journals/{j['issn']}/works?" + urllib.parse.urlencode(params)
    out = []
    try:
        data = json.loads(get(url, "application/json", timeout=30, tries=2))
    except Exception as e:  # noqa: BLE001
        log("  crossref fail", j["journal"], str(e)[:100])
        return out
    for w in (data.get("message") or {}).get("items", []):
        title = (w.get("title") or [""])[0]
        if not title:
            continue
        doi = w.get("DOI") or ""
        pub_date = _crossref_date(w)
        if not pub_date or not (since <= pub_date <= until):
            continue
        authors = []
        for a in (w.get("author") or [])[:8]:
            nm = " ".join(x for x in (a.get("given"), a.get("family")) if x)
            if nm:
                authors.append(nm)
        abstract = clean(w.get("abstract") or "")
        out.append(base_item(
            title=title,
            url=("https://doi.org/" + doi) if doi else (w.get("URL") or ""),
            publisher=j["journal"],
            venue=j["journal"],
            kind="paper",
            date=pub_date,
            authors=authors,
            countries=[j["country"]],
            abstract=abstract,
            doi=doi,
            cited=w.get("is-referenced-by-count") or 0,
            access="abstract" if abstract else "headline",
            via="Crossref",
        ))
    return out


def fetch_arxiv(query, since, until):
    url = "https://export.arxiv.org/api/query?" + urllib.parse.urlencode({
        "search_query": query,
        "sortBy": "submittedDate",
        "sortOrder": "descending",
        "max_results": "120",
    })
    out = []
    try:
        root = ET.fromstring(get(url, timeout=35, tries=2))
    except Exception as e:  # noqa: BLE001
        log("  arxiv fail", str(e)[:100])
        return out
    ns = {"a": "http://www.w3.org/2005/Atom"}
    for e in root.findall("a:entry", ns):
        d = parse_date(e.findtext("a:published", "", ns))
        if not d or not (since <= d.isoformat() <= until):
            continue
        out.append(base_item(
            title=e.findtext("a:title", "", ns),
            url=e.findtext("a:id", "", ns),
            publisher="arXiv (q-fin)",
            venue="arXiv",
            kind="preprint",
            date=d.isoformat(),
            authors=[a.findtext("a:name", "", ns) for a in e.findall("a:author", ns)][:8],
            abstract=e.findtext("a:summary", "", ns),
            oa=True,
            access="full",
            via="arXiv",
        ))
    return out


def _local(tag):
    return tag.rsplit("}", 1)[-1].lower()


def parse_feed(raw):
    root = ET.fromstring(raw)
    items = []
    for node in root.iter():
        if _local(node.tag) not in ("item", "entry"):
            continue
        rec = {"title": "", "link": "", "date": "", "text": "", "authors": []}
        for ch in node:
            t = _local(ch.tag)
            if t == "title":
                rec["title"] = "".join(ch.itertext())
            elif t == "link":
                href = ch.get("href") or (ch.text or "")
                rel = ch.get("rel") or ""
                if href and (not rec["link"] or rel == "alternate"):
                    rec["link"] = href
            elif t in ("pubdate", "published", "updated", "date") and not rec["date"]:
                rec["date"] = ch.text or ""
            elif t in ("description", "summary", "encoded", "content"):
                txt = "".join(ch.itertext())
                if len(txt) > len(rec["text"]):
                    rec["text"] = txt
            elif t in ("author", "creator"):
                nm = clean("".join(ch.itertext()))
                if nm and "@" not in nm:
                    rec["authors"].append(nm)
        items.append(rec)
    return items


def fetch_feed(f, since, until):
    out = []
    try:
        recs = parse_feed(get(f["url"], "application/rss+xml, application/atom+xml, application/xml, text/xml", timeout=25, tries=2))
    except Exception as e:  # noqa: BLE001
        log("  feed fail", f["publisher"], str(e)[:90])
        return out
    for r in recs:
        d = parse_date(r["date"])
        if not d or not (since <= d.isoformat() <= until):
            continue
        text = clean(r["text"])
        if text.lower().startswith(clean(r["title"]).lower()[:40]) and len(text) < len(r["title"]) + 35:
            text = ""
        it = base_item(
            title=r["title"],
            url=r["link"].strip(),
            publisher=f["publisher"],
            venue=f["publisher"],
            kind=f["kind"],
            date=d.isoformat(),
            authors=r["authors"][:5],
            countries=[f["country"]],
            abstract=text[:3000],
            access="summary" if text else "headline",
            via="RSS",
        )
        it["_strict"] = f["strict"]
        out.append(it)
    return out


def fetch_news_site(q, days, since, until):
    query = "site:%s %s when:%dd" % (q["site"], S.TOPIC_OR, days)
    url = "https://news.google.com/rss/search?" + urllib.parse.urlencode(
        {"q": query, "hl": "en-US", "gl": "US", "ceid": "US:en"}
    )
    out = []
    try:
        recs = parse_feed(get(url, timeout=25, tries=2))
    except Exception as e:  # noqa: BLE001
        log("  news fail", q["publisher"], str(e)[:90])
        return out
    for r in recs:
        d = parse_date(r["date"])
        if not d or not (since <= d.isoformat() <= until):
            continue
        title = re.sub(r"\s+[-|–—]\s+[^-|–—]{2,65}$", "", clean(r["title"]))
        it = base_item(
            title=title,
            url=r["link"].strip(),
            publisher=q["publisher"],
            venue=q["publisher"],
            kind=q["kind"],
            date=d.isoformat(),
            countries=[q["country"]],
            access="headline",
            via="News index",
        )
        it["_strict"] = False
        out.append(it)
    return out


# ------------------------------------------------------------------ optional LLM summaries
def claude_summaries(items):
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key or os.environ.get("MRH_NO_LLM"):
        return 0
    try:
        import anthropic  # type: ignore
    except ImportError:
        log("  anthropic package not installed - extractive summaries only")
        return 0
    model = os.environ.get("MRH_MODEL", "claude-sonnet-4-5")
    client = anthropic.Anthropic()
    todo = [i for i in items if not i.get("llm") and len(i.get("abstract", "")) > 260][
        : int(os.environ.get("MRH_LLM_MAX", "200"))
    ]
    system = (
        "You summarise equity and fundamental investing research for long-term investors. "
        "Use ONLY facts present in the text. Reply with strict JSON only: "
        '{"summary": "<=2 clear EN sentences, max 45 words", '
        '"finding": "single most concrete empirical result in EN, max 30 words", '
        '"summary_fa": "natural Persian (Farsi) summary keeping finance terms like Margin of Safety, ROIC, EPS, Index, Economic Moat, Skewness in English, max 45 words"}'
    )

    def one(it):
        try:
            msg = client.messages.create(
                model=model,
                max_tokens=500,
                system=system,
                messages=[{"role": "user", "content": "Title: %s\n\nText: %s" % (it["title"], it["abstract"][:3800])}],
            )
            txt = "".join(b.text for b in msg.content if getattr(b, "type", "") == "text")
            data = json.loads(re.search(r"\{.*\}", txt, re.S).group(0))
            if data.get("summary"):
                it["summary"] = trim(data["summary"], 320)
                it["finding"] = trim(data.get("finding") or it.get("finding", ""), 260)
                if data.get("summary_fa"):
                    it["summary_fa"] = trim(data["summary_fa"], 340)
                it["llm"] = True
                return True
        except Exception as e:  # noqa: BLE001
            log("  llm fail", str(e)[:120])
        return False

    with cf.ThreadPoolExecutor(5) as ex:
        n = sum(ex.map(one, todo))
    log("  Claude summaries:", n)
    return n


# ------------------------------------------------------------------ scoring
KIND_W = {"paper": 1.05, "report": 1.15, "insight": 1.0, "preprint": 0.8, "news": 0.55}
MARQUEE = {
    "The Journal of Finance", "Journal of Financial Economics", "The Review of Financial Studies",
    "Financial Analysts Journal", "The Journal of Portfolio Management", "Journal of Behavioral Finance",
    "Review of Finance", "Review of Asset Pricing Studies", "Journal of Corporate Finance",
    "NBER Working Papers", "BIS Working Papers", "Liberty Street Economics (NY Fed)",
    "Counterpoint Global", "Oaktree Capital", "AQR Capital Management", "GMO",
    "Research Affiliates", "Verdad Research", "Musings on Markets (Damodaran)",
    "CFA Institute Enterprising Investor", "Alpha Architect", "Collaborative Fund",
    "Klement on Investing", "A Wealth of Common Sense", "Behavioural Investment",
    "Of Dollars And Data", "Vanguard Research", "Dimensional Fund Advisors",
    "Morningstar", "Man Institute", "S&P Dow Jones Indices", "arXiv (q-fin)",
}
LOW_SIGNAL_PUB = re.compile(r"yashwant|multidisciplinary.*research|international journal of (research|scientific|innovative|multidisciplinary)|rsis|iconic research|edtech|ijrpr|ijfmr", re.I)


def score(it):
    s = KIND_W.get(it["kind"], 0.6) * 2
    s += min(it["topic_score"], 10) * 0.3
    s += 0.85 if it["access"] in ("abstract", "full", "summary") else 0
    s += 0.4 if it["oa"] else 0
    s += min(it["cited"], 60) ** 0.5 * 0.35
    s += 0.7 if it["horizon"] == "long_term" else 0
    s += 0.55 if it["empirical"] else 0
    s += 0.45 if it["methods"] else 0
    s += 1.0 if GOOD_PUB.search(it.get("publisher", "") + " " + it.get("venue", "")) else -0.4
    s += 0.65 if DOMAIN_RE.search(it["title"]) else 0
    s += 1.45 if it["publisher"] in MARQUEE else 0
    if LOW_SIGNAL_PUB.search(it.get("publisher", "") + " " + it.get("venue", "")):
        s -= 2.2
    return round(s, 3)


# ------------------------------------------------------------------ main
def collect(since, until, days):
    jobs = []
    oa = cf.ThreadPoolExecutor(2)
    xr = cf.ThreadPoolExecutor(1)  # polite sequential Crossref requests
    arx = cf.ThreadPoolExecutor(1)  # polite sequential arXiv requests
    with cf.ThreadPoolExecutor(8) as ex:
        for q in S.OPENALEX_QUERIES:
            jobs.append(("OpenAlex " + q, oa.submit(fetch_openalex, q, since, until)))
        for j in S.CROSSREF_JOURNALS:
            jobs.append(("Crossref " + j["journal"], xr.submit(fetch_crossref_journal, j, since, until)))
        for idx, q in enumerate(S.ARXIV_QUERIES):
            jobs.append((f"arXiv #{idx + 1}", arx.submit(fetch_arxiv, q, since, until)))
        for f in S.FEEDS:
            jobs.append(("Feed " + f["publisher"], ex.submit(fetch_feed, f, since, until)))
        for q in S.NEWS_SITE_QUERIES:
            jobs.append(("News " + q["publisher"], ex.submit(fetch_news_site, q, days, since, until)))
        raw, health = [], {}
        for name, fut in jobs:
            res = fut.result()
            health[name] = len(res)
            raw.extend(res)
    oa.shutdown(wait=False)
    xr.shutdown(wait=False)
    arx.shutdown(wait=False)
    return raw, health


def run(backfill_weeks=None):
    today = dt.date.today()
    days = backfill_weeks * 7 if backfill_weeks else 14
    since, until = (today - dt.timedelta(days=days)).isoformat(), today.isoformat()
    log("Window %s -> %s" % (since, until))
    raw, health = collect(since, until, days)
    log("Fetched %d raw records" % len(raw))

    store = {}
    if os.path.exists(STORE):
        with open(STORE) as fh:
            store = {i["id"]: i for i in json.load(fh)}

    seen_titles = {norm_title(i["title"]): k for k, i in store.items()}
    added = 0
    for it in raw:
        if not it["title"] or len(it["title"]) < 14 or not it.get("date"):
            continue
        d = parse_date(it["date"])
        if not d or d > today:
            continue
        it["date"] = d.isoformat()
        classify(it)
        if not relevant(it, it.pop("_strict", False) if "_strict" in it else False):
            continue
        it["id"] = make_id(it)
        nt = norm_title(it["title"])
        existing = store.get(it["id"]) or store.get(seen_titles.get(nt, ""))
        if existing:
            if len(it["abstract"]) > len(existing.get("abstract", "")):
                for k in ("abstract", "access", "keywords"):
                    existing[k] = it[k]
                existing.pop("llm", None)
            existing["countries"] = sorted(set(existing.get("countries", [])) | set(it["countries"]))
            existing["cited"] = max(existing.get("cited", 0), it["cited"])
            existing["oa"] = existing.get("oa") or it["oa"]
            continue
        it["added"] = today.isoformat()
        store[it["id"]] = it
        seen_titles[nt] = it["id"]
        added += 1
    log("New items: %d  (store %d)" % (added, len(store)))

    items = list(store.values())
    cutoff = (today - dt.timedelta(weeks=KEEP_WEEKS)).isoformat()
    items = [i for i in items if i["date"] >= cutoff]
    for it in items:
        classify(it)
        if not it.get("llm"):
            it["summary"], it["finding"] = extractive(it.get("abstract", ""), it["title"])
            if it["access"] == "summary" and not it["summary"]:
                it["summary"] = trim(it["abstract"], 320)
        it["score"] = score(it)
        it["week"] = iso_week(dt.date.fromisoformat(it["date"]))
    claude_summaries(items)

    os.makedirs(os.path.dirname(STORE), exist_ok=True)
    with open(STORE, "w") as fh:
        json.dump(sorted(items, key=lambda i: i["date"], reverse=True), fh, ensure_ascii=False, separators=(",", ":"))
    publish(items, health, today)
    try:
        import logos
        logos.update()
    except Exception as e:
        log("logos skipped", e)


STRICT_PUBS = {f["publisher"] for f in S.FEEDS if f["strict"]}
PUBLIC_FIELDS = (
    "id", "title", "url", "publisher", "venue", "kind", "date", "authors", "countries",
    "topic", "topics", "horizon", "empirical", "methods", "summary", "summary_fa",
    "finding", "oa", "cited", "access", "score", "doi", "llm",
)
PER_TOPIC = 40


def curate(week_items):
    out, seen = [], {}
    for it in sorted(week_items, key=lambda i: -i["score"]):
        t = it.get("topic")
        if t not in TOPICS or seen.get(t, 0) >= PER_TOPIC:
            continue
        seen[t] = seen.get(t, 0) + 1
        out.append(it)
    return out


def publish(items, health, today):
    iss_dir = os.path.join(OUT, "issues")
    os.makedirs(iss_dir, exist_ok=True)
    by_week = {}
    for it in items:
        by_week.setdefault(it["week"], []).append(it)
    current = iso_week(today)
    weeks = sorted([w for w in by_week if w != current and len(by_week[w]) >= 6], reverse=True)
    if not weeks:
        weeks = sorted(by_week, reverse=True)
    keep_files = {w + ".json" for w in weeks}
    for old_f in os.listdir(iss_dir):
        if old_f.endswith(".json") and old_f not in keep_files:
            os.remove(os.path.join(iss_dir, old_f))
    issues = []
    for n, w in enumerate(sorted(weeks)):
        lst = curate(by_week[w])
        start, end = week_bounds(w)
        pub = [{k: i.get(k) for k in PUBLIC_FIELDS if i.get(k) is not None} for i in lst]
        with open(os.path.join(OUT, "issues", w + ".json"), "w") as fh:
            json.dump(
                {
                    "week": w,
                    "number": n + 1,
                    "start": start.isoformat(),
                    "end": end.isoformat(),
                    "found": _count([i for i in by_week[w] if i.get("topic") in TOPICS], "topic"),
                    "items": pub,
                },
                fh,
                ensure_ascii=False,
                separators=(",", ":"),
            )
        cnt = lambda key: _count(lst, key)  # noqa: E731
        issues.append({
            "week": w,
            "number": n + 1,
            "start": start.isoformat(),
            "end": end.isoformat(),
            "count": len(lst),
            "found": _count([i for i in by_week[w] if i.get("topic") in TOPICS], "topic"),
            "topics": cnt("topic"),
            "kinds": cnt("kind"),
            "horizons": cnt("horizon"),
            "empirical": sum(1 for i in lst if i.get("empirical")),
            "countries": _count_multi(lst, "countries"),
            "methods": _count_multi(lst, "methods"),
            "publishers": dict(sorted(_count(lst, "publisher").items(), key=lambda kv: -kv[1])[:20]),
            "headline": lst[0]["title"] if lst else "",
        })
    issues.sort(key=lambda x: x["week"], reverse=True)
    pubs = sorted(
        {f["publisher"] for f in S.FEEDS}
        | {q["publisher"] for q in S.NEWS_SITE_QUERIES}
        | {j["journal"] for j in S.CROSSREF_JOURNALS}
    )
    index = {
        "generated": dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "issues": issues,
        "topics": {k: v[0] for k, v in TOPICS.items()},
        "totals": {
            "items": sum(i["count"] for i in issues),
            "publishers": len({i["publisher"] for i in items}),
            "countries": len({c for i in items for c in i["countries"]}),
            "weeks": len(issues),
        },
        "sources": {"databases": ["OpenAlex", "Crossref Finance Journals", "arXiv (q-fin / econ)"], "publishers": pubs},
        "health": health,
    }
    with open(os.path.join(OUT, "index.json"), "w") as fh:
        json.dump(index, fh, ensure_ascii=False, indent=1)
    log("Published %d issues -> %s" % (len(issues), OUT))


def _count(lst, key):
    d = {}
    for i in lst:
        v = i.get(key)
        if v:
            d[v] = d.get(v, 0) + 1
    return d


def _count_multi(lst, key):
    d = {}
    for i in lst:
        for v in i.get(key) or []:
            d[v] = d.get(v, 0) + 1
    return d


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--backfill", type=int, default=None, help="seed N weeks of history")
    ap.add_argument("--republish", action="store_true", help="re-classify + rewrite site data from store only")
    a = ap.parse_args()
    if a.republish:
        with open(STORE) as fh:
            its = json.load(fh)
        kept = []
        for it in its:
            classify(it)
            if not relevant(it, it.get("kind") in ("news",) or it.get("publisher") in STRICT_PUBS):
                continue
            kept.append(it)
        for it in kept:
            if not it.get("llm"):
                it["summary"], it["finding"] = extractive(it.get("abstract", ""), it["title"])
                if it["access"] == "summary" and not it["summary"]:
                    it["summary"] = trim(it["abstract"], 320)
            it["score"] = score(it)
        publish(kept, {}, dt.date.today())
    else:
        run(a.backfill)
