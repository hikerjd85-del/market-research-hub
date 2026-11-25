"""Publisher logos for Market Research Hub.

For every publisher appearing in published weekly issues AND site/data/canon.json, find:
  icon  - square icon (apple-touch-icon or Google/DuckDuckGo favicon)
  mark  - Wikimedia Commons wordmark for well-known financial & academic institutions
  color - dominant brand color sampled from the icon

Cached in site/data/logos.json and saved under site/logos/. Stdlib only.
"""
import hashlib
import json
import re
import struct
import urllib.parse
import urllib.request
import zlib
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
OUT = SITE / "logos"
MANIFEST = SITE / "data" / "logos.json"
UA_BROWSER = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36"
UA_BOT = "MarketResearchHub/1.0 (+https://market-research-hub.vercel.app)"
RETRY_DAYS = 45
MARK_VERSION = 1

DOMAINS = {
    "NBER Working Papers": "nber.org",
    "BIS Working Papers": "bis.org",
    "Liberty Street Economics (NY Fed)": "newyorkfed.org",
    "Musings on Markets (Damodaran)": "pages.stern.nyu.edu",
    "NYU Stern / Damodaran": "stern.nyu.edu",
    "Alpha Architect": "alphaarchitect.com",
    "CFA Institute Enterprising Investor": "cfainstitute.org",
    "CFA Institute": "cfainstitute.org",
    "Financial Analysts Journal": "cfainstitute.org",
    "Collaborative Fund": "collabfund.com",
    "A Wealth of Common Sense": "awealthofcommonsense.com",
    "Behavioural Investment": "behaviouralinvestment.com",
    "Klement on Investing": "klementoninvesting.substack.com",
    "Of Dollars And Data": "ofdollarsanddata.com",
    "Novel Investor": "novelinvestor.com",
    "Counterpoint Global": "morganstanley.com",
    "Morgan Stanley Counterpoint Global": "morganstanley.com",
    "Oaktree Capital": "oaktreecapital.com",
    "AQR Capital Management": "aqr.com",
    "GMO": "gmo.com",
    "Research Affiliates": "researchaffiliates.com",
    "Verdad Research": "verdadcap.com",
    "Morningstar": "morningstar.com",
    "Vanguard Research": "vanguard.com",
    "Dimensional Fund Advisors": "dimensional.com",
    "Man Institute": "man.com",
    "S&P Dow Jones Indices": "spglobal.com",
    "BlackRock Investment Institute": "blackrock.com",
    "Goldman Sachs Research": "goldmansachs.com",
    "Financial Times": "ft.com",
    "The Economist": "economist.com",
    "Harvard Business Review": "hbr.org",
    "Berkshire Hathaway": "berkshirehathaway.com",
    "UBS / London Business School": "ubs.com",
    "Fidelity Magellan": "fidelity.com",
    "HarperBusiness": "harpercollins.com",
    "Princeton University Press": "press.princeton.edu",
    "The Journal of Finance": "onlinelibrary.wiley.com",
    "Journal of Financial Economics": "sciencedirect.com",
    "The Review of Financial Studies": "academic.oup.com",
    "Review of Finance": "academic.oup.com",
    "Review of Asset Pricing Studies": "academic.oup.com",
    "Journal of Behavioral Finance": "tandfonline.com",
    "Journal of Corporate Finance": "sciencedirect.com",
    "Journal of Banking & Finance": "sciencedirect.com",
    "The Journal of Portfolio Management": "pm-research.com",
    "arXiv (q-fin)": "arxiv.org",
    "arXiv": "arxiv.org",
    "SSRN": "ssrn.com",
    "Elsevier BV": "elsevier.com",
    "Wiley": "wiley.com",
    "Oxford University Press": "oup.com",
    "Springer Nature": "springernature.com",
    "Springer Science+Business Media": "springer.com",
    "Taylor & Francis": "taylorandfrancis.com",
    "Cambridge University Press": "cambridge.org",
    "SAGE Publishing": "sagepub.com",
    "Emerald Publishing Limited": "emerald.com",
    "Multidisciplinary Digital Publishing Institute": "mdpi.com",
    "European Organization for Nuclear Research": "zenodo.org",
}

_C = {
    "hbr": "Harvard Business Review wordmark.svg",
    "ft": "Financial Times corporate logo (no background).svg",
    "economist": "The Economist Logo.svg",
    "elsevier": "Elsevier wordmark.svg",
    "wiley": "Wiley logo.svg",
    "springernature": "Springer Nature Logo.svg",
    "tandf": "Taylor and Francis.svg",
    "arxiv": "ArXiv logo 2022.svg",
    "blackrock": "BlackRock wordmark.svg",
    "goldman": "Goldman Sachs.svg",
    "morganstanley": "Morgan Stanley Logo 1.svg",
    "vanguard": "The Vanguard Group logo.svg",
    "morningstar": "Morningstar Logo.svg",
    "bis": "Bank for International Settlements logo.svg",
    "mdpi": "MDPI-logo-black.svg",
    "zenodo": "Zenodo-gradient-square.svg",
}

COMMONS = {
    "Harvard Business Review": _C["hbr"],
    "Financial Times": _C["ft"],
    "The Economist": _C["economist"],
    "Elsevier BV": _C["elsevier"],
    "Journal of Financial Economics": _C["elsevier"],
    "Journal of Corporate Finance": _C["elsevier"],
    "Journal of Banking & Finance": _C["elsevier"],
    "Wiley": _C["wiley"],
    "The Journal of Finance": _C["wiley"],
    "Springer Nature": _C["springernature"],
    "Taylor & Francis": _C["tandf"],
    "Journal of Behavioral Finance": _C["tandf"],
    "arXiv (q-fin)": _C["arxiv"],
    "arXiv": _C["arxiv"],
    "BlackRock Investment Institute": _C["blackrock"],
    "Goldman Sachs Research": _C["goldman"],
    "Counterpoint Global": _C["morganstanley"],
    "Morgan Stanley Counterpoint Global": _C["morganstanley"],
    "Vanguard Research": _C["vanguard"],
    "Morningstar": _C["morningstar"],
    "BIS Working Papers": _C["bis"],
    "Multidisciplinary Digital Publishing Institute": _C["mdpi"],
    "European Organization for Nuclear Research": _C["zenodo"],
}

SKIP_HOSTS = {"doi.org", "dx.doi.org", "news.google.com"}


def log(*a):
    print("[logos]", *a, flush=True)


def get(url, ua=UA_BROWSER, timeout=10, limit=2_000_000):
    req = urllib.request.Request(url, headers={"User-Agent": ua, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.headers.get("Content-Type", ""), r.read(limit)


def registrable(host):
    parts = host.lower().split(".")
    if parts and parts[0] == "www":
        parts = parts[1:]
    if len(parts) > 2 and parts[-2] in ("co", "ac", "com", "org", "gov", "edu", "net") and len(parts[-1]) == 2:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:])


def domain_for(publisher, url, doi):
    if publisher in DOMAINS:
        return DOMAINS[publisher]
    host = urllib.parse.urlparse(url or "").netloc.lower()
    if host and host not in SKIP_HOSTS:
        return registrable(host)
    return None


def png_size(b):
    if b[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", b[16:24])
    return None


def ico_size(b):
    if b[:4] != b"\x00\x00\x01\x00":
        return None
    n = struct.unpack("<H", b[4:6])[0]
    best = 0
    for k in range(min(n, 16)):
        w = b[6 + k * 16] or 256
        best = max(best, w)
    return (best, best)


def image_kind(b, ctype):
    if png_size(b):
        return "png"
    if ico_size(b):
        return "ico"
    head = b[:400].lstrip().lower()
    if head.startswith(b"<svg") or (head.startswith(b"<?xml") and b"<svg" in b[:2000].lower()):
        return "svg"
    return None


def png_pixels(b):
    w, h = png_size(b)
    pos, idat, pal, trns, ct, bd, il = 8, b"", None, None, None, None, 0
    while pos < len(b):
        ln, typ = struct.unpack(">I4s", b[pos:pos + 8])
        data = b[pos + 8:pos + 8 + ln]
        if typ == b"IHDR":
            bd, ct, il = data[8], data[9], data[12]
        elif typ == b"PLTE":
            pal = [tuple(data[i:i + 3]) for i in range(0, len(data), 3)]
        elif typ == b"tRNS":
            trns = data
        elif typ == b"IDAT":
            idat += data
        pos += 12 + ln
    if bd != 8 or il or ct not in (0, 2, 3, 4, 6):
        return []
    ch = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[ct]
    raw = zlib.decompress(idat)
    stride = w * ch
    prev = bytearray(stride)
    out, i = [], 0
    for _ in range(h):
        f = raw[i]; line = bytearray(raw[i + 1:i + 1 + stride]); i += 1 + stride
        for x in range(stride):
            a = line[x - ch] if x >= ch else 0
            up = prev[x]
            c = prev[x - ch] if x >= ch else 0
            if f == 1: line[x] = (line[x] + a) & 255
            elif f == 2: line[x] = (line[x] + up) & 255
            elif f == 3: line[x] = (line[x] + ((a + up) >> 1)) & 255
            elif f == 4:
                p = a + up - c; pa, pb, pc = abs(p - a), abs(p - up), abs(p - c)
                line[x] = (line[x] + (a if pa <= pb and pa <= pc else up if pb <= pc else c)) & 255
        prev = line
        for x in range(0, stride, ch):
            if ct == 6: out.append(tuple(line[x:x + 4]))
            elif ct == 2: out.append((*line[x:x + 3], 255))
            elif ct == 0: out.append((line[x],) * 3 + (255,))
            elif ct == 4: out.append((line[x],) * 3 + (line[x + 1],))
            else:
                idx = line[x]; r, g, bb = pal[idx] if pal and idx < len(pal) else (0, 0, 0)
                out.append((r, g, bb, trns[idx] if trns and idx < len(trns) else 255))
    return out


def brand_color(b, kind):
    try:
        if kind == "svg":
            txt = b.decode("utf-8", "ignore")
            cols = re.findall(r"#([0-9a-fA-F]{6})\b", txt)
            px = [tuple(int(c[i:i + 2], 16) for i in (0, 2, 4)) + (255,) for c in cols if len(c) == 6]
        elif kind == "png":
            px = png_pixels(b)
        else:
            return None
    except Exception:
        return None
    buckets, dark = {}, {}
    for r, g, bb, a in px:
        if a < 128:
            continue
        mx, mn = max(r, g, bb), min(r, g, bb)
        key = (r >> 4, g >> 4, bb >> 4)
        if mx - mn > 50 and mx > 50:
            buckets[key] = buckets.get(key, 0) + 1
        elif mx < 110:
            dark[key] = dark.get(key, 0) + 1
    pool = buckets or dark
    if not pool:
        return None
    k = max(pool, key=pool.get)
    return "#%02X%02X%02X" % tuple(v * 16 + 8 for v in k)


def find_icon(dom):
    cands = [
        f"https://www.google.com/s2/favicons?domain={dom}&sz=256",
        f"https://{dom}/apple-touch-icon.png",
        f"https://icons.duckduckgo.com/ip3/{dom}.ico",
    ]
    best = None
    for u in cands:
        try:
            st, ct, b = get(u, timeout=7)
        except Exception:
            continue
        kind = image_kind(b, ct)
        if st != 200 or not kind or len(b) < 120:
            continue
        size = (png_size(b) or ico_size(b) or (256, 256))[0]
        if not best or size > best[2]:
            best = (b, kind, size)
        if size >= 120:
            break
    return best


_MARKS = {}


def find_wordmark(fname):
    if fname in _MARKS:
        return _MARKS[fname]
    res = None
    try:
        url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(fname.replace(" ", "_"))
        _, ct, img = get(url, ua=UA_BOT, timeout=16, limit=600_000)
        kind = image_kind(img, ct)
        if kind in ("svg", "png") and len(img) < 500_000:
            res = (img, kind)
    except Exception as e:
        log("wordmark fail", fname, str(e)[:80])
    _MARKS[fname] = res
    return res


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:40] + "-" + hashlib.sha1(s.encode()).hexdigest()[:6]


def lookup(publisher, url, doi):
    rec = {"t": date.today().isoformat(), "cv": MARK_VERSION}
    dom = domain_for(publisher, url, doi)
    if dom:
        rec["d"] = dom
        ic = find_icon(dom)
        if ic:
            b, kind, size = ic
            name = f"{slug(dom)}.{kind}"
            (OUT / name).write_bytes(b)
            rec["i"] = "logos/" + name
            rec["s"] = size
            col = brand_color(b, kind)
            if col:
                rec["c"] = col
    fname = COMMONS.get(publisher)
    if fname:
        wm = find_wordmark(fname)
        if wm:
            b, kind = wm
            name = f"{slug(fname)}.{kind}"
            (OUT / name).write_bytes(b)
            rec["m"] = "logos/" + name
            if "c" not in rec:
                col = brand_color(b, kind)
                if col:
                    rec["c"] = col
    return publisher, rec


def all_published_items():
    out = []
    for f in sorted((SITE / "data" / "issues").glob("*.json")):
        out += json.loads(f.read_text())["items"]
    canon = SITE / "data" / "canon.json"
    if canon.exists():
        out += json.loads(canon.read_text()).get("items", [])
    return out


def update(items=None):
    items = all_published_items() if items is None else items
    OUT.mkdir(parents=True, exist_ok=True)
    try:
        man = json.loads(MANIFEST.read_text())
    except Exception:
        man = {}
    today = date.today()
    todo = {}
    for it in items:
        p = it.get("publisher") or ""
        if not p or p in todo:
            continue
        old = man.get(p)
        if old and old.get("cv") == MARK_VERSION and (
            old.get("i") or (today - date.fromisoformat(old.get("t", "2000-01-01"))).days < RETRY_DAYS
        ):
            continue
        todo[p] = (it.get("url"), it.get("doi"))
    log(f"{len(todo)} publishers to look up ({len(man)} cached)")
    if todo:
        with ThreadPoolExecutor(max_workers=12) as ex:
            for p, rec in ex.map(lambda kv: lookup(kv[0], *kv[1]), todo.items()):
                man[p] = rec
    MANIFEST.write_text(json.dumps(dict(sorted(man.items())), ensure_ascii=False, separators=(",", ":")))
    have = sum(1 for r in man.values() if r.get("i"))
    log(f"{have}/{len(man)} publishers have an icon, {sum(1 for r in man.values() if r.get('m'))} a wordmark")
    return man


if __name__ == "__main__":
    update()
