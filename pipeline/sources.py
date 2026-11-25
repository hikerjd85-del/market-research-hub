"""Source registry for the Market Research Hub weekly pipeline.

Five families of sources covering long-term equity investing, fundamental analysis,
stock selection vs. indexing, business quality/moats, valuation, and market bubbles:
  1. OPENALEX_QUERIES   - global peer-reviewed + working paper literature
  2. CROSSREF_ISSNS     - top peer-reviewed finance & investing journals (free, no key)
  3. ARXIV_QUERIES      - q-fin & econ working papers (full abstracts)
  4. FEEDS              - direct RSS/Atom feeds from NBER, BIS, Fed & investing thinkers
  5. NEWS_SITE_QUERIES  - major institutional research houses reachable via Google News site index
"""

# ---- 1. OpenAlex: phrase searches over title + abstract -----------------------------
OPENALEX_QUERIES = [
    # Winners & Indexing
    '"index investing"',
    '"stock selection" AND "index"',
    '"wealth creation" AND "stock market"',
    '"stock returns" AND "skewness"',
    '"active management" AND "passive"',
    '"stock picking" AND performance',
    '"long-term stock returns"',
    '"equity risk premium"',
    # Quality & Moats
    '"economic moat"',
    '"competitive advantage" AND "stock returns"',
    '"return on invested capital"',
    '"gross profitability" AND stocks',
    '"earnings growth" AND "stock returns"',
    '"quality factor" AND equity',
    '"capital allocation" AND shareholders',
    '"earnings persistence" AND valuation',
    # Valuation & Margin of Safety
    '"value investing"',
    '"fundamental analysis" AND stocks',
    '"margin of safety" AND investing',
    '"intrinsic value" AND stock',
    '"free cash flow" AND "stock returns"',
    '"price-to-earnings" AND "stock returns"',
    '"artificial intelligence" AND ("stock returns" OR "equity valuation")',
    '"growth stocks" AND "value stocks"',
    # Bubbles & Behavior
    '"stock market bubble"',
    '"asset price bubble"',
    '"speculative bubble" AND stock',
    '"investor sentiment" AND "stock returns"',
    '"behavioral finance" AND "stock market"',
    '"overvaluation" AND "stock returns"',
    '"market efficiency" AND anomaly',
    '"retail investors" AND "stock market"',
]

# ---- 2. Crossref: premier finance & investing journals (ISSN -> display name) -------
CROSSREF_JOURNALS = [
    {"issn": "0022-1082", "journal": "The Journal of Finance", "publisher": "Wiley", "country": "US"},
    {"issn": "0304-405X", "journal": "Journal of Financial Economics", "publisher": "Elsevier BV", "country": "US"},
    {"issn": "0893-9454", "journal": "The Review of Financial Studies", "publisher": "Oxford University Press", "country": "US"},
    {"issn": "0015-198X", "journal": "Financial Analysts Journal", "publisher": "CFA Institute", "country": "US"},
    {"issn": "0095-4918", "journal": "The Journal of Portfolio Management", "publisher": "Portfolio Management Research", "country": "US"},
    {"issn": "1542-7560", "journal": "Journal of Behavioral Finance", "publisher": "Taylor & Francis", "country": "US"},
    {"issn": "1572-3097", "journal": "Review of Finance", "publisher": "Oxford University Press", "country": "GB"},
    {"issn": "0929-1199", "journal": "Journal of Corporate Finance", "publisher": "Elsevier BV", "country": "NL"},
    {"issn": "0378-4266", "journal": "Journal of Banking & Finance", "publisher": "Elsevier BV", "country": "NL"},
    {"issn": "2045-9920", "journal": "Review of Asset Pricing Studies", "publisher": "Oxford University Press", "country": "US"},
]

# ---- 3. arXiv: quantitative finance & financial economics working papers ------------
ARXIV_QUERIES = [
    '(cat:q-fin.PM OR cat:q-fin.GN OR cat:q-fin.EC) AND (all:"stock selection" OR all:"index investing" OR all:"value investing" OR all:"asset pricing" OR all:"factor investing" OR all:"equity premium" OR all:"skewness")',
    '(cat:q-fin.GN OR cat:q-fin.ST OR cat:q-fin.EC OR cat:econ.GN) AND (all:"bubble" OR all:"overvaluation" OR all:"investor sentiment" OR all:"behavioral finance" OR all:"earnings growth" OR all:"fundamental" OR all:"valuation")',
    '(cat:q-fin.PM OR cat:q-fin.GN OR cat:q-fin.EC) AND (all:"profitability" OR all:"capital allocation" OR all:"long-term" OR all:"compounding" OR all:"active management" OR all:"artificial intelligence" AND all:"stock")',
]

# ---- 4. Direct publisher RSS / Atom feeds -------------------------------------------
# kind: paper (working papers / journal TOC), report (institutional research),
#       insight (long-term investing essays / practitioner memos), news (financial analysis)
FEEDS = [
    {"publisher": "NBER Working Papers", "url": "https://back.nber.org/rss/new.xml", "kind": "paper", "strict": True, "country": "US"},
    {"publisher": "BIS Working Papers", "url": "https://www.bis.org/doclist/wppubls.rss", "kind": "paper", "strict": True, "country": "CH"},
    {"publisher": "Liberty Street Economics (NY Fed)", "url": "https://libertystreeteconomics.newyorkfed.org/feed/", "kind": "report", "strict": True, "country": "US"},
    {"publisher": "Musings on Markets (Damodaran)", "url": "https://aswathdamodaran.blogspot.com/feeds/posts/default", "kind": "insight", "strict": False, "country": "US"},
    {"publisher": "Alpha Architect", "url": "https://alphaarchitect.com/feed/", "kind": "insight", "strict": False, "country": "US"},
    {"publisher": "A Wealth of Common Sense", "url": "https://awealthofcommonsense.com/feed/", "kind": "insight", "strict": False, "country": "US"},
    {"publisher": "Behavioural Investment", "url": "https://behaviouralinvestment.com/feed/", "kind": "insight", "strict": False, "country": "GB"},
    {"publisher": "Klement on Investing", "url": "https://klementoninvesting.substack.com/feed", "kind": "insight", "strict": False, "country": "GB"},
    {"publisher": "Of Dollars And Data", "url": "https://ofdollarsanddata.com/feed/", "kind": "insight", "strict": False, "country": "US"},
    {"publisher": "Novel Investor", "url": "https://novelinvestor.com/feed/", "kind": "insight", "strict": False, "country": "US"},
]

# ---- 5. Institutional research & financial media via Google News site search --------
TOPIC_OR = '(stocks OR equity OR valuation OR "value investing" OR index OR bubble OR "margin of safety" OR moat OR earnings OR "long-term" OR compounding OR "active management" OR "behavioral finance")'
NEWS_SITE_QUERIES = [
    {"publisher": "NBER Working Papers", "site": "nber.org", "kind": "paper", "country": "US"},
    {"publisher": "CFA Institute Enterprising Investor", "site": "blogs.cfainstitute.org", "kind": "insight", "country": "US"},
    {"publisher": "Collaborative Fund", "site": "collabfund.com", "kind": "insight", "country": "US"},
    {"publisher": "Counterpoint Global", "site": "morganstanley.com", "kind": "report", "country": "US"},
    {"publisher": "Oaktree Capital", "site": "oaktreecapital.com", "kind": "insight", "country": "US"},
    {"publisher": "AQR Capital Management", "site": "aqr.com", "kind": "report", "country": "US"},
    {"publisher": "GMO", "site": "gmo.com", "kind": "insight", "country": "US"},
    {"publisher": "Research Affiliates", "site": "researchaffiliates.com", "kind": "report", "country": "US"},
    {"publisher": "Verdad Research", "site": "verdadcap.com", "kind": "insight", "country": "US"},
    {"publisher": "Morningstar", "site": "morningstar.com", "kind": "insight", "country": "US"},
    {"publisher": "Vanguard Research", "site": "vanguard.com", "kind": "report", "country": "US"},
    {"publisher": "Dimensional Fund Advisors", "site": "dimensional.com", "kind": "report", "country": "US"},
    {"publisher": "Man Institute", "site": "man.com", "kind": "report", "country": "GB"},
    {"publisher": "S&P Dow Jones Indices", "site": "spglobal.com", "kind": "report", "country": "US"},
    {"publisher": "BlackRock Investment Institute", "site": "blackrock.com", "kind": "report", "country": "US"},
    {"publisher": "Goldman Sachs Research", "site": "goldmansachs.com", "kind": "report", "country": "US"},
    {"publisher": "Financial Times", "site": "ft.com", "kind": "news", "country": "GB"},
    {"publisher": "The Economist", "site": "economist.com", "kind": "news", "country": "GB"},
    {"publisher": "Harvard Business Review", "site": "hbr.org", "kind": "insight", "country": "US"},
]
