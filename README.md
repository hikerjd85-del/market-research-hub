# Market Research Hub

A public, bilingual (**English** default + **Persian / فارسی** toggle), auto-updating editorial observatory of **long-term equity investing, fundamental analysis, stock selection vs. indexing, business quality & Economic Moats, valuation & Margin of Safety, and market bubbles & behavioral finance**.

- `pipeline/` – stdlib-only Python that gathers, de-duplicates, classifies, summarizes, fetches publisher logos, and publishes weekly issues
- `site/` – static front end (plain HTML/CSS/JS, zero build dependencies); served directly by Vercel
- `site/data/canon.json` – curated bilingual library of foundational investing research & letters (Bessembinder, Greenwood/Shleifer/You *Bubbles for Fama*, Mauboussin, Buffett, Peter Lynch, Howard Marks, Benjamin Graham, Novy-Marx, Fama-French, AQR, Shiller, Damodaran, SPIVA)
- `data/store.json` – rolling 26-week store merged on every run
- `.github/workflows/weekly.yml` – runs every Monday 09:00 UTC, commits the new issue, and triggers an automatic Vercel redeploy

## Four Research Pillars
1. **Winners & Indexing** — Stock picking vs. broad indexing, return skewness, long-horizon wealth creation
2. **Quality & Moats** — Sustainable competitive advantage (`Economic Moat`), `ROIC`, 5–10 year `EPS` compounding & capital allocation
3. **Valuation & Safety** — Intrinsic value, `Margin of Safety`, great companies vs. good stocks, industry growth & AI capex traps
4. **Bubbles & Behavior** — Separating fundamental growth from speculative bubbles, market cycles, and behavioral discipline

## Sources
| Family | Sources |
|---|---|
| Scholarly databases | OpenAlex (finance & economics), arXiv (`q-fin` & `econ`), NBER Working Papers, BIS Working Papers |
| Direct publisher feeds | Aswath Damodaran (*Musings on Markets*), Alpha Architect, CFA Institute (*Enterprising Investor*), Collaborative Fund, A Wealth of Common Sense, Behavioural Investment, Klement on Investing, Of Dollars And Data, Liberty Street Economics (NY Fed) |
| Institutional & media index | Counterpoint Global (Morgan Stanley), Oaktree Capital (Howard Marks), AQR, GMO, Research Affiliates, Verdad Research, Morningstar, Vanguard Research, Dimensional, Man Institute, S&P Dow Jones Indices (SPIVA), BlackRock Investment Institute, Goldman Sachs Research, Financial Times, The Economist, Harvard Business Review |

## Run locally
```bash
python3 pipeline/run.py                  # weekly run (last 14 days)
python3 pipeline/run.py --backfill 10    # seed 10 weeks of history
python3 pipeline/run.py --republish      # re-classify and rewrite site/data from store
python3 -m http.server 8650 --directory site
```

## Optional Secrets (GitHub → Settings → Secrets → Actions)
- `OPENALEX_API_KEY` – optional free key from `openalex.org/settings/api` for higher OpenAlex rate limits.
- `ANTHROPIC_API_KEY` – optional. When set, new items with abstracts get concise plain-language English & Persian summaries from Claude. Without it, summaries are extractive (quoted directly from the abstract/source description).
