/* Market Research Hub — Vanilla JS, zero dependencies, bilingual EN (default) / FA.
   Editorial equity & fundamental investing observatory with 3D archive shelf,
   generative 3-ink screen-print covers, The Canon, Market Pulse, Theme River,
   World Map, Investor Brief (XLSX/DOCX/PDF), 30s Reel, and 1200x1200 Share Card. */
(() => {
  "use strict";

  // ---------- i18n (EN default, FA with English finance terms) ----------
  const I18N = {
    en: {
      siteTitle: "Market Research Hub: weekly equity research & long-term investing frameworks",
      skip: "Skip to content",
      modeExplore: "Explore",
      modeCanon: "Canon",
      modeBrief: "Brief",
      tipExploreTitle: "Explore · Weekly Observatory",
      tipExploreDesc: "Browse this week's newest academic papers & essays on the 3D shelf, track shifting topics in the Theme River, and explore research by country.",
      tipCanonTitle: "The Canon · Timeless Foundations",
      tipCanonDesc: "16 landmark papers & investor letters—Bessembinder, Bubbles for Fama, Buffett, Lynch, Mauboussin & Marks—distilled into key stats and mental models.",
      tipBriefTitle: "Investor Brief · 2-Min Weekly Digest",
      tipBriefDesc: "Weekly KPI trends, Three to Read, Rising Themes, Long-Horizon Evidence, 30-second Reel, and one-click Excel, Word & PDF exports.",
      introKicker: "What is this?",
      introCopy: "Every Monday, <strong>Market Research Hub</strong> gathers fresh equity research alongside timeless classics (<em>Bessembinder, Bubbles for Fama, Buffett, Lynch</em>) to support calmer, long-term investing decisions.",
      introClose: "Got it",
      close: "Close",
      readAt: "Read at",
      readAtSource: "Read at source",
      shareBtn: "Share as image",
      footLine: "<strong>Market Research Hub</strong> is automated and independent. Weekly equity research is gathered from public academic databases and institutional feeds; every work links to its original publisher.",
      sources: "Sources",
      updated: "Updated",
      homeHeroLeft: 'Weekly equity & fundamental investing research<span class="hide-sm"><i class="ln"></i>Top works + Canon anchors</span>',
      homeHeroRight: "Updated every Monday",
      homeHint: "Drag or click spines to browse · Double-click center cover to open",
      topicHint: "Drag or click spines to browse · Double-click center cover to open",
      canonHeroLeft: 'The Foundational Canon<span class="hide-sm"><i class="ln"></i>Landmark papers & investor letters</span>',
      canonHeroRight: "Timeless mental models · 1949–2025",
      canonHint: "Drag or click spines to browse · Double-click center cover to open",
      touchHint: "Swipe or tap spines to browse · Tap center cover to open",
      choosePillar: "Four investing pillars",
      worksThisWeek: "works this week",
      openPillar: "Open",
      canonSpotlightTitle: "The Foundational Canon",
      canonSpotlightSub: "Timeless papers & letters—from Bessembinder and Bubbles for Fama to Buffett, Lynch, Mauboussin & Howard Marks",
      viewAllCanon: "Open full Canon",
      attentionTitle: "How research attention is moving",
      attentionSub: n => `Works per investing theme, last ${n} weeks`,
      mapTitle: "Where the research comes from",
      thisWeek: "This week",
      lastNWeeks: n => `Last ${n} weeks`,
      countriesLbl: "countries",
      longHorizonLbl: "long-horizon (5–10Y+) works",
      noCountryNote: (none, tot) => `${none} of ${tot} works don't list author countries.`,
      noWorksWeek: "No works this week",
      pulseTitle: "Weekly research pulse — click any week",
      allWorks: "All works",
      shown: n => `${n} shown`,
      topN: n => `Top ${n}`,
      filterAll: "All",
      filterResearch: "Papers",
      filterReports: "Reports",
      filterInsights: "Essays & Memos",
      toggleLongHorizon: "Long-Horizon (5–10Y+)",
      toggleEmpirical: "Empirical Evidence",
      searchPlaceholder: "Search papers, authors, topics…",
      noMatch: "No works match these filters.",
      clearFilters: "Clear filters",
      showMore: "Show more",
      longHorizonBadge: "Long-Horizon",
      empiricalBadge: "Empirical",
      canonBadge: "Canon Classic",
      keyFinding: "Key Finding",
      investorTakeaway: "Long-Term Investor Framework",
      headlineOnly: "Headline only. The publisher restricts automated access—open the original piece at the source.",
      noteLlm: "Plain-language summary generated from the abstract only.",
      noteAbstract: "Summary extracted verbatim from the authors' abstract.",
      noteSummary: "Summary from the publisher's description.",
      noteCanon: "Curated summary from the Market Research Hub Foundational Canon.",
      canonFilterAll: n => `All (${n})`,
      canonPageTitle: "Foundational Library",
      canonPageSub: "Every work distilled into its quantitative proof and decision-making framework",
      briefTitle: "Investor Brief",
      briefSub: "A two-minute weekly synthesis of equity research & market frameworks",
      exportExcel: "Excel",
      exportWord: "Word",
      exportPdf: "PDF",
      threeToRead: "Three to read",
      risingThemes: "Rising themes",
      risingSub: "This week compared against the 4-week rolling average.",
      longHorizonSec: "Long-horizon signal",
      longHorizonSecSub: "Strongest new studies focused on 5–10+ year compounding, moats, and structural returns.",
      strongestEvidence: "Strongest empirical evidence",
      strongestEvidenceSub: "Multi-decade datasets, cross-sectional factor studies, event studies, and meta-analyses.",
      notableVoices: "Notable voices & institutions",
      notableSub: rec => rec ? "From leading research houses, journals, and long-term investors in the last month." : "From leading research houses, journals, and long-term investors this week.",
      canonAnchorSec: "Canon companions for this week",
      canonAnchorSub: "Foundational papers that frame this week's leading research debates.",
      briefFoot: "Built automatically every Monday from public academic databases and institutional feeds. Findings are grounded strictly in the source text.",
      reelBtn: "This week in 30 seconds",
      reelSub1: "new equity & investing research works tracked this week",
      reelWhere: "Where research landed across the four pillars",
      reelThree: "Three to read this week",
      reelRising: "Fastest-rising market themes",
      reelLongTitle: "Long-horizon compounding signal",
      reelLongSub: (lh, emp) => `long-horizon studies this week, ${emp} backed by empirical data`,
      reelEnd: "Fresh research every Monday · Timeless Canon always open",
      shareDrawing: "Drawing 1200 × 1200 card…",
      shareDl: "Download PNG",
      shareCopy: "Copy image",
      shareCopied: "Copied",
      shareNative: "Share",
      shareNote: "Square 1200 × 1200 PNG — sized for LinkedIn, X, Telegram, and slides.",
      shareTagline: "Long-term equity research & The Canon, every Monday",
      minRead: "min read",
      headlineOnlyTag: "headline only",
      noDataYet: "Not enough data yet.",
      noneThisPeriod: "None in this period.",
      weekOf: "Week of",
      newBadge: "new",
      briefHeadline: (total, leadName, leadN, dTxt, risingLabel) =>
        `${total} new market research works this week. ${leadName} leads with ${leadN}${dTxt}.` +
        (risingLabel ? ` ${risingLabel} is the fastest-rising theme.` : ""),
      upOnLast: d => `, up ${d}% on last week`,
      downOnLast: d => `, down ${Math.abs(d)}% on last week`,
    },
    fa: {
      siteTitle: "Market Research Hub — رصدخانه پژوهش‌های بازار سهام و سرمایه‌گذاری بنیادی",
      skip: "پرش به محتوا",
      modeExplore: "کاوش",
      modeCanon: "آثار ماندگار",
      modeBrief: "بریف",
      tipExploreTitle: "کاوش هفتگی (Explore)",
      tipExploreDesc: "جدیدترین مقالات علمی و یادداشت‌های تحلیلی این هفته روی قفسه سه‌بعدی، روند تغییر توجه بازار در Theme River و نقشه جهانی پژوهش‌ها.",
      tipCanonTitle: "آثار ماندگار (The Canon)",
      tipCanonDesc: "۱۶ پژوهش و نامه بنیادین—از Bessembinder و Bubbles for Fama تا Buffett، Peter Lynch، Mauboussin و Howard Marks—با آمار کلیدی و چارچوب فکری سرمایه‌گذاری بلندمدت.",
      tipBriefTitle: "بریف سرمایه‌گذار (Investor Brief)",
      tipBriefDesc: "خلاصه ۲ دقیقه‌ای هفته: شاخص‌های کلیدی، ۳ مطالعه برگزیده، موضوعات در حال صعود، شواهد بلندمدت، ریل ۳۰ ثانیه‌ای و خروجی Excel، Word و PDF.",
      introKicker: "این پلتفرم چیست؟",
      introCopy: "<strong>Market Research Hub</strong> هر دوشنبه تازه‌ترین پژوهش‌های بازار سهام را کنار آثار ماندگار <em>(Bessembinder, Bubbles for Fama, Buffett, Peter Lynch)</em> جمع می‌کند تا چارچوب فکری قوی‌تری برای سرمایه‌گذاری بلندمدت بسازید.",
      introClose: "متوجه شدم",
      close: "بستن",
      readAt: "مطالعه در",
      readAtSource: "مطالعه در منبع اصلی",
      shareBtn: "اشتراک‌گذاری به صورت تصویر",
      footLine: "<strong>Market Research Hub</strong> یک رصدخانه خودکار و مستقل است. پژوهش‌های هفتگی از پایگاه‌های دانشگاهی و یادداشت‌های مؤسسات مالی گردآوری می‌شوند و هر اثر به ناشر اصلی لینک دارد.",
      sources: "منابع و پایگاه‌های داده",
      updated: "آخرین به‌روزرسانی",
      homeHeroLeft: 'رصد هفتگی پژوهش‌های بازار سهام و سرمایه‌گذاری بنیادی<span class="hide-sm"><i class="ln"></i>برگزیده‌های هفته + آثار ماندگار Canon</span>',
      homeHeroRight: "به‌روزرسانی خودکار هر دوشنبه",
      homeHint: "برای مرور بکشید یا روی عطف‌ها کلیک کنید · دوبار کلیک روی کاور وسط برای باز کردن",
      topicHint: "برای مرور بکشید یا روی عطف‌ها کلیک کنید · دوبار کلیک روی کاور وسط برای باز کردن",
      canonHeroLeft: 'قفسه آثار ماندگار (The Canon)<span class="hide-sm"><i class="ln"></i>مقالات بنیادین و نامه‌های سرمایه‌گذاران</span>',
      canonHeroRight: "چارچوب‌های فکری ماندگار · 1949–2025",
      canonHint: "برای مرور بکشید یا روی عطف‌ها کلیک کنید · دوبار کلیک روی کاور وسط برای باز کردن",
      touchHint: "برای مرور بکشید یا روی عطف‌ها بزنید · لمس کاور وسط برای باز کردن",
      choosePillar: "چهار ستون چارچوب فکری سرمایه‌گذار",
      worksThisWeek: "پژوهش این هفته",
      openPillar: "ورود به بخش",
      canonSpotlightTitle: "قفسه آثار ماندگار (The Canon)",
      canonSpotlightSub: "مقالات و نامه‌های پایه‌ای از Bessembinder و Bubbles for Fama تا Buffett، Peter Lynch، Mauboussin و Howard Marks",
      viewAllCanon: "مشاهده کامل قفسه Canon",
      attentionTitle: "رودخانه توجه پژوهش‌های بازار (Theme River)",
      attentionSub: n => `تغییر تمرکز مقالات در موضوعات کلیدی طی ${n} هفته اخیر`,
      mapTitle: "جغرافیای پژوهش‌های بازار",
      thisWeek: "این هفته",
      lastNWeeks: n => `${n} هفته اخیر`,
      countriesLbl: "کشور",
      longHorizonLbl: "پژوهش با افق بلندمدت ۵–۱۰+ سال",
      noCountryNote: (none, tot) => `${none} مورد از ${tot} پژوهش، کشور نویسنده را ثبت نکرده‌اند.`,
      noWorksWeek: "پژوهشی در این هفته ثبت نشده است",
      pulseTitle: "نبض هفتگی پژوهش‌های این ستون — روی هر هفته کلیک کنید",
      allWorks: "همه پژوهش‌ها و یادداشت‌ها",
      shown: n => `${n} مورد نمایش داده شده`,
      topN: n => `${n} اثر برتر`,
      filterAll: "همه",
      filterResearch: "مقالات علمی",
      filterReports: "گزارش مؤسسات",
      filterInsights: "یادداشت و تحلیل",
      toggleLongHorizon: "افق بلندمدت ۵–۱۰+ سال",
      toggleEmpirical: "شواهد آماری (Empirical)",
      searchPlaceholder: "جستجو (مثلاً Bessembinder، Valuation، AI)...",
      noMatch: "موردی با این فیلترها یافت نشد.",
      clearFilters: "پاک کردن فیلترها",
      showMore: "نمایش بیشتر",
      longHorizonBadge: "افق بلندمدت",
      empiricalBadge: "Empirical",
      canonBadge: "اثر ماندگار Canon",
      keyFinding: "یافته کلیدی پژوهش (Key Finding)",
      investorTakeaway: "چارچوب فکری برای سرمایه‌گذار بلندمدت",
      headlineOnly: "فقط تیتر در دسترس است. ناشر دسترسی خودکار به متن را محدود کرده است؛ برای خواندن کامل به منبع اصلی بروید.",
      noteLlm: "خلاصه ساده شده صرفاً بر اساس چکیده اصلی مقاله تولید شده است.",
      noteAbstract: "خلاصه مستقیماً از چکیده نویسندگان استخراج شده است.",
      noteSummary: "خلاصه از توضیحات رسمی ناشر استخراج شده است.",
      noteCanon: "خلاصه و چارچوب فکری دست‌چین‌شده در قفسه Canon.",
      canonFilterAll: n => `همه (${n})`,
      canonPageTitle: "کتابخانه چارچوب‌های فکری ماندگار",
      canonPageSub: "هر اثر با آمار کلیدی و کاربردش در تصمیم‌گیری منطقی در بازارهای پرنوسان",
      briefTitle: "بریف سرمایه‌گذار (Investor Brief)",
      briefSub: "خلاصه دو دقیقه‌ای هفته از جدیدترین پژوهش‌ها و روندهای تحلیلی بازار",
      exportExcel: "خروجی Excel",
      exportWord: "خروجی Word",
      exportPdf: "چاپ PDF",
      threeToRead: "سه مطالعه برگزیده هفته (Three to Read)",
      risingThemes: "موضوعات در حال داغ شدن (Rising Themes)",
      risingSub: "مقایسه هفته جاری با میانگین ۴ هفته قبل.",
      longHorizonSec: "سیگنال افق بلندمدت (Long-Horizon)",
      longHorizonSecSub: "قوی‌ترین پژوهش‌های تازه با تمرکز بر Compounding ۵ تا ۱۰ ساله، Moats و بازده ساختاری.",
      strongestEvidence: "قوی‌ترین شواهد تجربی (Empirical Evidence)",
      strongestEvidenceSub: "مطالعات چنددهه‌ای، مدل‌های Factor، مطالعات رویدادی (Event Study) و متاآنالیزها.",
      notableVoices: "صداها و مؤسسات معتبر (Notable Voices)",
      notableSub: rec => rec ? "تازه‌ترین آثار از ژورنال‌ها، مؤسسات مالی و سرمایه‌گذاران شاخص در یک ماه اخیر." : "تازه‌ترین آثار از ژورنال‌ها، مؤسسات مالی و سرمایه‌گذاران شاخص در این هفته.",
      canonAnchorSec: "همراهان ماندگار این هفته از قفسه Canon",
      canonAnchorSub: "پژوهش‌های کلاسیکی که بهترین لنز را برای تحلیل بحث‌های این هفته می‌دهند.",
      briefFoot: "به‌طور خودکار هر دوشنبه از پایگاه‌های علمی و فیدهای تحلیلی ساخته می‌شود. یافته‌ها مستقیماً مبتنی بر متن منابع اصلی هستند.",
      reelBtn: "خلاصه این هفته در ۳۰ ثانیه",
      reelSub1: "پژوهش و یادداشت تازه در حوزه بازار سهام و سرمایه‌گذاری بنیادی",
      reelWhere: "توزیع پژوهش‌ها در چهار ستون اصلی",
      reelThree: "سه مطالعه برگزیده این هفته",
      reelRising: "داغ‌ترین موضوعات در حال صعود",
      reelLongTitle: "سیگنال سرمایه‌گذاری بلندمدت",
      reelLongSub: (lh, emp) => `پژوهش با افق بلندمدت در این هفته، و ${emp} مورد همراه با شواهد Empirical`,
      reelEnd: "پژوهش‌های تازه هر دوشنبه · قفسه Canon همیشه در دسترس",
      shareDrawing: "در حال ساخت کارت 1200 × 1200...",
      shareDl: "دانلود PNG",
      shareCopy: "کپی تصویر",
      shareCopied: "کپی شد",
      shareNative: "اشتراک‌گذاری",
      shareNote: "تصویر مربعی 1200 × 1200 — آماده برای LinkedIn، X، تلگرام و اسلایدها.",
      shareTagline: "رصدخانه پژوهش‌های سرمایه‌گذاری بنیادی و بلندمدت",
      minRead: "دقیقه مطالعه",
      headlineOnlyTag: "فقط تیتر",
      noDataYet: "داده کافی هنوز جمع نشده است.",
      noneThisPeriod: "در این بازه موردی ثبت نشده است.",
      weekOf: "هفته منتهی از",
      newBadge: "جدید",
      briefHeadline: (total, leadName, leadN, dTxt, risingLabel) =>
        `${total} پژوهش و یادداشت تازه در این هفته. ستون «${leadName}» با ${leadN} اثر پیشتاز است${dTxt}.` +
        (risingLabel ? ` داغ‌ترین محور صعودی هفته: ${risingLabel}.` : ""),
      upOnLast: d => ` (رشد ${d}٪ نسبت به هفته قبل)`,
      downOnLast: d => ` (کاهش ${Math.abs(d)}٪ نسبت به هفته قبل)`,
    },
  };

  let LANG = document.documentElement.lang === "fa" ? "fa" : "en";
  const T = (k, ...args) => {
    const v = I18N[LANG][k] ?? I18N.en[k];
    return typeof v === "function" ? v(...args) : v;
  };

  // ---------- 4 Pillars ----------
  const I = {
    winners: '<path d="M4 19h16"/><path d="M6.5 16v-3M10.2 16v-2M13.8 16v-4.5M17.5 16V5.5"/><circle cx="17.5" cy="4.2" r="1.4" fill="currentColor" stroke="none"/>',
    moats: '<path d="M12 3l8 3.4v5.8c0 4.6-3.3 7.6-8 9-4.7-1.4-8-4.4-8-9V6.4L12 3z" fill="currentColor" fill-opacity=".14"/><path d="M9 12.2l2.1 2.1 4.2-4.5"/>',
    valuation: '<path d="M12 4v16M5 8h14"/><path d="M6.2 8L3.6 14h5.2L6.2 8zM17.8 8l-2.6 6h5.2l-2.6-6z"/><path d="M8 20h8"/>',
    bubbles: '<circle cx="10.5" cy="13.5" r="6.3" fill="currentColor" fill-opacity=".14"/><path d="M15.8 8.2l5-5M17.8 3.2h3v3"/><circle cx="8.4" cy="11.4" r="1.4" fill="currentColor" stroke="none"/>',
  };
  const TABS = [
    {
      slug: "winners-indexing", key: "winners",
      name: "Winners & Indexing", name_fa: "برندگان و Index", short_fa: "برندگان و Index",
      line: "Stock selection vs. broad indexing, return skewness, and long-horizon wealth creation.",
      line_fa: "مقایسه انتخاب تک‌سهم با Index گسترده، چولگی بازده (Skewness) و خلق ثروت بلندمدت.",
      words: ["SKEWNESS", "INDEXING"],
    },
    {
      slug: "quality-moats", key: "moats",
      name: "Quality & Moats", name_fa: "کیفیت و Moats", short_fa: "کیفیت و Moats",
      line: "Sustainable Economic Moats, ROIC persistence, 5–10 year EPS growth, and capital allocation.",
      line_fa: "مزیت رقابتی پایدار (Economic Moat)، پایداری ROIC، رشد ۵ تا ۱۰ ساله EPS و تخصیص سرمایه.",
      words: ["QUALITY", "COMPOUND"],
    },
    {
      slug: "valuation-safety", key: "valuation",
      name: "Valuation & Safety", name_fa: "ارزش‌گذاری و Margin of Safety", short_fa: "ارزش‌گذاری و Safety",
      line: "Great companies vs. good stocks, Margin of Safety, and whether hot industries like AI deliver stock returns.",
      line_fa: "تفاوت شرکت عالی با سهم خوش‌قیمت، Margin of Safety و اینکه آیا رشد صنایعی مثل AI الزاماً به بازده سهام منجر می‌شود.",
      words: ["INTRINSIC", "VALUATION"],
    },
    {
      slug: "bubbles-behavior", key: "bubbles",
      name: "Bubbles & Behavior", name_fa: "حباب‌ها و رفتار بازار", short_fa: "حباب‌ها و رفتار",
      line: "Separating fundamental growth from speculative bubbles, market cycles, and behavioral discipline.",
      line_fa: "تشخیص رشد بنیادی از هیجان و حباب قیمتی، چرخه‌های بازار و تصمیم‌گیری منطقی در نوسانات.",
      words: ["BUBBLES", "CYCLES"],
    },
  ];
  const BY_SLUG = Object.fromEntries(TABS.map(t => [t.slug, t]));
  const BY_KEY = Object.fromEntries(TABS.map(t => [t.key, t]));
  const tabName = t => (LANG === "fa" ? t.name_fa : t.name);
  const tabShort = t => (LANG === "fa" ? (t.short_fa || t.name_fa) : t.name);
  const tabLine = t => (LANG === "fa" ? t.line_fa : t.line);
  const icon = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[k]}</svg>`;

  const KIND = {
    paper: { label: "Paper", label_fa: "مقاله علمی", code: "PPR", grp: "research" },
    preprint: { label: "Preprint", label_fa: "پیش‌چاپ", code: "PRE", grp: "research" },
    report: { label: "Report", label_fa: "گزارش", code: "RPT", grp: "reports" },
    insight: { label: "Essay", label_fa: "یادداشت", code: "ESS", grp: "insights" },
    news: { label: "Analysis", label_fa: "تحلیل", code: "ANL", grp: "insights" },
  };
  const kindLabel = k => (LANG === "fa" ? KIND[k]?.label_fa : KIND[k]?.label) || "";
  const GROUPS = [
    ["all", "filterAll"],
    ["research", "filterResearch"],
    ["reports", "filterReports"],
    ["insights", "filterInsights"],
  ];

  const CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  const SEARCH = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
  const ALIAS = {
    "European Organization for Nuclear Research": "Zenodo",
    "Multidisciplinary Digital Publishing Institute": "MDPI",
    "Springer Science+Business Media": "Springer",
    "Elsevier BV": "Elsevier",
  };

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pub = p => ALIAS[p] || p || "";
  const REGION_EN = (() => { try { return new Intl.DisplayNames(["en"], { type: "region" }); } catch (e) { return null; } })();
  const REGION_FA = (() => { try { return new Intl.DisplayNames(["fa"], { type: "region" }); } catch (e) { return null; } })();
  const cname = iso => {
    try {
      const reg = LANG === "fa" ? REGION_FA : REGION_EN;
      return (reg && reg.of(iso)) || (WORLD && WORLD[iso]?.n) || iso;
    } catch (e) { return (WORLD && WORLD[iso]?.n) || iso; }
  };
  let LOGOS = {};
  const brandOf = p => LOGOS[p] || {};
  const initials = p => pub(p).replace(/[^A-Za-z ]/g, " ").split(/\s+/).filter(w => w && !/^(of|and|the|for|de|la|in|on)$/i.test(w)).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "•";
  const hueOf = p => { let h = 0; for (const ch of String(p)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h % 360; };
  const brandColor = p => brandOf(p).c || `hsl(${hueOf(p)} 40% 34%)`;
  const plogo = (p, cls = "") => {
    const b = brandOf(p);
    return b.i ? `<img class="plogo ${cls}" src="${b.i}" alt="" loading="lazy" decoding="async">`
      : `<span class="plogo mono ${cls}" style="--b:${brandColor(p)}" aria-hidden="true">${esc(initials(p))}</span>`;
  };
  const pubTag = (p, n = 40) => `<span class="pub">${plogo(p)}<span class="en">${esc(trim(pub(p), n))}</span></span>`;
  const flag = iso => /^[A-Z]{2}$/.test(iso) ? `<img class="flag" src="flags/${iso.toLowerCase()}.png" alt="" loading="lazy" decoding="async">` : "";

  const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MON_FA = ["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];
  const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const mon = m => (LANG === "fa" ? MON_FA[m] : MON_EN[m]);
  const ymd = s => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ""); return m ? { y: +m[1], m: +m[2] - 1, d: +m[3] } : null; };
  const dnum = s => { const x = ymd(s); return x ? Date.UTC(x.y, x.m, x.d) / 864e5 : NaN; };
  const fmtDayEn = s => { const x = ymd(s); return x ? `${x.d} ${MON_EN[x.m]}` : (s || ""); };
  const fmtDay = s => { const x = ymd(s); return x ? `${x.d} ${mon(x.m)}` : (s || ""); };
  const fmtFull = s => { const x = ymd(s); return x ? `${x.d} ${mon(x.m)} ${x.y}` : (s || ""); };
  const fmtRange = (a, b) => { const x = ymd(a), y = ymd(b); if (!x || !y) return ""; return x.m === y.m ? `${x.d}–${y.d} ${mon(y.m)}` : `${x.d} ${mon(x.m)} – ${y.d} ${mon(y.m)}`; };
  const isTouchDevice = () => matchMedia("(pointer: coarse)").matches;
  const shelfHint = k => (isTouchDevice() ? T("touchHint") : T(k));
  const trim = (s, n) => (s && s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s || "");
  const seed = str => { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; }; };

  const COVER_C = { winners: "#146356", moats: "#234B82", valuation: "#B87314", bubbles: "#B83B2A" };
  const hex = k => COVER_C[k] || "#146356";
  const cvar = k => `var(--c-${k || "winners"})`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sstep = x => x * x * (3 - 2 * x);
  const EASE = "cubic-bezier(.2,.8,.2,1)";

  const state = {
    index: null, canon: [], cache: {}, route: { slug: "" }, page: "home", tab: null,
    week: null, issue: null, kind: "all", longHorizon: false, empirical: false,
    canonPillar: "all", q: "", shown: 20, openId: null, brief: null,
  };
  const getJSON = async u => { const r = await fetch(u); if (!r.ok) throw new Error(u + " " + r.status); return r.json(); };
  const issue = async w => (state.cache[w] ||= await getJSON(`data/issues/${w}.json`));
  const allIssues = () => Promise.all(state.index.issues.map(w => issue(w.week)));

  // ---------- 3-Ink Screen-Print Market Illustrations ----------
  const CREAM = "#F5F0E4", INK = "#151412", VERM = "#C84B31", GOLD = "#E6A441";
  const SCENES = [
    ["skewness", /bessembinder|skew|wealth creation|power law|treasury bills|top \d+%|concentration|outlier/i, r => {
      let bars = "";
      const hs = [18, 22, 16, 26, 20, 30, 24, 34, 46, 238];
      hs.forEach((h, i) => {
        const hh = i === 9 ? h : h + r() * 10;
        const isTop = i === 9;
        bars += `<rect x="${68 + i * 35}" y="${(765 - hh).toFixed(0)}" width="25" height="${hh.toFixed(0)}" rx="2" fill="${isTop ? VERM : CREAM}" stroke="${INK}" stroke-width="${isTop ? 3.5 : 2.5}"/>`;
      });
      return `<path d="M58 765 H420 M58 765 V500" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M58 728 H420" stroke="${CREAM}" stroke-width="2" stroke-dasharray="6 6" opacity=".6"/>${bars}<circle cx="395" cy="512" r="14" fill="${GOLD}" stroke="${INK}" stroke-width="3"/><text x="195" y="556" font-family="Inter Tight, sans-serif" font-weight="800" font-size="25" fill="${CREAM}" opacity=".92">SKEWNESS</text><text x="195" y="582" font-family="Inter Tight, sans-serif" font-weight="700" font-size="13" letter-spacing="2" fill="${CREAM}" opacity=".76">POWER LAW</text>`;
    }],
    ["bubble", /bubble|exuberan|mania|crash|speculat|run.up|boom.and.bust|shiller|greenwood|shleifer/i, () =>
      `<path d="M72 768 Q170 760 220 700 T305 545" fill="none" stroke="${CREAM}" stroke-width="7" stroke-linecap="round"/><path d="M305 545 L335 745" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="8 8"/><circle cx="230" cy="615" r="88" fill="${CREAM}" fill-opacity=".92" stroke="${INK}" stroke-width="4"/><circle cx="200" cy="580" r="22" fill="${GOLD}" opacity=".78"/><circle cx="155" cy="705" r="28" fill="${CREAM}" fill-opacity=".65" stroke="${INK}" stroke-width="3"/><path d="M385 505 L292 585" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="390" cy="500" r="14" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><path d="M276 598 l14 -24 l12 14z" fill="${INK}"/>`],
    ["moat", /moat|competitive advantage|switching cost|network effect|pricing power|franchise|durable|barriers/i, () =>
      `<ellipse cx="237" cy="740" rx="168" ry="38" fill="none" stroke="${CREAM}" stroke-width="5"/><ellipse cx="237" cy="740" rx="134" ry="28" fill="${INK}" fill-opacity=".35" stroke="${CREAM}" stroke-width="3" stroke-dasharray="9 6"/><rect x="162" y="580" width="150" height="150" fill="${CREAM}" stroke="${INK}" stroke-width="4"/><path d="M150 580 h174 v-44 h-34 v22 h-28 v-22 h-50 v22 h-28 v-22 h-34z" fill="${CREAM}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M212 730 v-54 a25 25 0 0 1 50 0 v54z" fill="${INK}"/><circle cx="237" cy="615" r="14" fill="${GOLD}" stroke="${INK}" stroke-width="3.5"/><path d="M342 660 L392 535 M370 545 L392 535 L398 560" fill="none" stroke="${VERM}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`],
    ["bridge", /margin of safety|intrinsic value|buffett|benjamin graham|undervalu|value invest|mr\.? market|fair price/i, () =>
      `<path d="M62 720 H412" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M115 720 V555 M359 720 V555" stroke="${CREAM}" stroke-width="14" stroke-linecap="round"/><path d="M68 716 Q115 565 115 565 Q237 685 359 565 Q359 565 406 716" fill="none" stroke="${CREAM}" stroke-width="5"/><path d="M155 628 V716 M196 650 V716 M237 658 V716 M278 650 V716 M319 628 V716" stroke="${CREAM}" stroke-width="3" opacity=".8"/><rect x="192" y="654" width="90" height="58" rx="6" fill="${VERM}" stroke="${INK}" stroke-width="4"/><text x="237" y="690" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="22" fill="${CREAM}">MoS</text><path d="M72 758 Q150 742 237 758 T402 758" fill="none" stroke="${CREAM}" stroke-width="3" opacity=".6"/>`],
    ["ai_trap", /artificial intelligence|\bai\b|generative|llm|tech|capex|narrative|hype|growth trap|innovation|big market/i, () =>
      `<path d="M65 765 H410 M65 765 V505" stroke="${INK}" stroke-width="4"/><path d="M78 745 C140 735 170 535 235 520 C290 508 320 650 398 635" fill="none" stroke="${VERM}" stroke-width="8" stroke-linecap="round"/><path d="M78 755 H140 V725 H205 V690 H270 V650 H335 V605 H398" fill="none" stroke="${CREAM}" stroke-width="7" stroke-linejoin="round"/><circle cx="235" cy="520" r="14" fill="${GOLD}" stroke="${INK}" stroke-width="3.5"/><rect x="275" y="510" width="128" height="44" rx="6" fill="${INK}"/><text x="339" y="538" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="15" fill="${CREAM}">HYPE vs FCF</text>`],
    ["pendulum", /pendulum|cycle|howard marks|second.level|sentiment|fear|greed|euphoria|panic|behavioral|behavioural|bias|herding|fomo/i, () =>
      `<path d="M90 515 H384" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M237 515 V755" stroke="${CREAM}" stroke-width="2.5" stroke-dasharray="6 8" opacity=".6"/><path d="M120 715 A175 175 0 0 0 354 715" fill="none" stroke="${CREAM}" stroke-width="4" stroke-dasharray="8 8"/><path d="M237 515 L335 695" stroke="${INK}" stroke-width="6"/><circle cx="335" cy="695" r="34" fill="${GOLD}" stroke="${INK}" stroke-width="4.5"/><circle cx="139" cy="695" r="24" fill="${CREAM}" fill-opacity=".45" stroke="${CREAM}" stroke-width="3"/><text x="122" y="762" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="14" fill="${CREAM}">FEAR</text><text x="352" y="762" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="14" fill="${CREAM}">GREED</text>`],
    ["snowball", /compound|snowball|lynch|tenbagger|long.term|10.year|5.year|buy and hold|patient/i, () =>
      `<path d="M65 540 L405 765 H65 Z" fill="${INK}" fill-opacity=".22"/><path d="M65 540 L405 765" stroke="${CREAM}" stroke-width="5" stroke-linecap="round"/><circle cx="122" cy="548" r="20" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/><circle cx="205" cy="594" r="38" fill="${CREAM}" stroke="${INK}" stroke-width="4"/><circle cx="322" cy="650" r="64" fill="${CREAM}" stroke="${INK}" stroke-width="4.5"/><circle cx="322" cy="650" r="34" fill="none" stroke="${VERM}" stroke-width="5" stroke-dasharray="12 8"/><text x="322" y="658" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="24" fill="${INK}">10Y</text>`],
    ["needle", /stock pick|stock select|active management|spiva|beat the market|outperform|winner|haystack/i, r => {
      let dots = "";
      const h1 = Math.floor(r() * 35), h2 = (h1 + 11) % 35;
      for (let i = 0; i < 35; i++) {
        const rr = Math.floor(i / 7), cc = i % 7, hot = i === h1 || i === h2;
        dots += `<circle cx="${96 + cc * 46}" cy="${535 + rr * 52}" r="${hot ? 15 : 10}" fill="${hot ? GOLD : CREAM}" stroke="${INK}" stroke-width="${hot ? 4 : 2.5}" opacity="${hot ? 1 : 0.72}"/>`;
      }
      const xh = 96 + (h1 % 7) * 46, yh = 535 + Math.floor(h1 / 7) * 52;
      return `${dots}<circle cx="${xh}" cy="${yh}" r="42" fill="none" stroke="${VERM}" stroke-width="7"/><path d="M${xh + 30} ${yh + 30} L${xh + 72} ${yh + 72}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`;
    }],
    ["eps", /\beps\b|earnings|base rate|reinvestment|roic|return on invested|forecast|guidance/i, r => {
      let s = `<path d="M74 768 H404 M74 768 V515" stroke="${INK}" stroke-width="4"/>`;
      const steps = [42, 74, 112, 152, 208];
      steps.forEach((h, i) => {
        const x = 96 + i * 58;
        s += `<rect x="${x}" y="${768 - h}" width="40" height="${h}" fill="${i === 4 ? GOLD : CREAM}" stroke="${INK}" stroke-width="3.5"/>`;
      });
      return s + `<path d="M116 710 Q230 675 348 540" fill="none" stroke="${VERM}" stroke-width="6" stroke-dasharray="10 8" stroke-linecap="round"/><circle cx="348" cy="540" r="12" fill="${VERM}" stroke="${INK}" stroke-width="3"/>`;
    }],
    ["balance", /profitab|gross profit|novy.marx|cash flow|free cash|\bfcf\b|balance sheet|dividend|buyback|capital allocation/i, () =>
      `<path d="M237 520 V755 M145 755 H329" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M105 570 L369 545" stroke="${CREAM}" stroke-width="8" stroke-linecap="round"/><circle cx="237" cy="558" r="14" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><path d="M112 570 L82 655 H142 Z" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/><path d="M362 545 L332 630 H392 Z" fill="${VERM}" stroke="${INK}" stroke-width="3.5"/><rect x="180" y="730" width="114" height="28" rx="4" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>`],
    ["factor", /factor|fama|cross.section|asset pricing|alpha\b|premium|momentum|size|small.cap|value factor/i, r => {
      let s = "";
      for (let i = 0; i < 5; i++) {
        const y = 516 + i * 54, w = 130 + r() * 210;
        s += `<rect x="78" y="${y}" width="318" height="34" rx="4" fill="${INK}" fill-opacity=".28"/><rect x="78" y="${y}" width="${w.toFixed(0)}" height="34" rx="4" fill="${i === 1 ? GOLD : i === 3 ? VERM : CREAM}" stroke="${INK}" stroke-width="3"/>`;
      }
      return s;
    }],
    ["quality", /quality|junk|aqr|resilien|drawdown|defensive|low volatility|safety/i, () =>
      `<path d="M237 512 L345 554 V635 Q345 724 237 772 Q129 724 129 635 V554 Z" fill="${CREAM}" stroke="${INK}" stroke-width="4.5"/><path d="M237 538 L322 572 V634 Q322 702 237 744 Q152 702 152 634 V572 Z" fill="none" stroke="${VERM}" stroke-width="5"/><path d="M192 642 L224 674 L288 602" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`],
    ["horizon", /century|100 year|125 year|global|optimist|historical|decade|long.horizon|macro/i, () =>
      `<path d="M150 515 H324 M150 765 H324" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M170 522 Q170 605 237 640 Q304 605 304 522 Z M170 758 Q170 675 237 640 Q304 675 304 758 Z" fill="${CREAM}" stroke="${INK}" stroke-width="4"/><path d="M192 548 H282 Q270 595 237 618 Q204 595 192 548 Z" fill="${GOLD}"/><path d="M192 752 Q237 684 282 752 Z" fill="${VERM}"/>`],
    ["index", /index|passive|etf|s&p 500|benchmark|diversif|portfolio/i, () => {
      let s = `<rect x="86" y="518" width="302" height="248" rx="14" fill="${CREAM}" stroke="${INK}" stroke-width="4.5"/>`;
      for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
        const hi = (r === 0 && c === 4) || (r === 2 && c === 2);
        s += `<rect x="${108 + c * 54}" y="${542 + r * 54}" width="40" height="40" rx="5" fill="${hi ? (r === 0 ? VERM : GOLD) : INK}" fill-opacity="${hi ? 1 : 0.16}" stroke="${INK}" stroke-width="2.5"/>`;
      }
      return s;
    }],
  ];
  const DEFAULT_SCENE = { winners: "index", moats: "moat", valuation: "bridge", bubbles: "pendulum" };

  function scene(it) {
    const r = seed((it.id || it.title) + "sc");
    if (it.scene) {
      const hit = SCENES.find(([k]) => k === it.scene);
      if (hit) return { key: hit[0], svg: hit[2](r) };
    }
    for (const field of [it.title, it.title + " " + (it.summary || "") + " " + (it.finding || "")]) {
      const hits = SCENES.filter(([, re]) => re.test(field));
      if (hits.length) { const hit = hits[Math.floor(r() * Math.min(2, hits.length))]; return { key: hit[0], svg: hit[2](r) }; }
    }
    const k = DEFAULT_SCENE[it.topic] || "index";
    const hit = SCENES.find(([n]) => n === k) || SCENES[0];
    return { key: hit[0], svg: hit[2](r) };
  }
  const panel = (it, sc) => `<rect x="36" y="470" width="402" height="330" fill="${hex(it.topic)}"/><rect x="36" y="470" width="402" height="330" fill="url(#cvDots)" opacity=".32"/>${sc.svg}`;

  // ---------- generated tape spines & covers ----------
  const SPINES = [
    c => ({ bg: "#EFE8DA", fg: "#151412", ac: c }),
    c => ({ bg: c, fg: "#F5F0E4", ac: "#151412" }),
    c => ({ bg: "#181C1A", fg: "#EFE8DA", ac: c }),
    c => ({ bg: "#DDD5C5", fg: "#151412", ac: "#C84B31" }),
    c => ({ bg: "#F5F0E4", fg: c, ac: c }),
  ];
  function spineHtml(it) {
    const r = seed((it.id || it.title) + "sp"), c = hex(it.topic), p = SPINES[Math.floor(r() * SPINES.length)](c);
    const art = `<svg viewBox="75 470 324 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${panel(it, scene(it))}</svg>`;
    const code = it.canon ? "CLSC" : (KIND[it.kind]?.code || "DOC");
    return `<div class="face sp" style="--bg:${p.bg};--fg:${p.fg};--ac:${p.ac}"><span class="sp-art">${art}</span><span class="sp-t">${esc(trim(it.title, 36))}</span><span class="sp-p">${esc(trim(pub(it.publisher), 15))}</span><span class="sp-logo">${plogo(it.publisher)}</span><span class="sp-k">${code}</span></div>`;
  }
  function wrapLines(text, max, maxLines) {
    const words = String(text).split(/\s+/), lines = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim();
      if (lines.length === maxLines) break;
    }
    if (lines.length < maxLines && cur) lines.push(cur);
    const used = lines.join(" ").split(/\s+/).length;
    if (used < words.length && lines.length) lines[lines.length - 1] = lines[lines.length - 1].replace(/[,;:.]?$/, "…");
    return lines;
  }
  function coverMast(it, ink) {
    const b = brandOf(it.publisher), col = brandColor(it.publisher), name = esc(trim(pub(it.publisher).toUpperCase(), b.i ? 25 : 29));
    let s = "";
    if (b.m) s += `<image href="${b.m}" x="36" y="18" width="280" height="40" preserveAspectRatio="xMinYMid meet"/>`;
    else if (b.i) s += `<rect x="36" y="16" width="44" height="44" rx="10" fill="#fff"/><image href="${b.i}" x="42" y="22" width="32" height="32" preserveAspectRatio="xMidYMid meet"/><text x="94" y="45" font-family="Inter Tight, sans-serif" font-weight="700" font-size="14" letter-spacing="2.4" fill="${ink}">${name}</text>`;
    else s += `<circle cx="58" cy="38" r="21" fill="${col}"/><text x="58" y="44" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="15" letter-spacing="1" fill="#fff">${esc(initials(it.publisher))}</text><text x="94" y="45" font-family="Inter Tight, sans-serif" font-weight="700" font-size="14" letter-spacing="2.4" fill="${ink}">${name}</text>`;
    s += `<rect x="36" y="70" width="402" height="4" fill="${col}"/><rect x="392" y="70" width="46" height="4" fill="${hex(it.topic)}"/>`;
    return s;
  }
  function coverInner(it) {
    const c = hex(it.topic), ink = "#151412", cream = "#F5F0E4";
    const title = wrapLines(it.title.toUpperCase(), 15, 6);
    const maxLen = Math.max(...title.map(l => l.length), 1);
    const baseFs = title.length > 5 ? 39 : title.length > 3 ? 45 : 51;
    const fs = Math.min(baseFs, Math.floor(404 / (maxLen * .61)));
    let s = `<rect width="474" height="900" fill="${cream}"/><rect width="474" height="900" fill="url(#cvTex)" opacity=".5"/>`;
    s += coverMast(it, ink);
    title.forEach((l, i) => { s += `<text x="34" y="${126 + i * (fs * 1.03)}" font-family="Inter Tight, sans-serif" font-weight="800" font-size="${fs}" letter-spacing="-1" fill="${c}">${esc(l)}</text>`; });
    const sc = scene(it);
    s += panel(it, sc);
    s += `<rect x="36" y="470" width="402" height="330" fill="none" stroke="${ink}" stroke-width="3.2"/>`;
    const code = it.canon ? "CANON CLASSIC" : (KIND[it.kind]?.label || "WORK").toUpperCase();
    const bw = 24 + code.length * 10.6;
    s += `<rect x="36" y="828" width="${bw}" height="34" fill="${it.canon ? ink : "none"}" stroke="${ink}" stroke-width="2"/><text x="48" y="851" font-family="Inter Tight, sans-serif" font-weight="800" font-size="15" letter-spacing="1.4" fill="${it.canon ? cream : ink}">${code}</text>`;
    const dtTxt = it.canon ? String(it.year || "") : fmtDayEn(it.date).toUpperCase();
    s += `<text x="438" y="851" text-anchor="end" font-family="Inter Tight, sans-serif" font-weight="700" font-size="14" letter-spacing="1.8" fill="${ink}">${esc(dtTxt)}</text>`;
    return s;
  }
  const COVER_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <pattern id="cvDots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.5" fill="#151412"/></pattern>
    <pattern id="cvTex" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 9L9 0" stroke="#000" stroke-opacity=".05"/></pattern>
    <filter id="inkF"><feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" seed="7"/><feDisplacementMap in="SourceGraphic" scale="115" xChannelSelector="R" yChannelSelector="G"/></filter>
  </defs></svg>`;
  const coverSvg = it => `<svg viewBox="0 0 474 900" preserveAspectRatio="none" aria-hidden="true">${coverInner(it)}</svg>`;
  const thumb = it => `<span class="ld-thumb"><svg viewBox="75 470 324 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${panel(it, scene(it))}</svg></span>`;

  // ---------- routing & chrome ----------
  function parseHash() {
    const [path, qs] = location.hash.replace(/^#\/?/, "").split("?");
    const p = new URLSearchParams(qs || "");
    return { slug: path || "", w: p.get("w"), i: p.get("i") };
  }
  function setUrl() {
    const p = new URLSearchParams();
    if (state.week && state.index?.issues?.[0] && state.week !== state.index.issues[0].week) p.set("w", state.week);
    if (state.openId) p.set("i", state.openId);
    const q = p.toString();
    const base = state.tab ? state.tab.slug : state.page === "brief" ? "brief" : state.page === "canon" ? "canon" : "";
    history.replaceState(null, "", `#/${base}${q ? "?" + q : ""}`);
  }

  function applyStaticLang() {
    document.documentElement.lang = LANG;
    document.documentElement.dir = LANG === "fa" ? "rtl" : "ltr";
    $("#skipLink").textContent = T("skip");
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = T(el.dataset.i18n); });
    $("#sClose").textContent = T("close");
    $("#sShare").textContent = T("shareBtn");
    const introCopy = $("#introCopy");
    if (introCopy) introCopy.innerHTML = T("introCopy");
    $("#footLine").innerHTML = T("footLine");
    $("#footSrcSum").textContent = T("sources");
    renderTabs();
    renderFooter();
  }

  function renderTabs() {
    $("#tabs").innerHTML = TABS.map(t => `<a class="tab" href="#/${t.slug}" data-k="${t.key}" style="--c:${cvar(t.key)}">${icon(t.key)}<span>${esc(tabShort(t))}</span><span class="nav-tip" role="tooltip"><strong>${esc(tabName(t))}</strong><span>${esc(tabLine(t))}</span></span></a>`).join("");
    markTab();
  }
  function markTab() {
    document.querySelectorAll(".tab").forEach(a => {
      const on = state.tab && a.dataset.k === state.tab.key;
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
  }
  function markMode() {
    const cur = state.page === "brief" ? "brief" : state.page === "canon" ? "canon" : "explore";
    document.querySelectorAll("#modeSwitch [data-mode]").forEach(a => {
      a.dataset.mode === cur ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
  }

  // ---------- 3D Shelf ----------
  const ARROW = d => `<svg viewBox="0 0 25 12" aria-hidden="true"><path d="${d}"/></svg>`;
  function shelfHeroHtml({ c, ht, words, left, right, label, has, hint }) {
    return `<section class="shelf-hero" id="hero" style="--c:${c};--ht:${ht || c}" aria-label="${esc(label)}">
      <div class="halftone ht-l" aria-hidden="true">${words[0]}</div>
      <div class="halftone ht-r" aria-hidden="true">${words[1]}</div>
      <div class="hz-top"><p class="lbl lbl-local">${left}</p><p class="lbl r lbl-local">${right}</p></div>
      ${has ? `
      <div class="floor" id="floor"></div>
      <div class="shelf" id="shelf"><div class="stage" id="stage"></div></div>
      <button class="ring-open" id="ringOpen" type="button" aria-label="Open this work"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z" fill="currentColor"/></svg></button>
      <div class="cap" id="cap" aria-live="polite">
        <div class="mask cap-sub lbl" id="capSub"></div>
        <div class="mask cap-title" id="capTitle"></div>
        <div class="cap-sub-fa" id="capAlt"></div>
        <div class="cap-rule"></div>
        <div class="mask cap-line" id="capLine"></div>
      </div>
      <button class="arr" id="prev" type="button" aria-label="Previous work">${ARROW("M6 1L1 6l5 5M1 6h23")}</button>
      <button class="arr" id="next" type="button" aria-label="Next work">${ARROW("M19 1l5 5-5 5M24 6H1")}</button>
      <div class="ruler" id="ruler" role="slider" aria-label="Timeline" tabindex="-1"></div>
      <p class="hz-hint lbl lbl-local"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>${hint}</p>` : `<div class="hz-empty lbl lbl-local">${T("noWorksWeek")}</div>`}
    </section>`;
  }

  const SH = { raf: 0, api: null, off: [] };
  function stopShelf() {
    cancelAnimationFrame(SH.raf); SH.raf = 0; SH.api = null;
    SH.off.forEach(f => f()); SH.off = [];
  }
  function mountShelf(hero, items, meta, opts = {}) {
    stopShelf();
    const n = items.length, copies = Math.max(1, Math.ceil(32 / n)), N = n * copies;
    const stage = $("#stage", hero), shelf = $("#shelf", hero), floor = $("#floor", hero), ring = $("#ringOpen", hero);
    const cap = $("#cap", hero), prev = $("#prev", hero), next = $("#next", hero), ruler = $("#ruler", hero);
    stage.innerHTML = Array.from({ length: N }, (_, v) => {
      const it = items[v % n];
      return `<div class="tape" data-v="${v}">${spineHtml(it)}<div class="face cv">${coverSvg(it)}</div></div>`;
    }).join("");
    const tapes = [...stage.children].map(el => ({ el, sp: el.children[0], cv: el.children[1] }));
    const lifts = new Float32Array(N);
    const P = 1400;
    let W, HH, H, ws, d, gap, U, cy, XS;

    // Ruler (weekday for weekly issues, era markers for Canon)
    const ws0 = dnum(meta?.start);
    const dayOf = (it, i) => opts.canon ? Math.min(6, Math.floor((i / Math.max(1, n)) * 7)) : Math.max(0, Math.min(6, (dnum(it.date) - ws0) || 0));
    let rh = "";
    for (let i = 0; i <= 28; i++) rh += `<i class="tick ${i % 4 ? "mn" : "mj"}" style="left:${(i / 28) * 100}%"></i>`;
    const eras = ["1949", "1989", "2013", "2018", "2019", "2024", "2025"];
    for (let i = 0; i < 7; i++) {
      const x = ((i + .5) / 7) * 100;
      let lab = opts.canon ? eras[i] : DOW[i];
      if (!opts.canon && meta?.start) {
        const x0 = ymd(meta.start);
        if (x0) { const dd = new Date(Date.UTC(x0.y, x0.m, x0.d + i)); lab = `${DOW[i]} ${dd.getUTCDate()}`; }
      }
      rh += `<span class="tlab${i % 2 ? " odd" : ""}" style="left:${x}%">${lab.toUpperCase()}</span>`;
    }
    ruler.innerHTML = rh + `<i class="rdot" id="rdot"></i>`;
    const rdot = $("#rdot", ruler);

    function measure() {
      W = hero.clientWidth; HH = hero.clientHeight;
      const phone = W < 768, compactDesk = !phone && HH < 620;
      H = phone ? Math.min(W * .58, HH * .35) : Math.min(HH * (compactDesk ? .44 : .48), W * .31, 410);
      ws = H * 142 / 840; d = H * 474 / 900; gap = H * .036;
      U = H * (phone ? 1.05 : 1.3); cy = HH * (phone ? .36 : (compactDesk ? .38 : .41));
      hero.style.setProperty("--H", H + "px"); hero.style.setProperty("--ws", ws + "px"); hero.style.setProperty("--d", d + "px");
      shelf.style.top = (cy - H / 2 - 50) + "px"; shelf.style.height = (H + 100) + "px";
      floor.style.top = (cy + H * .47 - H * .13) + "px"; floor.style.width = Math.min(W * .96, H * 3.6) + "px"; floor.style.height = H * .26 + "px";
      XS = []; let acc = 0;
      for (let u = 0; u <= 3 * U + 2; u += 2) { XS.push(acc); acc += 2 / (1 + Math.pow(u / U, 1.6)); }
      ring.style.left = (W / 2 - d / 2 - 6 - 21) + "px"; ring.style.top = (cy + .36 * H - 21) + "px";
      const capTop = cy + H / 2 + (phone ? Math.max(10, HH * .026) : HH * .036);
      cap.style.top = capTop + "px";
      const off = phone ? W / 2 - 26 : Math.min(W * .31, 340);
      prev.style.top = next.style.top = (capTop + 14) + "px";
      prev.style.left = (W / 2 - off - 22) + "px"; next.style.left = (W / 2 + off - 22) + "px";
      hero.querySelectorAll(".halftone").forEach(el => {
        const len = Math.max(7, el.textContent.length);
        el.style.setProperty("--ks", Math.min(W * (phone ? .16 : .115), HH * .74 / (len * .72), HH * .22) + "px");
      });
    }
    measure();

    const xsc = u => { const i = Math.min(XS.length - 1, Math.floor(Math.abs(u) / 2)); return Math.sign(u) * XS[i]; };
    const Bf = r => (Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) * .5);
    const F = r => r * (ws + gap) + (d - ws + 1.4 * gap) * Bf(r);
    const scl = u => 1 / (1 + Math.pow(Math.abs(u) / U, 1.6));
    const rel = (v, s) => { let r = ((v - s) % N + N) % N; if (r >= N / 2) r -= N; return r; };

    const start = n * Math.floor(copies / 2);
    let s = start, Tt = start, last = performance.now(), active = -1, first = true;
    let tiltX = 0, tiltY = 0, mx = -1e4, my = -1e4, hoverV = -1, dotX = null, drag = null, wheelT = 0;
    const idx = v => ((Math.round(v) % n) + n) % n;

    function swap(mask, html, dir, instant) {
      const old = [...mask.children];
      const sp = document.createElement("span"); sp.innerHTML = html; mask.appendChild(sp);
      if (instant || reduced) { old.forEach(o => o.remove()); return; }
      const opt = { duration: 600, easing: EASE, fill: "both" };
      sp.animate([{ transform: `translateY(${dir * 105}%)` }, { transform: "translateY(0)" }], opt);
      old.forEach(o => {
        const cur = getComputedStyle(o).transform;
        o.animate([{ transform: cur === "none" ? "translateY(0)" : cur }, { transform: `translateY(${-dir * 105}%)` }], opt).finished.then(() => o.remove(), () => o.remove());
      });
    }
    function caption(it, dir, instant) {
      if (opts.mixed || opts.canon) hero.style.setProperty("--c", cvar(it.topic));
      const pName = BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "";
      const badge = it.canon ? (LANG === "fa" ? "★ Canon" : "★ CANON") : kindLabel(it.kind);
      swap($("#capSub", hero), `<bdi>${esc(pName)}</bdi> / <bdi>${esc(trim(pub(it.publisher), 28))}</bdi> / <bdi>${esc(badge)}</bdi>`, dir, instant);
      swap($("#capTitle", hero), esc(it.title), dir, instant);
      $("#capAlt", hero).textContent = (LANG === "fa" && it.title_fa) ? it.title_fa : "";
      const lineTxt = it.canon
        ? `<bdi>${esc((it.authors || []).join(", "))}</bdi> — <bdi>${esc(it.year)}</bdi>`
        : `<bdi>${esc(fmtFull(it.date))}</bdi> — <bdi>${esc(it.horizon === "long_term" ? T("longHorizonBadge") : pub(it.publisher))}</bdi>`;
      swap($("#capLine", hero), lineTxt, dir, instant);
    }
    const coverOf = it => { const v = ((Math.round(s) % N) + N) % N; const tp = tapes[v]; return items[v % n] === it ? tp.cv : null; };

    function frame(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const k = drag && drag.moved ? 18 : 5.2;
      s = reduced ? Tt : s + (Tt - s) * (1 - Math.exp(-k * dt));
      if (Math.abs(Tt - s) < 1e-4) s = Tt;
      if (s > start + 4 * N) { s -= N; Tt -= N; } else if (s < start - 4 * N) { s += N; Tt += N; }
      const a = idx(s);
      if (a !== active) { const dir = Math.sign(Tt - s) || 1; active = a; caption(items[a], dir, first); first = false; }
      const open = !$("#sheet").hidden;
      const settled = Math.abs(Tt - s) < .3 && !open;
      const onCover = settled && Math.abs(mx - W / 2) < .55 * d && Math.abs(my - cy) < .55 * H;
      const tY = onCover ? (mx - W / 2) / (.55 * d) * 8 : (mx > -1e3 ? (mx - W / 2) / W * 4 : 0);
      const tX = onCover ? -(my - cy) / (H / 2) * 5 : 0;
      const e7 = reduced ? 1 : 1 - Math.exp(-7 * dt);
      tiltY += (tY - tiltY) * e7; tiltX += (tX - tiltX) * e7;
      shelf.style.cursor = drag && drag.moved ? "grabbing" : (onCover || hoverV >= 0) ? "pointer" : "";
      for (let v = 0; v < N; v++) {
        const tp = tapes[v], r = rel(v, s), o = sstep(Math.max(0, 1 - Math.abs(r))), u = F(r);
        if (Math.abs(u) > U * 1.95) { if (tp.vis !== false) { tp.el.style.visibility = "hidden"; tp.vis = false; } continue; }
        if (tp.vis === false) { tp.el.style.visibility = ""; tp.vis = true; }
        const lt = v === hoverV && Math.abs(r) > .5 ? 1 : 0;
        lifts[v] = reduced ? lt : lifts[v] + (lt - lifts[v]) * (1 - Math.exp(-12 * dt));
        const sc = scl(u), kk = 1 / sc;
        const z = P * (1 - kk) + o * H * .1, x = xsc(u) * kk;
        const y = (H * .5 * (1 - sc) * .42 + o * H * .012 - lifts[v] * H * .05) * kk;
        const ry = Math.sign(u) * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) - 90 * o + tiltY * o, rx = tiltX * o;
        tp.el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        tp.el.style.zIndex = Math.round(3000 + z);
        tp.sp.style.setProperty("--shade", Math.min(.6, o * .55 + (1 - sc) * .32).toFixed(3));
        tp.cv.style.setProperty("--shade", ((1 - o) * .82).toFixed(3));
      }
      ring.style.setProperty("--rs", open ? 0 : sstep(Math.max(0, 1 - Math.abs(Tt - s) * 3)).toFixed(3));
      const f0 = Math.floor(s), fr = s - f0, i0 = idx(f0), i1 = idx(f0 + 1);
      const d0 = dayOf(items[i0], i0), d1 = dayOf(items[i1], i1);
      const target = ((d0 + (d1 - d0) * fr) + .5) / 7;
      dotX = dotX == null || reduced ? target : dotX + (target - dotX) * (1 - Math.exp(-14 * dt));
      rdot.style.left = (dotX * 100).toFixed(3) + "%";
      SH.raf = requestAnimationFrame(frame);
    }
    SH.raf = requestAnimationFrame(frame);

    const go = t => { Tt = t; };
    const step = dlt => go(Math.round(Tt) + dlt);
    const openActive = () => { Tt = Math.round(Tt); const it = items[idx(Tt)]; openSheet(it, coverOf(it)?.getBoundingClientRect()); };

    let lastTap = { id: null, t: 0 };
    const isCenterHit = (e, v) => {
      if (v != null && Math.abs(rel(v, s)) < .55) return true;
      const hr = hero.getBoundingClientRect();
      const hx = e.clientX - hr.left, hy = e.clientY - hr.top;
      return Math.abs(hx - W / 2) < .58 * d && Math.abs(hy - cy) < .54 * H;
    };
    const tapCenter = () => {
      const cur = items[idx(Tt)];
      if (!cur) return;
      const now = performance.now();
      if (lastTap.id === cur.id && now - lastTap.t < 1500) {
        lastTap = { id: null, t: 0 };
        openActive();
      } else {
        lastTap = { id: cur.id, t: now };
        ring.animate([{ transform: "scale(1)" }, { transform: "scale(1.22)" }, { transform: "scale(1)" }], { duration: 280, easing: EASE });
      }
    };

    const onMove = e => { const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; const tp = e.target.closest && e.target.closest(".tape"); hoverV = tp ? +tp.dataset.v : -1; };
    const onLeave = () => { mx = my = -1e4; hoverV = -1; };
    hero.addEventListener("pointermove", onMove); hero.addEventListener("pointerleave", onLeave);
    shelf.addEventListener("pointerdown", e => {
      if (e.button !== 0) return;
      const tp = e.target.closest(".tape");
      drag = { x0: e.clientX, y0: e.clientY, T0: Tt, moved: false, v: tp ? +tp.dataset.v : null, id: e.pointerId };
    });
    const pm = e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; shelf.classList.add("dragging"); try { shelf.setPointerCapture(drag.id); } catch (_) {} }
      if (drag.moved) Tt = drag.T0 - dx / (ws + gap);
    };
    const pu = e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dd = drag; drag = null; shelf.classList.remove("dragging");
      if (dd.moved) { Tt = Math.round(Tt); lastTap = { id: null, t: 0 }; return; }
      const isTouch = e.pointerType === "touch" || (e.pointerType !== "mouse" && isTouchDevice());
      if (isCenterHit(e, dd.v)) {
        if (isTouch && Math.abs(Tt - s) < .35) openActive();
        else tapCenter();
        return;
      }
      if (dd.v == null) return;
      const r = rel(dd.v, s);
      if (Math.abs(r) >= .5) {
        const target = items[dd.v % n];
        go(Math.round(Tt + r));
        lastTap = { id: target?.id || null, t: performance.now() + 900 };
      }
    };
    window.addEventListener("pointermove", pm); window.addEventListener("pointerup", pu); window.addEventListener("pointercancel", pu);
    shelf.addEventListener("wheel", e => {
      if (!$("#sheet").hidden || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      Tt += e.deltaX / (ws + gap) * .5;
      clearTimeout(wheelT); wheelT = setTimeout(() => { Tt = Math.round(Tt); }, 160);
    }, { passive: false });
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
    ring.addEventListener("click", openActive);
    let capPtr = "mouse";
    cap.addEventListener("pointerdown", e => { capPtr = e.pointerType || "mouse"; });
    cap.addEventListener("click", () => {
      if (capPtr === "touch" || (capPtr !== "mouse" && isTouchDevice())) openActive();
      else tapCenter();
    });
    ruler.addEventListener("click", e => {
      const r = ruler.getBoundingClientRect(), day = Math.max(0, Math.min(6, Math.floor((e.clientX - r.left) / r.width * 7)));
      const cur = idx(Tt); let best = null;
      for (let j = 0; j < n; j++) {
        let off = ((j - cur) % n + n) % n; if (off > n / 2) off -= n;
        const sc0 = Math.abs(dayOf(items[j], j) - day) * 1000 + Math.abs(off);
        if (!best || sc0 < best.sc0) best = { sc0, off };
      }
      go(Math.round(Tt) + best.off);
    });
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    SH.off.push(() => { window.removeEventListener("pointermove", pm); window.removeEventListener("pointerup", pu); window.removeEventListener("pointercancel", pu); window.removeEventListener("resize", onResize); });
    SH.api = { step, openActive, inView: () => hero.getBoundingClientRect().bottom > 200, coverRect: it => coverOf(it)?.getBoundingClientRect() || null };
  }

  // ---------- Canon card helper ----------
  function canonCardHtml(it) {
    const t = BY_KEY[it.topic];
    const stat = LANG === "fa" ? (it.stat_fa || it.stat_en) : it.stat_en;
    return `<button class="canon-card" data-cid="${it.id}" style="--c:${cvar(it.topic)}">
      <span class="canon-cover">${coverSvg(it)}</span>
      <span class="canon-cb">
        <span class="canon-k">${esc(t ? tabName(t) : "")} · <span class="en">${esc(it.year)}</span></span>
        <b>${esc(it.title)}</b>
        ${LANG === "fa" && it.title_fa ? `<span class="canon-alt">${esc(it.title_fa)}</span>` : ""}
        <span class="canon-stat">${esc(stat)}</span>
        <em>${pubTag(it.publisher, 30)} · ${esc((it.authors || []).slice(0, 2).join(", "))}</em>
      </span>
    </button>`;
  }

  // ---------- Home (Explore) ----------
  async function renderHome() {
    stopShelf();
    const wk = state.index.issues, latest = wk[0], iss = await issue(latest.week);
    state.issue = iss;
    const asc = [...wk].reverse();
    const best = t => {
      const pool = iss.items.filter(i => i.topic === t.key), good = pool.filter(i => i.access !== "headline" && (i.finding || i.summary));
      const seen = new Set(), out = [];
      for (const i of [...good, ...pool]) { if (out.length === 3) break; if (out.includes(i) || seen.has(i.publisher)) continue; seen.add(i.publisher); out.push(i); }
      for (const i of pool) { if (out.length === 3) break; if (!out.includes(i)) out.push(i); }
      return out;
    };
    const tops = Object.fromEntries(TABS.map(t => [t.key, best(t)]));
    const shelfItems = [];
    // Lead with the strongest weekly items interleaved with Bessembinder & Bubbles for Fama
    for (let k = 0; k < 3; k++) TABS.forEach(t => { if (tops[t.key][k]) shelfItems.push(tops[t.key][k]); });
    if (state.canon[0]) shelfItems.splice(0, 0, state.canon[0]);
    if (state.canon[2]) shelfItems.splice(4, 0, state.canon[2]);

    const tiles = TABS.map(t => {
      const counts = asc.map(i => (i.found || i.topics || {})[t.key] || 0), mx = Math.max(...counts, 1);
      const n = (latest.found || latest.topics || {})[t.key] || 0;
      const bars = counts.map((c, i) => `<i style="height:${Math.max(8, c / mx * 100).toFixed(0)}%"${i === counts.length - 1 ? ' class="now"' : ""}></i>`).join("");
      const sample = tops[t.key].length ? tops[t.key] : state.canon.filter(c => c.topic === t.key).slice(0, 3);
      const chips = sample.map(it => `<span class="chip" title="${esc(it.title)}"><svg viewBox="75 470 324 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${panel(it, scene(it))}</svg></span>`).join("");
      return `<a class="tile" href="#/${t.slug}" style="--c:${cvar(t.key)}">
        <div class="tl-top"><span class="ic">${icon(t.key)}</span><div class="nm">${esc(tabName(t))}${LANG === "fa" ? `<small>${esc(t.name)}</small>` : ""}</div></div>
        <span class="tl-go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></span>
        <p class="tl-line">${esc(tabLine(t))}</p>
        <div class="tl-mid"><div class="tl-num"><b>${n}</b><span>${T("worksThisWeek")}</span></div><div class="tl-bars" aria-hidden="true">${bars}</div></div>
        <div class="tl-chips">${chips}</div>
        <span class="tl-cta lbl lbl-local">${T("openPillar")} ${esc(tabName(t))}</span>
      </a>`;
    }).join("");

    const canonSpot = [state.canon[0], state.canon[2], state.canon[3]].filter(Boolean);
    document.title = T("siteTitle");
    $("#view").innerHTML = shelfHeroHtml({
      c: cvar(shelfItems[0]?.topic), ht: "var(--brand-ink)", words: ["LONG HORIZON", "BASE RATE"],
      label: "Featured weekly & canonical research", has: shelfItems.length > 0, hint: shelfHint("homeHint"),
      left: T("homeHeroLeft"),
      right: `<bdi>${fmtRange(latest.start, latest.end)}</bdi><i class="ln"></i>${T("homeHeroRight")}`,
    }) + `
      <section class="wrap pillars" aria-labelledby="hPill">
        <div class="sec-h"><h2 id="hPill">${T("choosePillar")}</h2>${reelBtn(latest.week)}</div>
        <div class="tiles">${tiles}</div>
      </section>
      <section class="wrap home-sec" aria-labelledby="hCanon">
        <div class="sec-h">
          <div><h2 id="hCanon">${T("canonSpotlightTitle")}</h2><p class="ld-sub">${T("canonSpotlightSub")}</p></div>
          <a class="s-btn lbl" href="#/canon" style="--c:var(--brand-ink)">${T("viewAllCanon")}</a>
        </div>
        <div class="canon-grid">${canonSpot.map(canonCardHtml).join("")}</div>
      </section>
      <section class="wrap home-sec" aria-labelledby="hRiver">
        <div class="sec-h"><h2 id="hRiver">${T("attentionTitle")}</h2><span class="cnt">${T("attentionSub", wk.length)}</span></div>
        <div class="river-box" id="river"><div class="river-ph"></div></div>
      </section>
      <section class="wrap home-sec" aria-labelledby="hMap">
        <div class="sec-h"><h2 id="hMap">${T("mapTitle")}</h2><div class="seg map-seg" role="group" aria-label="Period"><button data-mapm="week" aria-pressed="true">${T("thisWeek")}</button><button data-mapm="all" aria-pressed="false">${T("lastNWeeks", wk.length)}</button></div></div>
        <div id="map"><div class="river-ph"></div></div>
      </section>`;
    if (shelfItems.length) mountShelf($("#hero"), shelfItems, latest, { mixed: true });
    mountRiver($("#river")); mountMap($("#map"));
  }

  // ---------- Canon Page ----------
  async function renderCanon() {
    stopShelf();
    const list = state.canonPillar === "all" ? state.canon : state.canon.filter(c => c.topic === state.canonPillar);
    document.title = `${T("modeCanon")} · Market Research Hub`;
    $("#view").innerHTML = shelfHeroHtml({
      c: cvar(state.canon[0]?.topic), ht: "var(--brand-ink)", words: ["THE CANON", "FOUNDATIONS"],
      label: "Foundational Investing Canon", has: state.canon.length > 0, hint: shelfHint("canonHint"),
      left: T("canonHeroLeft"), right: T("canonHeroRight"),
    }) + `
      <section class="wrap sec" aria-labelledby="hCanonLib">
        <div class="sec-h">
          <div><h2 id="hCanonLib">${T("canonPageTitle")}</h2><p class="ld-sub">${T("canonPageSub")}</p></div>
          <div class="seg" style="--c:var(--brand-ink)" role="group" aria-label="Filter Canon by pillar">
            <button data-cp="all" aria-pressed="${state.canonPillar === "all"}">${T("canonFilterAll", state.canon.length)}</button>
            ${TABS.map(t => `<button data-cp="${t.key}" aria-pressed="${state.canonPillar === t.key}">${esc(tabName(t))}</button>`).join("")}
          </div>
        </div>
        <div class="canon-grid">${list.map(canonCardHtml).join("")}</div>
      </section>`;
    if (state.canon.length) mountShelf($("#hero"), state.canon, null, { canon: true });
    markTab();
  }

  // ---------- Topic (Pillar) Page + Market Pulse SVG ----------
  function marketPulseSvg(t, weeks, selIdx, animate) {
    const W = 1000, H = 230, B = 172, n = weeks.length, w = W / Math.max(1, n);
    const counts = weeks.map(i => (i.found || i.topics || {})[t.key] || 0);
    const max = Math.max(...counts, 1);
    const pts = counts.map((c, i) => ({ cx: w * (i + 0.5), y: B - 28 - (c / max) * 108, c }));
    let d = `M${(pts[0].cx - w * .45).toFixed(1)} ${B}`;
    pts.forEach((p, i) => {
      if (i === 0) d += ` L${p.cx.toFixed(1)} ${p.y.toFixed(1)}`;
      else {
        const pr = pts[i - 1], mx = (pr.cx + p.cx) / 2;
        d += ` C${mx.toFixed(1)} ${pr.y.toFixed(1)} ${mx.toFixed(1)} ${p.y.toFixed(1)} ${p.cx.toFixed(1)} ${p.y.toFixed(1)}`;
      }
    });
    const last = pts[pts.length - 1];
    const lineD = d + ` L${(last.cx + w * .45).toFixed(1)} ${last.y.toFixed(1)}`;
    const areaD = lineD + ` L${(last.cx + w * .45).toFixed(1)} ${B} L${(pts[0].cx - w * .45).toFixed(1)} ${B} Z`;
    let s = `<svg class="pulse" viewBox="0 0 ${W} ${H}" role="group" aria-label="Works per week. Choose a week.">
      <defs><pattern id="mktGrid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="var(--hair)" stroke-width=".9"/></pattern></defs>
      <rect class="grid-bg" width="${W}" height="${H}" rx="18"/>`;
    weeks.forEach((wk, i) => {
      const sel = i === selIdx;
      s += `<rect class="slot${sel ? " sel" : ""}" data-week="${wk.week}" x="${(i * w).toFixed(1)}" y="0" width="${w.toFixed(1)}" height="${H}" rx="14" tabindex="0" role="button" aria-pressed="${sel}" aria-label="Week of ${fmtDay(wk.start)}, ${pts[i].c} works"/>`;
    });
    s += `<path class="area" d="${areaD}"/><path class="trace${animate && !reduced ? " draw" : ""}" pathLength="1" d="${lineD}"/>`;
    weeks.forEach((wk, i) => {
      const b = pts[i], sel = i === selIdx;
      s += `<line x1="${b.cx.toFixed(1)}" y1="${b.y.toFixed(1)}" x2="${b.cx.toFixed(1)}" y2="${B}" stroke="var(--c)" stroke-opacity="${sel ? .45 : .14}" stroke-dasharray="3 3"/>`;
      s += `<text class="n${sel ? " sel-t" : ""}" x="${b.cx.toFixed(1)}" y="${(b.y - (sel ? 17 : 12)).toFixed(1)}">${b.c}</text>`;
      s += `<text class="${sel ? "sel-t" : ""}" x="${b.cx.toFixed(1)}" y="${H - 16}">${fmtDay(wk.start)}</text>`;
      if (sel) s += `<circle class="ring" cx="${b.cx.toFixed(1)}" cy="${b.y.toFixed(1)}" r="5.5"/><circle class="dot" cx="${b.cx.toFixed(1)}" cy="${b.y.toFixed(1)}" r="6"/>`;
      else s += `<circle cx="${b.cx.toFixed(1)}" cy="${b.y.toFixed(1)}" r="4" fill="var(--card)" stroke="var(--c)" stroke-width="2.2"/>`;
    });
    return s + "</svg>";
  }

  async function renderTab(animate) {
    stopShelf();
    const t = state.tab, wk = state.index.issues, asc = [...wk].reverse();
    const iss = await issue(state.week); state.issue = iss;
    const items = iss.items.filter(i => i.topic === t.key);
    const found = (iss.found || {})[t.key] ?? items.length;
    const lh = items.filter(i => i.horizon === "long_term").length;
    const emp = items.filter(i => i.empirical).length;
    const selIdx = asc.findIndex(i => i.week === state.week);
    const meta = wk.find(i => i.week === state.week);
    const canonInPillar = state.canon.filter(c => c.topic === t.key);
    document.title = `${tabName(t)} · Market Research Hub`;
    $("#view").innerHTML =
      shelfHeroHtml({
        c: cvar(t.key), words: t.words, label: `${tabName(t)}: works this week`, has: items.length > 0, hint: shelfHint("topicHint"),
        left: `${esc(tabName(t))}<i class="ln"></i>${found} ${T("worksThisWeek")}`,
        right: `<bdi>${fmtRange(meta?.start, meta?.end)}</bdi><i class="ln"></i>${lh} ${T("longHorizonBadge")}`,
      }) + `
      <div class="wrap after-hero">
        <div class="pulse-card" style="--c:${cvar(t.key)}">
          <div class="pulse-head"><strong>${T("pulseTitle")}</strong><span><bdi class="en">${esc(state.week)}</bdi> · <bdi>${fmtRange(meta?.start, meta?.end)}</bdi></span></div>
          <div class="pulse-scroll" id="pscroll">${marketPulseSvg(t, asc, selIdx, animate)}</div>
        </div>

        <section class="sec" id="list" aria-labelledby="hAll">
          <div class="sec-h"><h2 id="hAll">${T("allWorks")}</h2><span class="cnt" id="cnt"></span></div>
          <div class="tools" style="--c:${cvar(t.key)}">
            <div class="seg" role="group" aria-label="Type">
              ${GROUPS.filter(([k]) => k === "all" || k === state.kind || items.some(i => KIND[i.kind]?.grp === k)).map(([k, lk]) => `<button data-kind="${k}" aria-pressed="${state.kind === k}">${T(lk)}</button>`).join("")}
            </div>
            <button class="flt-toggle" id="lhBtn" aria-pressed="${state.longHorizon}"><span>${T("toggleLongHorizon")}</span><em>${lh}</em></button>
            <button class="flt-toggle" id="empBtn" aria-pressed="${state.empirical}"><span>${T("toggleEmpirical")}</span><em>${emp}</em></button>
            <label class="search">${SEARCH}<input id="q" type="search" placeholder="${esc(T("searchPlaceholder"))}" value="${esc(state.q)}" aria-label="Search works"></label>
          </div>
          <div id="rows"></div>
        </section>

        ${canonInPillar.length ? `<section class="sec" aria-labelledby="hPCanon">
          <div class="sec-h"><h2 id="hPCanon">${T("canonSpotlightTitle")} — ${esc(tabName(t))}</h2></div>
          <div class="canon-grid">${canonInPillar.map(canonCardHtml).join("")}</div>
        </section>` : ""}
      </div>`;
    renderRows();
    const sc = $("#pscroll"); if (sc) sc.scrollLeft = sc.scrollWidth;
    markTab();
    if (items.length) mountShelf($("#hero"), items, meta);
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    return state.issue.items.filter(i => i.topic === state.tab.key)
      .filter(i => state.kind === "all" || KIND[i.kind]?.grp === state.kind)
      .filter(i => !state.longHorizon || i.horizon === "long_term")
      .filter(i => !state.empirical || i.empirical)
      .filter(i => !q || (i.title + " " + i.publisher + " " + (i.summary || "") + " " + (i.authors || []).join(" ")).toLowerCase().includes(q));
  }
  function renderRows() {
    const all = filtered(), list = all.slice(0, state.shown), box = $("#rows");
    const total = state.issue.items.filter(i => i.topic === state.tab.key).length;
    const active = state.kind !== "all" || state.longHorizon || state.empirical || state.q;
    $("#cnt").textContent = active ? T("shown", all.length) : T("topN", total);
    document.querySelectorAll("[data-kind]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.kind === state.kind)));
    $("#lhBtn")?.setAttribute("aria-pressed", String(state.longHorizon));
    $("#empBtn")?.setAttribute("aria-pressed", String(state.empirical));
    if (!all.length) { box.innerHTML = `<div class="rows"><div class="empty">${T("noMatch")}<br><button id="clear" type="button">${T("clearFilters")}</button></div></div>`; return; }
    box.innerHTML = `<ul class="rows">${list.map(it => `<li><button class="row" data-id="${it.id}" style="--c:${cvar(it.topic)}">
      <span class="kg"><svg viewBox="75 470 324 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${panel(it, scene(it))}</svg></span>
      <span class="rt"><b class="rt-en">${esc(it.title)}</b><i>${pubTag(it.publisher)} · ${esc(kindLabel(it.kind))} · ${fmtDay(it.date)}</i></span>
      <span class="row-badges">${it.horizon === "long_term" ? `<span class="tag-pill lt">${T("longHorizonBadge")}</span>` : ""}${it.empirical ? `<span class="tag-pill">${T("empiricalBadge")}</span>` : ""}</span>
      ${CHEV}</button></li>`).join("")}</ul>
      ${all.length > list.length ? `<button class="more" id="more" type="button">${T("showMore")}</button>` : ""}`;
  }

  // ---------- Detail Sheet (Ink Reveal) ----------
  const CIRCLES = [[150, 330, 0], [340, 600, 110], [250, 120, 210], [90, 760, 290], [400, 250, 350], [260, 860, 410], [230, 470, 170]];
  let sheetIt = null, fromRect = null, inkRaf = 0, lastFocus = null;
  const rectInset = r => { const W = innerWidth, H = innerHeight; return `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round 3px)`; };
  function centerRect() { const w = Math.min(innerWidth * .3, 260), h = w * 900 / 474; return { left: (innerWidth - w) / 2, top: (innerHeight - h) / 2, right: (innerWidth + w) / 2, bottom: (innerHeight + h) / 2 }; }

  function openSheet(it, rect) {
    const sheet = $("#sheet");
    lastFocus = document.activeElement; sheetIt = it; fromRect = rect || centerRect();
    sheet.style.setProperty("--c", cvar(it.topic));
    $("#sTopic").textContent = BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "";
    $("#sSub").innerHTML = `${pubTag(it.publisher, 55)} / ${esc(it.canon ? T("canonBadge") : kindLabel(it.kind))}`;
    $("#sTitle").textContent = it.title;
    $("#sTitleAlt").textContent = (LANG === "fa" && it.title_fa) ? it.title_fa : "";
    $("#sMeta").innerHTML = [
      it.canon ? esc(it.year) : fmtFull(it.date),
      it.horizon === "long_term" ? T("longHorizonBadge") : "",
      it.empirical ? T("empiricalBadge") : "",
      (it.countries || []).slice(0, 3).map(c => `<span class="ctry">${flag(c)}${esc(cname(c))}</span>`).join(" "),
      it.cited ? (LANG === "fa" ? `${it.cited} ارجاع` : `Cited ${it.cited}`) : "",
    ].filter(Boolean).join(" / ");

    const stat = it.canon ? (LANG === "fa" ? (it.stat_fa || it.stat_en) : it.stat_en) : "";
    $("#sStat").textContent = stat;

    const findTxt = it.canon
      ? (LANG === "fa" ? (it.finding_fa || it.finding_en) : it.finding_en)
      : (it.finding || "");
    $("#sFinding").innerHTML = findTxt ? `<small>${T("keyFinding")}</small><span dir="auto">${esc(trim(findTxt, 480))}</span>` : "";

    const synTxt = it.canon
      ? ""
      : (LANG === "fa" && it.summary_fa ? it.summary_fa : (it.summary && it.summary !== it.finding ? it.summary : (!findTxt ? T("headlineOnly") : "")));
    const sSyn = $("#sSyn");
    sSyn.setAttribute("dir", "auto");
    sSyn.textContent = synTxt ? trim(synTxt, 520) : "";

    const takeTxt = it.canon ? (LANG === "fa" ? (it.takeaway_fa || it.takeaway_en) : it.takeaway_en) : "";
    $("#sTakeaway").innerHTML = takeTxt ? `<small>${T("investorTakeaway")}</small><span dir="auto">${esc(takeTxt)}</span>` : "";

    $("#sCredit").textContent = (it.authors || []).length
      ? it.authors.slice(0, 5).join(", ") + (it.authors.length > 5 ? " et al." : "") + (it.venue && it.venue !== it.publisher ? ` · ${it.venue}` : "")
      : (it.venue || "");
    const link = $("#sLink"); link.href = it.url; link.textContent = `${T("readAt")} ${trim(pub(it.publisher), 28)} ↗`;
    $("#sNote").textContent = it.canon ? T("noteCanon") : it.llm ? T("noteLlm") : (it.access === "abstract" || it.access === "full") ? T("noteAbstract") : it.access === "summary" ? T("noteSummary") : "";

    $("#sPoster").innerHTML = `<svg viewBox="0 0 474 900" aria-hidden="true"><defs><mask id="inkMask" maskUnits="userSpaceOnUse" x="0" y="0" width="474" height="900"><g filter="url(#inkF)">${CIRCLES.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0" fill="#fff"/>`).join("")}</g></mask></defs><g mask="url(#inkMask)">${coverInner(it)}</g></svg>`;
    sheet.hidden = false; sheet.scrollTop = 0;
    document.documentElement.style.overflow = "hidden";
    sheet.getAnimations({ subtree: true }).forEach(a => a.cancel());
    sheet.animate([{ clipPath: rectInset(fromRect) }, { clipPath: "inset(0px 0px 0px 0px round 0px)" }], { duration: reduced ? 1 : 900, easing: "cubic-bezier(.76,0,.18,1)", fill: "both" });
    sheet.querySelectorAll(".m > *").forEach((el, i) => el.animate([{ transform: "translateY(105%)" }, { transform: "translateY(0)" }], { duration: reduced ? 1 : 780, delay: reduced ? 0 : 480 + i * 55, easing: EASE, fill: "both" }));
    const circles = [...$("#sPoster").querySelectorAll("#inkMask circle")], t0 = performance.now() + (reduced ? -5000 : 420);
    cancelAnimationFrame(inkRaf);
    const ink = now => {
      let done = true;
      circles.forEach((c, i) => {
        const p = Math.max(0, Math.min(1, (now - t0 - CIRCLES[i][2]) / 1150));
        if (p < 1) done = false;
        c.setAttribute("r", (720 * (1 - Math.pow(1 - p, 3))).toFixed(1));
      });
      if (!done) inkRaf = requestAnimationFrame(ink);
    };
    inkRaf = requestAnimationFrame(ink);
    sheet.focus({ preventScroll: true });
    state.openId = it.id; setUrl();
  }
  function closeSheet() {
    const sheet = $("#sheet"); if (sheet.hidden || sheet.dataset.closing) return;
    sheet.dataset.closing = "1";
    const r = (SH.api && sheetIt && SH.api.coverRect(sheetIt)) || fromRect || centerRect();
    const a = sheet.animate([{ clipPath: "inset(0px 0px 0px 0px round 0px)" }, { clipPath: rectInset(r) }], { duration: reduced ? 1 : 760, easing: "cubic-bezier(.76,0,.18,1)", fill: "both" });
    const fin = () => {
      sheet.hidden = true; delete sheet.dataset.closing; sheet.getAnimations().forEach(x => x.cancel()); cancelAnimationFrame(inkRaf);
      document.documentElement.style.overflow = "";
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    };
    a.finished.then(fin, fin);
    state.openId = null; sheetIt = null; setUrl();
  }
  function hideSheetNow() {
    const sheet = $("#sheet"); sheet.hidden = true; delete sheet.dataset.closing; sheet.getAnimations().forEach(x => x.cancel());
    cancelAnimationFrame(inkRaf); document.documentElement.style.overflow = ""; sheetIt = null;
  }

  // ---------- Investor Brief (Leader mode + XLSX / DOCX / PDF) ----------
  const THEME_LABELS = {
    skewness: ["Skewness & wealth creation", "چولگی بازده و خلق ثروت (Skewness)"],
    bubble: ["Bubbles & speculative crashes", "حباب‌ها و ریسک سقوط قیمتی"],
    moat: ["Economic Moats & durability", "مزیت رقابتی و Economic Moats"],
    bridge: ["Valuation & Margin of Safety", "ارزش‌گذاری و Margin of Safety"],
    ai_trap: ["AI, tech capex & growth traps", "تله‌های رشد، AI و Capex"],
    pendulum: ["Behavioral finance & cycles", "مالی رفتاری و چرخه‌های بازار"],
    snowball: ["5–10Y compounding & patience", "Compounding ۵ تا ۱۰ ساله"],
    needle: ["Stock picking vs. active odds", "انتخاب تک‌سهم در برابر Index"],
    eps: ["EPS growth, ROIC & base rates", "رشد EPS، ROIC و Base Rates"],
    balance: ["Profitability & capital allocation", "سودآوری و تخصیص سرمایه"],
    factor: ["Factor investing & asset pricing", "مدل‌های Factor و قیمت‌گذاری"],
    quality: ["Business quality & resilience", "کیفیت کسب‌وکار و تاب‌آوری"],
    horizon: ["Long-horizon historical returns", "بازده تاریخی بلندمدت"],
    index: ["Indexing & passive benchmarks", "سرمایه‌گذاری شاخصی (Indexing)"],
  };
  const themeLbl = k => (THEME_LABELS[k] ? THEME_LABELS[k][LANG === "fa" ? 1 : 0] : k);
  const BIG = /journal of finance|journal of financial economics|review of financial studies|financial analysts journal|nber|counterpoint global|oaktree|aqr|gmo|research affiliates|verdad|damodaran|cfa institute|alpha architect|collaborative fund|vanguard|dimensional|morningstar|man institute|s&p dow jones|blackrock|goldman sachs|financial times|economist|harvard|bis working/i;
  const READ = { paper: 14, preprint: 12, report: 20, insight: 7, news: 4 };
  const themesOf = it => { const f = it.title + " " + (it.summary || ""); return SCENES.filter(([, re]) => re.test(f)).map(([k]) => k); };
  const foundOf = (iss, k) => (iss.found || {})[k] ?? iss.items.filter(i => i.topic === k).length;
  const pct = (a, b) => (b ? Math.round((a - b) / b * 100) : null);
  const findItem = id => {
    const c = state.canon.find(x => x.id === id); if (c) return c;
    for (const iss of Object.values(state.cache)) { const it = iss.items.find(i => i.id === id); if (it) return it; }
    return null;
  };

  async function briefData(week) {
    const wk = state.index.issues, i0 = Math.max(0, wk.findIndex(w => w.week === week));
    const meta = wk[i0], cur = await issue(meta.week);
    const prevMeta = wk.slice(i0 + 1, i0 + 5), prev = await Promise.all(prevMeta.map(w => issue(w.week)));
    const items = cur.items;
    const hist = wk.slice(i0, i0 + 8).reverse();
    const pillars = TABS.map(t => {
      const n = foundOf(cur, t.key), p = prev[0] ? foundOf(prev[0], t.key) : null;
      return { t, n, p, d: p == null ? null : pct(n, p), series: hist.map(h => (h.found || h.topics || {})[t.key] || 0) };
    });
    const total = pillars.reduce((a, b) => a + b.n, 0);
    const lead = [...pillars].sort((a, b) => b.n - a.n)[0];
    const count = list => { const m = {}; list.forEach(it => themesOf(it).forEach(k => { m[k] = (m[k] || 0) + 1; })); return m; };
    const now = count(items), past = prev.map(p => count(p.items));
    const themes = Object.keys(THEME_LABELS).map(k => {
      const n = now[k] || 0, avg = past.length ? past.reduce((a, m) => a + (m[k] || 0), 0) / past.length : 0;
      return { k, label: themeLbl(k), labelEn: THEME_LABELS[k][0], n, avg, d: avg ? Math.round((n - avg) / avg * 100) : null, series: [...past].reverse().map(m => m[k] || 0).concat(n) };
    }).filter(x => x.n >= 2).sort((a, b) => ((b.d ?? 0) - (a.d ?? 0)) || b.n - a.n).slice(0, 6);
    const rising = themes.find(x => (x.d ?? 0) > 0);

    const strong = items.filter(i => i.access !== "headline" && (i.finding || i.summary));
    const picks = TABS.map(t => strong.find(i => i.topic === t.key) || items.find(i => i.topic === t.key)).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 3);
    const used = new Set(picks.map(i => i.id));
    const take = (list, n) => { const out = []; for (const i of list) { if (out.length === n) break; if (used.has(i.id)) continue; used.add(i.id); out.push(i); } return out; };
    const longH = take(items.filter(i => i.horizon === "long_term"), 4);
    const evidence = take(items.filter(i => i.empirical && (i.methods || []).length), 4);
    let bigs = take(items.filter(i => BIG.test(i.publisher + " " + (i.venue || ""))), 5), bigRecent = false;
    if (bigs.length < 3) { bigRecent = true; bigs = bigs.concat(take(prev.flatMap(p => p.items).filter(i => BIG.test(i.publisher + " " + (i.venue || ""))), 5 - bigs.length)); }
    const canonPicks = [
      state.canon.find(c => c.topic === lead.t.key),
      ...state.canon.filter(c => c.topic !== lead.t.key),
    ].filter(Boolean).slice(0, 3);

    const dTxt = lead.d == null ? "" : lead.d >= 0 ? T("upOnLast", lead.d) : T("downOnLast", lead.d);
    const line = T("briefHeadline", total, tabName(lead.t), lead.n, dTxt, rising ? rising.label : "");
    return { meta, items, pillars, total, line, themes, picks, longH, evidence, bigs, bigRecent, canonPicks };
  }

  const spark = (vals, w = 120, h = 34) => {
    const mx = Math.max(...vals, 1), st = w / Math.max(1, vals.length - 1);
    const pts = vals.map((v, i) => `${(i * st).toFixed(1)},${(h - 3 - v / mx * (h - 6)).toFixed(1)}`);
    return `<svg class="ld-spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts.join(" ")}"/><circle cx="${(vals.length - 1) * st}" cy="${pts[pts.length - 1].split(",")[1]}" r="3.5"/></svg>`;
  };
  const chg = d => (d == null ? `<span class="ld-chg flat">${T("newBadge")}</span>` : `<span class="ld-chg ${d > 0 ? "up" : d < 0 ? "down" : "flat"}">${d > 0 ? "▲" : d < 0 ? "▼" : "•"} ${Math.abs(d)}%</span>`);
  const ldRow = (it, extra = "") => `<li><button class="ld-row" data-lid="${it.id}" style="--c:${cvar(it.topic)}">${thumb(it)}<span class="ld-rt"><span class="ld-k">${esc(BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "")}${extra}</span><b>${esc(it.title)}</b>${it.finding ? `<i dir="auto">${esc(trim(it.finding, 165))}</i>` : ""}<em>${pubTag(it.publisher)} · ${fmtDay(it.date)}${it.access === "headline" ? " · " + T("headlineOnlyTag") : ""}</em></span></button></li>`;

  async function renderBrief() {
    stopShelf();
    const L = await briefData(state.week); state.brief = L; state.issue = await issue(L.meta.week);
    const wk = state.index.issues, i0 = wk.findIndex(w => w.week === L.meta.week);
    document.title = `${T("briefTitle")} · ${fmtRange(L.meta.start, L.meta.end)} · Market Research Hub`;
    const x0 = ymd(L.meta.end);
    $("#view").innerHTML = `
    <article class="ld" aria-labelledby="ldLine">
      <div class="wrap ld-bar">
        <div class="ld-week">
          <button class="ld-wbtn" data-lw="${wk[i0 + 1]?.week || ""}" ${wk[i0 + 1] ? "" : "disabled"} aria-label="Previous week"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
          <div><p class="lbl lbl-local">${T("briefTitle")}</p><p class="ld-range">${fmtRange(L.meta.start, L.meta.end)}${x0 ? " " + x0.y : ""}</p></div>
          <button class="ld-wbtn" data-lw="${wk[i0 - 1]?.week || ""}" ${i0 > 0 ? "" : "disabled"} aria-label="Next week"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
        </div>
        ${reelBtn(L.meta.week, "sm")}
        <div class="ld-export" role="group" aria-label="Export brief">
          <button data-exp="xlsx" type="button"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l8 8M16 8l-8 8"/></svg>${T("exportExcel")}</button>
          <button data-exp="docx" type="button"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.6 8L12 10l2.4 6L16 8"/></svg>${T("exportWord")}</button>
          <button data-exp="pdf" type="button"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 15V9h2.5a1.5 1.5 0 0 1 0 3H8"/></svg>${T("exportPdf")}</button>
        </div>
      </div>

      <header class="wrap ld-hero">
        <h1 id="ldLine">${esc(L.line)}</h1>
        <div class="ld-kpis">${L.pillars.map(p => `<a class="ld-kpi" href="#/${p.t.slug}" style="--c:${cvar(p.t.key)}">
          <span class="ld-kpi-h"><span class="ic">${icon(p.t.key)}</span>${esc(tabName(p.t))}</span>
          <span class="ld-kpi-n"><b>${p.n}</b>${chg(p.d)}</span>${spark(p.series, 160, 36)}</a>`).join("")}</div>
      </header>

      <section class="wrap ld-sec" aria-labelledby="ld3">
        <h2 id="ld3">${T("threeToRead")}</h2>
        <div class="ld-three">${L.picks.map(it => `<button class="ld-card" data-lid="${it.id}" style="--c:${cvar(it.topic)}">
          <span class="ld-cover">${coverSvg(it)}</span>
          <span class="ld-cb"><span class="ld-k">${esc(BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "")}</span><b>${esc(it.title)}</b>
          <span class="ld-find" dir="auto">${esc(trim(it.finding || it.summary || "", 240))}</span>
          <em>${pubTag(it.publisher)} · ${esc(kindLabel(it.kind))} · ${READ[it.kind] || 10} ${T("minRead")}</em></span></button>`).join("")}</div>
      </section>

      <div class="wrap ld-grid">
        <section class="ld-sec" aria-labelledby="ldTh">
          <h2 id="ldTh">${T("risingThemes")}</h2><p class="ld-sub">${T("risingSub")}</p>
          <ol class="ld-themes">${L.themes.map(th => `<li><span class="ld-tn">${esc(th.label)}</span><span class="ld-tc">${th.n}</span>${spark(th.series, 86, 24)}${chg(th.d)}</li>`).join("") || `<li class="ld-none">${T("noDataYet")}</li>`}</ol>
        </section>
        <section class="ld-sec" aria-labelledby="ldLH">
          <h2 id="ldLH">${T("longHorizonSec")}</h2><p class="ld-sub">${T("longHorizonSecSub")}</p>
          <ul class="ld-list">${L.longH.map(it => ldRow(it)).join("") || `<li class="ld-none">${T("noneThisPeriod")}</li>`}</ul>
        </section>
        <section class="ld-sec" aria-labelledby="ldE">
          <h2 id="ldE">${T("strongestEvidence")}</h2><p class="ld-sub">${T("strongestEvidenceSub")}</p>
          <ul class="ld-list">${L.evidence.map(it => ldRow(it, it.methods?.[0] ? ` · ${esc(it.methods[0])}` : "")).join("") || `<li class="ld-none">${T("noneThisPeriod")}</li>`}</ul>
        </section>
        <section class="ld-sec" aria-labelledby="ldB">
          <h2 id="ldB">${T("notableVoices")}</h2><p class="ld-sub">${T("notableSub", L.bigRecent)}</p>
          <ul class="ld-list ld-big">${L.bigs.map(it => `<li><button class="ld-row" data-lid="${it.id}" style="--c:${cvar(it.topic)}"><span class="ld-mono${brandOf(it.publisher).m ? " wm" : ""}" style="--b:${brandColor(it.publisher)}">${brandOf(it.publisher).m ? `<img src="${brandOf(it.publisher).m}" alt="">` : plogo(it.publisher, "big")}</span><span class="ld-rt"><span class="ld-k">${esc(pub(it.publisher))}</span><b>${esc(it.title)}</b><em>${esc(BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "")} · ${fmtDay(it.date)}</em></span></button></li>`).join("") || `<li class="ld-none">${T("noneThisPeriod")}</li>`}</ul>
        </section>
      </div>

      <section class="wrap ld-sec" aria-labelledby="ldR">
        <h2 id="ldR">${T("attentionTitle")}</h2><p class="ld-sub">${T("attentionSub", state.index.issues.length)}</p>
        <div class="river-box" id="river" style="margin-top:18px"><div class="river-ph"></div></div>
      </section>

      <section class="wrap ld-sec" aria-labelledby="ldCan">
        <h2 id="ldCan">${T("canonAnchorSec")}</h2><p class="ld-sub">${T("canonAnchorSub")}</p>
        <div class="canon-grid" style="margin-top:18px">${L.canonPicks.map(canonCardHtml).join("")}</div>
      </section>

      <p class="wrap ld-foot">${T("briefFoot")}</p>
    </article>`;
    markTab();
    mountRiver($("#river"));
  }

  // ---------- Zero-dependency XLSX / DOCX / PDF Exports ----------
  const CRCT = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = b => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRCT[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(files, type) {
    const enc = new TextEncoder(), parts = [], central = []; let off = 0;
    for (const f of files) {
      const name = enc.encode(f.name), data = enc.encode(f.data), crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(12, 0x21, true);
      h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true);
      parts.push(new Uint8Array(h.buffer), name, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(14, 0x21, true);
      c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
      central.push(new Uint8Array(c.buffer), name);
      off += 30 + name.length + data.length;
    }
    const size = central.reduce((a, b) => a + b.length, 0), e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, size, true); e.setUint32(16, off, true);
    return new Blob([...parts, ...central, new Uint8Array(e.buffer)], { type });
  }
  const xe = s => String(s ?? "").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const save = (blob, name) => { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); };
  const fileBase = L => `Market-Research-Hub-brief-${L.meta.week}`;
  const pillEn = it => BY_KEY[it.topic]?.name || "";
  const pillLoc = it => (BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "");
  const sgn = d => (d == null ? T("newBadge") : `${d > 0 ? "+" : ""}${d}%`);

  function exportXlsx(L) {
    const fa = LANG === "fa";
    const col = i => { let s = ""; i++; while (i) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };
    const link = u => ({ f: `HYPERLINK("${String(u).replace(/"/g, '""')}","${fa ? "مشاهده" : "Open"}")` });
    const sheet = (rows, widths) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"${fa ? ' rightToLeft="1"' : ""}><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols><sheetData>${rows.map((r, ri) => `<row r="${ri + 1}"${ri === 0 ? ' ht="22" customHeight="1"' : ""}>${r.map((v, ci) => {
      const ref = col(ci) + (ri + 1);
      if (ri === 0) return `<c r="${ref}" t="inlineStr" s="1"><is><t>${xe(v)}</t></is></c>`;
      if (v && typeof v === "object") return `<c r="${ref}" s="4"><f>${xe(v.f)}</f></c>`;
      if (typeof v === "number") return `<c r="${ref}" s="3"><v>${v}</v></c>`;
      return `<c r="${ref}" t="inlineStr" s="2"><is><t xml:space="preserve">${xe(v)}</t></is></c>`;
    }).join("")}</row>`).join("")}</sheetData></worksheet>`;
    const hdr = fa
      ? ["ستون پژوهشی", "عنوان", "یافته کلیدی", "ناشر", "نوع", "تاریخ", "افق زمانی"]
      : ["Pillar", "Title", "Key finding", "Publisher", "Type", "Date", "Horizon"];
    const lnkLbl = fa ? "لینک" : "Link";
    const work = (list, extra = []) => list.map(it => [pillLoc(it), it.title, it.finding || it.summary || "", pub(it.publisher), kindLabel(it.kind) || "", it.date || "", it.horizon === "long_term" ? T("longHorizonBadge") : (fa ? "عمومی" : "General"), ...extra.map(f => f(it)), link(it.url)]);
    const W = [24, 58, 68, 26, 14, 12, 16];
    const sheets = [
      [fa ? "خلاصه هفته" : "Summary", [fa ? ["شاخص", "مقدار"] : ["Item", "Value"], [fa ? "هفته" : "Week", `${fmtRange(L.meta.start, L.meta.end)} (${L.meta.week})`], [fa ? "کل آثار تازه" : "Total new works", L.total],
        ...L.pillars.flatMap(p => [[`${tabName(p.t)}: ${fa ? "تعداد آثار" : "works"}`, p.n], [`${tabName(p.t)}: ${fa ? "تغییر هفتگی" : "change vs last week"}`, sgn(p.d)]]),
        [fa ? "منبع" : "Source", fa ? "Market Research Hub — رصدخانه خودکار پژوهش‌های بازار سهام و سرمایه‌گذاری بنیادی" : "Market Research Hub — automated equity & fundamental investing observatory"]], [38, 86]],
      [fa ? "سه مطالعه برگزیده" : "Three to read", [[...hdr, lnkLbl], ...work(L.picks)], [...W, 10]],
      [fa ? "موضوعات صعودی" : "Rising themes", [fa ? ["موضوع", "تعداد این هفته", "میانگین ۴ هفته", "تغییر"] : ["Theme", "Works this week", "4-week average", "Change"], ...L.themes.map(t => [fa ? t.label : t.labelEn, t.n, Math.round(t.avg * 10) / 10, sgn(t.d)])], [38, 16, 16, 12]],
      [fa ? "افق بلندمدت" : "Long-horizon", [[...hdr, lnkLbl], ...work(L.longH)], [...W, 10]],
      [fa ? "شواهد تجربی" : "Empirical evidence", [[...hdr, fa ? "روش پژوهش" : "Method", lnkLbl], ...work(L.evidence, [it => (it.methods || []).join(", ")])], [...W, 20, 10]],
      [fa ? "صداهای شاخص" : "Notable voices", [[...hdr, lnkLbl], ...work(L.bigs)], [...W, 10]],
      [fa ? "همه آثار" : "All works", [[...hdr, fa ? "کشورها" : "Countries", lnkLbl], ...work(L.items, [it => (it.countries || []).map(cname).join("، ")])], [...W, 18, 10]],
    ];
    const NS = "http://schemas.openxmlformats.org";
    const files = [
      { name: "[Content_Types].xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="${NS}/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
      { name: "_rels/.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${NS}/package/2006/relationships"><Relationship Id="rId1" Type="${NS}/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
      { name: "xl/workbook.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="${NS}/spreadsheetml/2006/main" xmlns:r="${NS}/officeDocument/2006/relationships"><sheets>${sheets.map(([n], i) => `<sheet name="${xe(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>` },
      { name: "xl/_rels/workbook.xml.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${NS}/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="${NS}/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="${NS}/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
      { name: "xl/styles.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="${NS}/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><u/><sz val="11"/><color rgb="FF234B82"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0F2922"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="left" vertical="top"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>` },
      ...sheets.map(([, rows, w], i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheet(rows, w) })),
    ];
    save(zip(files, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), fileBase(L) + (fa ? "-fa" : "") + ".xlsx");
  }

  function exportDocx(L) {
    const fa = LANG === "fa", NS = "http://schemas.openxmlformats.org", rels = [];
    const r = (t, o = {}) => `<w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Tahoma"/>${o.b ? "<w:b/><w:bCs/>" : ""}${o.i ? "<w:i/>" : ""}${o.color ? `<w:color w:val="${o.color}"/>` : ""}<w:sz w:val="${o.sz || 21}"/><w:szCs w:val="${o.sz || 21}"/></w:rPr><w:t xml:space="preserve">${xe(t)}</w:t></w:r>`;
    const p = (runs, o = {}) => `<w:p><w:pPr>${o.rtl ? "<w:bidi/>" : ""}<w:spacing w:before="${o.before || 0}" w:after="${o.after ?? 100}"/>${o.border ? `<w:pBdr><w:bottom w:val="single" w:sz="8" w:space="4" w:color="${o.border}"/></w:pBdr>` : ""}${o.keep ? "<w:keepNext/>" : ""}</w:pPr>${runs}</w:p>`;
    const a = (t, url) => { rels.push(url); return `<w:hyperlink r:id="rIdL${rels.length}" w:history="1">${r(t, { b: true, color: "0F2922", sz: 23 })}</w:hyperlink>`; };
    const hex6 = k => hex(k).replace("#", "").toUpperCase();
    const h2 = t => p(r(t, { b: true, sz: 28, color: "0F2922" }), { rtl: fa, before: 300, after: 110, border: "DDD6C8", keep: true });
    const item = (it, extra = "") => p(r(fa ? (pillLoc(it) + extra) : (pillEn(it) + extra).toUpperCase(), { b: true, sz: 17, color: hex6(it.topic) }), { rtl: fa, before: 140, after: 20, keep: true })
      + p(a(it.title, it.url), { after: 40, keep: true })
      + ((it.finding || it.summary) ? p(r(trim(it.finding || it.summary, 380), { sz: 21 }), { after: 40 }) : "")
      + p(r(`${pub(it.publisher)} · ${kindLabel(it.kind) || ""} · ${fmtFull(it.date)}`, { color: "6E6A61", sz: 18 }), { rtl: fa, after: 120 });
    const tbl = (rows, widths) => `<w:tbl><w:tblPr>${fa ? "<w:bidiVisual/>" : ""}<w:tblW w:w="5000" w:type="pct"/><w:tblBorders><w:top w:val="single" w:sz="6" w:color="0F2922"/><w:bottom w:val="single" w:sz="6" w:color="DDD6C8"/><w:insideH w:val="single" w:sz="4" w:color="DDD6C8"/></w:tblBorders></w:tblPr><w:tblGrid>${widths.map(w => `<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>${rows.map((row, i) => `<w:tr>${row.map((c, j) => `<w:tc><w:tcPr><w:tcW w:w="${widths[j]}" w:type="dxa"/></w:tcPr><w:p><w:pPr>${fa ? "<w:bidi/>" : ""}<w:spacing w:after="0"/></w:pPr>${r(String(c), { b: i === 0, sz: i === 0 ? 18 : 20, color: i === 0 ? "6E6A61" : "151412" })}</w:p></w:tc>`).join("")}</w:tr>`).join("")}</w:tbl>`;
    const body = p(r(fa ? "MARKET RESEARCH HUB  ·  بریف سرمایه‌گذار" : "MARKET RESEARCH HUB  ·  INVESTOR BRIEF", { b: true, sz: 18, color: "C84B31" }), { rtl: fa, after: 60 })
      + p(r(`${T("weekOf")} ${fmtRange(L.meta.start, L.meta.end)} ${ymd(L.meta.end)?.y || ""}`, { color: "6E6A61", sz: 20 }), { rtl: fa, after: 220 })
      + tbl([fa ? ["ستون پژوهشی", "تعداد آثار این هفته", "تغییر نسبت به هفته قبل"] : ["Pillar", "Works this week", "Change vs last week"], ...L.pillars.map(x => [tabName(x.t), x.n, sgn(x.d)])], [4200, 2400, 2760])
      + h2(T("threeToRead")) + L.picks.map(it => item(it)).join("")
      + h2(T("longHorizonSec")) + L.longH.map(it => item(it)).join("")
      + h2(T("strongestEvidence")) + L.evidence.map(it => item(it)).join("")
      + h2(T("notableVoices")) + L.bigs.map(it => item(it)).join("")
      + p(r(T("briefFoot"), { i: !fa, color: "6E6A61", sz: 17 }), { rtl: fa, before: 320 });
    const doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="${NS}/wordprocessingml/2006/main" xmlns:r="${NS}/officeDocument/2006/relationships"><w:body>${body}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080"/></w:sectPr></w:body></w:document>`;
    const files = [
      { name: "[Content_Types].xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="${NS}/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>` },
      { name: "_rels/.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${NS}/package/2006/relationships"><Relationship Id="rId1" Type="${NS}/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>` },
      { name: "word/document.xml", data: doc },
      { name: "word/_rels/document.xml.rels", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${NS}/package/2006/relationships">${rels.map((u, i) => `<Relationship Id="rIdL${i + 1}" Type="${NS}/officeDocument/2006/relationships/hyperlink" Target="${xe(u)}" TargetMode="External"/>`).join("")}</Relationships>` },
    ];
    save(zip(files, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"), fileBase(L) + (fa ? "-fa" : "") + ".docx");
  }
  function exportPdf(L) {
    const t = document.title; document.title = fileBase(L);
    window.print();
    setTimeout(() => { document.title = t; }, 500);
  }

  // ---------- 30-Second Animated Reel ----------
  const REEL_MS = 6000;
  const countUp = root => root.querySelectorAll("[data-count]").forEach(el => {
    const to = +el.dataset.count, t0 = performance.now(), dur = reduced ? 0 : 1200;
    const tick = now => { const k = dur ? Math.min(1, (now - t0) / dur) : 1; el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  async function playReel(week) {
    if ($(".reel")) return;
    const L = await briefData(week || state.index.issues[0].week);
    const range = fmtRange(L.meta.start, L.meta.end), mx = Math.max(...L.pillars.map(p => p.n), 1);
    const lh = L.items.filter(i => i.horizon === "long_term"), emp = L.items.filter(i => i.empirical);
    const rising = L.themes.filter(t => (t.d ?? 0) > 0).slice(0, 3);
    const v = (html, d) => `<div class="rv" style="--d:${d}ms">${html}</div>`;
    const scenes = [
      () => `${v(`<p class="reel-k">Market Research Hub <i class="ln"></i> ${range}</p>`, 0)}
        ${v(`<p class="reel-big"><b data-count="${L.total}">0</b></p>`, 150)}
        ${v(`<p class="reel-sub">${T("reelSub1")}</p>`, 420)}`,
      () => `${v(`<p class="reel-k">${T("reelWhere")}</p>`, 0)}
        <div class="reel-bars">${L.pillars.map((p, i) => v(`<div class="reel-bar" style="--c:${cvar(p.t.key)};--w:${(p.n / mx * 100).toFixed(1)}%"><span class="ic">${icon(p.t.key)}</span><span class="reel-bn">${esc(tabName(p.t))}</span><span class="reel-track"><i></i></span><b data-count="${p.n}">0</b>${chg(p.d)}</div>`, 180 + i * 160)).join("")}</div>`,
      () => `${v(`<p class="reel-k">${T("reelThree")}</p>`, 0)}
        <div class="reel-three">${L.picks.map((it, i) => v(`<div class="reel-pick" style="--c:${cvar(it.topic)}"><span class="reel-art"><svg viewBox="75 470 324 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${panel(it, scene(it))}</svg></span><span class="reel-pk">${esc(BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "")}</span><b>${esc(trim(it.title, 96))}</b><span class="reel-pub">${pubTag(it.publisher, 30)}</span></div>`, 180 + i * 240)).join("")}</div>`,
      () => `${v(`<p class="reel-k">${T("reelRising")}</p>`, 0)}
        <div class="reel-themes">${(rising.length ? rising : L.themes.slice(0, 3)).map((t, i) => v(`<div class="reel-th"><b>${t.d == null ? "New" : (t.d > 0 ? "+" : "") + t.d + "%"}</b><span>${esc(t.label)}</span><em>${t.n} ${T("worksThisWeek")}</em></div>`, 180 + i * 240)).join("")}</div>`,
      () => `${v(`<p class="reel-k">${T("reelLongTitle")}</p>`, 0)}
        ${v(`<p class="reel-big"><b data-count="${lh.length}">0</b></p>`, 140)}
        ${v(`<p class="reel-sub">${T("reelLongSub", lh.length, emp.length)}</p>`, 380)}
        ${lh[0] ? v(`<p class="reel-q">${esc(trim(lh[0].title, 120))}</p>`, 650) : ""}
        ${v(`<p class="reel-end">${$(".logo").outerHTML}<span>${T("reelEnd")}</span></p>`, 980)}`,
    ];
    const el = document.createElement("div");
    el.className = "reel"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
    el.innerHTML = `<div class="reel-prog">${scenes.map(() => "<i><b></b></i>").join("")}</div>
      <button class="reel-x lbl box" type="button">${T("close")}</button>
      <div class="reel-stage" aria-live="polite"></div>
      <div class="reel-nav"><button type="button" data-r="-1" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button type="button" data-r="p" aria-label="Pause"><svg viewBox="0 0 24 24" class="pa"><path d="M8 5v14M16 5v14"/></svg><svg viewBox="0 0 24 24" class="pl"><path d="M7 4.5v15l12-7.5z"/></svg></button><button type="button" data-r="1" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button></div>`;
    document.body.appendChild(el); document.body.classList.add("reel-open");
    const bars = [...el.querySelectorAll(".reel-prog b")], stage = $(".reel-stage", el), last = document.activeElement;
    let idx = 0, t = 0, paused = false, prev = performance.now(), raf;
    const show = i => {
      idx = Math.max(0, Math.min(scenes.length - 1, i)); t = 0;
      stage.innerHTML = `<div class="reel-scene">${scenes[idx]()}</div>`; countUp(stage);
      bars.forEach((b, k) => { b.style.width = k < idx ? "100%" : "0%"; });
    };
    const close = () => { cancelAnimationFrame(raf); el.classList.add("out"); document.removeEventListener("keydown", key, true); setTimeout(() => { el.remove(); document.body.classList.remove("reel-open"); if (last) last.focus(); }, 280); };
    const loop = now => {
      if (!paused) { t += now - prev; bars[idx].style.width = Math.min(100, t / REEL_MS * 100) + "%"; if (t >= REEL_MS) { if (idx === scenes.length - 1) { paused = true; el.classList.add("paused", "done"); } else show(idx + 1); } }
      prev = now; raf = requestAnimationFrame(loop);
    };
    const pause = p => { paused = p; el.classList.toggle("paused", p); };
    const key = e => {
      if (e.key === "Escape") { e.stopPropagation(); close(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); show(idx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); show(idx - 1); }
      else if (e.key === " ") { e.preventDefault(); e.stopPropagation(); pause(!paused); }
    };
    document.addEventListener("keydown", key, true);
    el.addEventListener("click", e => {
      if (e.target.closest(".reel-x")) return close();
      const r = e.target.closest("[data-r]"); if (!r) return;
      if (r.dataset.r === "p") { if (el.classList.contains("done")) { el.classList.remove("done"); show(0); pause(false); } else pause(!paused); }
      else show(idx + +r.dataset.r);
    });
    show(0); raf = requestAnimationFrame(loop); $(".reel-x", el).focus();
  }
  const reelBtn = (week, cls = "") => `<button class="play-week ${cls}" type="button" data-reel="${week || ""}"><span class="pw-dot"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>${T("reelBtn")}</button>`;

  // ---------- Theme River (Streamgraph) ----------
  const RIVER_C = ["#146356", "#234B82", "#B87314", "#B83B2A", "#4A7C59", "#6F4E7C", "#2C6E8F", "#9E5A3B"];
  async function riverData() {
    const wk = [...state.index.issues].reverse(), iss = await Promise.all(wk.map(w => issue(w.week)));
    const per = iss.map(s => { const m = {}; s.items.forEach(it => new Set(themesOf(it)).forEach(k => { m[k] = (m[k] || 0) + 1; })); return m; });
    const tot = {}; per.forEach(m => Object.entries(m).forEach(([k, n]) => { tot[k] = (tot[k] || 0) + n; }));
    const keys = Object.keys(tot).sort((a, b) => tot[b] - tot[a]).slice(0, 8);
    return { wk, keys, vals: keys.map(k => per.map(m => m[k] || 0)) };
  }
  function riverSvg(R) {
    const W = 1000, H = 290, n = R.wk.length, X = i => 30 + i * (W - 60) / Math.max(1, n - 1);
    const sums = R.wk.map((_, i) => R.vals.reduce((a, s) => a + s[i], 0)), sc = (H - 40) / Math.max(...sums, 1);
    const base = sums.map(s => (H - 26 - s * sc) / 2 + 4);
    const acc = R.wk.map(() => 0), layers = R.vals.map(s => { const top = s.map((v, i) => base[i] + acc[i] * sc); s.forEach((v, i) => { acc[i] += v; }); const bot = s.map((v, i) => base[i] + acc[i] * sc); return { top, bot }; });
    const curve = ys => ys.map((y, i) => (i ? `C${(X(i - 1) + X(i)) / 2},${ys[i - 1].toFixed(1)} ${(X(i - 1) + X(i)) / 2},${y.toFixed(1)} ${X(i)},${y.toFixed(1)}` : `M${X(0)},${y.toFixed(1)}`)).join("");
    const curveBack = ys => { const r = [...ys].reverse(), xs = R.wk.map((_, i) => X(i)).reverse(); return r.map((y, i) => (i ? `C${(xs[i - 1] + xs[i]) / 2},${r[i - 1].toFixed(1)} ${(xs[i - 1] + xs[i]) / 2},${y.toFixed(1)} ${xs[i]},${y.toFixed(1)}` : `L${xs[0]},${y.toFixed(1)}`)).join(""); };
    let s = `<svg class="river" viewBox="0 0 ${W} ${H}" role="img" aria-label="Research volume by theme">`;
    layers.forEach((l, k) => { s += `<path class="rv-l" data-k="${k}" d="${curve(l.top)}${curveBack(l.bot)}Z" fill="${RIVER_C[k]}"><title>${esc(themeLbl(R.keys[k]))}</title></path>`; });
    layers.forEach((l, k) => {
      let bi = 0, bw = 0; l.top.forEach((y, i) => { const w = l.bot[i] - y; if (w > bw && i > 0 && i < n - 1) { bw = w; bi = i; } });
      if (bw > 16) s += `<text class="rv-t" x="${X(bi)}" y="${((l.top[bi] + l.bot[bi]) / 2 + 4).toFixed(1)}" text-anchor="middle" direction="${LANG === "fa" ? "rtl" : "ltr"}">${esc(themeLbl(R.keys[k]))}</text>`;
    });
    R.wk.forEach((w, i) => { s += `<text class="rv-x" x="${X(i)}" y="${H - 4}" text-anchor="${i === 0 ? "start" : i === n - 1 ? "end" : "middle"}">${fmtDay(w.start)}</text>`; });
    return s + `<line class="rv-cur" x1="0" x2="0" y1="0" y2="${H - 20}" opacity="0"/></svg>`;
  }
  async function mountRiver(box) {
    if (!box) return;
    const R = await riverData();
    if (!R.keys.length) { box.innerHTML = `<p class="ld-none">${T("noDataYet")}</p>`; return; }
    box.innerHTML = `<div class="rv-wrap">${riverSvg(R)}<div class="rv-tip" hidden></div></div>
      <ul class="rv-legend">${R.keys.map((k, i) => `<li data-k="${i}"><i style="background:${RIVER_C[i]}"></i>${esc(themeLbl(k))}<b>${R.vals[i][R.vals[i].length - 1]}</b></li>`).join("")}</ul>`;
    const svg = $("svg", box), tip = $(".rv-tip", box), cur = $(".rv-cur", box), n = R.wk.length;
    const hi = k => { box.querySelectorAll(".rv-l").forEach(p => p.classList.toggle("dim", k != null && p.dataset.k !== String(k))); box.querySelectorAll(".rv-legend li").forEach(li => li.classList.toggle("on", li.dataset.k === String(k))); };
    svg.addEventListener("pointermove", e => {
      const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 1000, i = Math.max(0, Math.min(n - 1, Math.round((x - 30) / ((1000 - 60) / Math.max(1, n - 1)))));
      const cx = 30 + i * (940 / Math.max(1, n - 1)); cur.setAttribute("x1", cx); cur.setAttribute("x2", cx); cur.setAttribute("opacity", 1);
      const lk = e.target.closest(".rv-l")?.dataset.k; hi(lk ?? null);
      tip.hidden = false; tip.innerHTML = `<b>${T("weekOf")} ${fmtDay(R.wk[i].start)}</b>${R.keys.map((k, j) => `<span class="${String(j) === lk ? "on" : ""}"><i style="background:${RIVER_C[j]}"></i>${esc(themeLbl(k))}<em>${R.vals[j][i]}</em></span>`).join("")}`;
      const px = cx / 1000 * r.width; tip.style.left = Math.min(r.width - 250, Math.max(0, px + 14)) + "px";
    });
    svg.addEventListener("pointerleave", () => { tip.hidden = true; cur.setAttribute("opacity", 0); hi(null); });
    box.querySelectorAll(".rv-legend li").forEach(li => { li.addEventListener("pointerenter", () => hi(li.dataset.k)); li.addEventListener("pointerleave", () => hi(null)); });
  }

  // ---------- Global Research Map ----------
  let WORLD = null;
  async function mountMap(box, mode = "week") {
    if (!box) return;
    WORLD = WORLD || await getJSON("assets/world.json");
    const list = mode === "week" ? (await issue(state.index.issues[0].week)).items : (await allIssues()).flatMap(s => s.items);
    const cnt = {}; let none = 0;
    list.forEach(it => { const cs = [...new Set(it.countries || [])]; if (!cs.length) none++; cs.forEach(c => { cnt[c] = (cnt[c] || 0) + 1; }); });
    const mx = Math.max(...Object.values(cnt), 1), lhN = list.filter(i => i.horizon === "long_term").length;
    const top = Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const paths = Object.entries(WORLD).map(([iso, c]) => {
      const n = cnt[iso] || 0, k = n ? (18 + 82 * Math.sqrt(n / mx)).toFixed(0) : 0;
      return `<path d="${c.d}" data-iso="${iso}" class="${n ? "has" : ""}" style="${n ? `--k:${k}%` : ""}"><title>${esc(cname(iso))}${n ? `: ${n}` : ""}</title></path>`;
    }).join("");
    box.innerHTML = `<div class="map-grid">
      <div class="map-stage"><svg class="map" viewBox="0 0 1000 487" role="img" aria-label="Global research map">${paths}</svg><div class="map-tip" hidden></div></div>
      <aside class="map-side">
        <div class="map-stat"><b>${Object.keys(cnt).length}</b><span>${T("countriesLbl")}</span></div>
        <div class="map-stat"><b>${lhN}</b><span>${T("longHorizonLbl")}</span></div>
        <ol class="map-top">${top.map(([iso, n]) => `<li><button type="button" data-iso="${iso}"><span>${flag(iso)} ${esc(cname(iso))}</span><i style="--w:${(n / top[0][1] * 100).toFixed(0)}%"></i><b>${n}</b></button></li>`).join("")}</ol>
        <p class="map-note">${T("noCountryNote", none, list.length)}</p>
      </aside></div>
      <div class="map-list" id="mapList"></div>`;
    const tip = $(".map-tip", box), stage = $(".map-stage", box);
    const pick = iso => {
      if (!iso) return;
      box.querySelectorAll("[data-iso]").forEach(p => p.classList.toggle("sel", p.dataset.iso === iso));
      const items = list.filter(i => (i.countries || []).includes(iso)).sort((a, b) => b.score - a.score).slice(0, 6);
      $("#mapList", box).innerHTML = `<p class="map-lh">${flag(iso)} ${esc(cname(iso))}<span>${cnt[iso] || 0}</span></p><ul class="ld-list ld-cols">${items.map(it => ldRow(it)).join("")}</ul>`;
    };
    box.addEventListener("click", e => { const el = e.target.closest("[data-iso]"); if (el) pick(el.dataset.iso); });
    $("svg", box).addEventListener("pointermove", e => {
      const p = e.target.closest("path[data-iso]"); if (!p) { tip.hidden = true; return; }
      const iso = p.dataset.iso, r = stage.getBoundingClientRect();
      tip.hidden = false; tip.innerHTML = `${flag(iso)} ${esc(cname(iso))} <b>${cnt[iso] || 0}</b>`;
      tip.style.left = (e.clientX - r.left + 14) + "px"; tip.style.top = (e.clientY - r.top + 14) + "px";
    });
    $("svg", box).addEventListener("pointerleave", () => { tip.hidden = true; });
    pick(top[0]?.[0]);
  }

  // ---------- 1200x1200 PNG Share Card ----------
  const toDataUrl = async u => { const b = await (await fetch(u)).blob(); return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b); }); };
  const loadImg = src => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
  function wrapCanvas(ctx, text, maxW, maxLines) {
    const words = String(text).split(/\s+/), lines = []; let cur = "";
    for (const w of words) { const t = cur ? cur + " " + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; if (lines.length === maxLines) break; } else cur = t; }
    if (lines.length < maxLines && cur) lines.push(cur);
    if (lines.join(" ").split(/\s+/).length < words.length) { let l = lines[lines.length - 1]; while (ctx.measureText(l + "…").width > maxW && l.length > 4) l = l.replace(/\s*\S+$/, ""); lines[lines.length - 1] = l.replace(/[,;:.]$/, "") + "…"; }
    return lines;
  }
  async function shareCanvas(it) {
    const fa = LANG === "fa";
    await Promise.all([
      "700 44px 'Inter Tight'", "600 20px 'Inter Tight'", "italic 400 30px Newsreader",
      "700 26px 'Vazirmatn'", "400 26px 'Vazirmatn'",
    ].map(f => document.fonts.load(f).catch(() => {})));
    const b = brandOf(it.publisher);
    let inner = coverInner(it);
    for (const u of [b.i, b.m].filter(Boolean)) { try { inner = inner.split(`href="${u}"`).join(`href="${await toDataUrl(u)}"`); } catch (e) {} }
    const defs = COVER_DEFS.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 474 900" width="948" height="1800">${defs}${inner}</svg>`;
    const cover = await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
    const c = document.createElement("canvas"); c.width = 1200; c.height = 1200;
    const x = c.getContext("2d"), col = COVER_C[it.topic] || "#146356";
    x.fillStyle = "#EFEBE2"; x.fillRect(0, 0, 1200, 1200);
    x.fillStyle = col; x.fillRect(0, 0, 1200, 10);
    const logo = await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent($(".logo").outerHTML.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"')));
    x.drawImage(logo, 70, 58, 46, 46);
    x.direction = "ltr"; x.textAlign = "left"; x.fillStyle = "#151412"; x.font = "800 26px 'Inter Tight'"; x.textBaseline = "middle"; x.fillText("Market Research", 130, 82);
    const wW = x.measureText("Market Research ").width; x.fillStyle = "#C84B31"; x.font = "italic 400 29px Newsreader"; x.fillText("Hub", 130 + wW, 82);
    x.textAlign = "right"; x.direction = fa ? "rtl" : "ltr"; x.fillStyle = col;
    x.font = fa ? "700 21px 'Vazirmatn'" : "700 20px 'Inter Tight'";
    x.fillText(BY_KEY[it.topic] ? tabName(BY_KEY[it.topic]) : "", 1130, 82);
    x.direction = "ltr"; x.textAlign = "left";
    x.save(); x.shadowColor = "rgba(20,16,10,.35)"; x.shadowBlur = 50; x.shadowOffsetY = 24; x.drawImage(cover, 70, 160, 440, 835); x.restore();
    const X0 = 570, X1 = 1130, MW = 560; let y = 185;
    x.textBaseline = "alphabetic"; x.fillStyle = "#151412";
    const hasFaTitle = fa && it.title_fa;
    x.font = hasFaTitle ? "700 36px 'Inter Tight'" : "700 42px 'Inter Tight'";
    wrapCanvas(x, it.title, MW, hasFaTitle ? 4 : 5).forEach(l => { x.fillText(l, X0, y + 38); y += hasFaTitle ? 45 : 52; });
    if (hasFaTitle) {
      y += 12; x.direction = "rtl"; x.textAlign = "right"; x.fillStyle = col; x.font = "700 24px 'Vazirmatn'";
      wrapCanvas(x, it.title_fa, MW, 2).forEach(l => { x.fillText(l, X1, y + 26); y += 36; });
      x.direction = "ltr"; x.textAlign = "left";
    }
    y += 22; x.fillStyle = col; x.fillRect(fa && ((it.canon && (it.stat_fa || it.finding_fa)) || it.summary_fa) ? X1 - 56 : X0, y, 56, 4); y += 44;
    const faQuote = fa && (it.canon ? (it.stat_fa || it.finding_fa) : it.summary_fa);
    const q = faQuote
      ? (it.canon ? [it.stat_fa, it.finding_fa].filter(Boolean).join(" — ") : it.summary_fa)
      : (it.canon ? (it.stat_en + " " + it.finding_en) : (it.finding || it.summary || ""));
    if (q) {
      if (faQuote) {
        x.direction = "rtl"; x.textAlign = "right"; x.fillStyle = "#2A2825"; x.font = "500 24px 'Vazirmatn'";
        wrapCanvas(x, `«${q}»`, MW, 7).forEach(l => { x.fillText(l, X1, y); y += 40; });
        x.direction = "ltr"; x.textAlign = "left";
      } else {
        x.fillStyle = "#2A2825"; x.font = "italic 400 29px Newsreader";
        wrapCanvas(x, `“${q}”`, MW, 8).forEach(l => { x.fillText(l, X0, y); y += 42; });
      }
    }
    const pubY = 960;
    if (b.i) { try { const pl = await loadImg(await toDataUrl(b.i)); x.fillStyle = "#fff"; x.beginPath(); x.roundRect(X0, pubY - 30, 44, 44, 10); x.fill(); x.drawImage(pl, X0 + 6, pubY - 24, 32, 32); } catch (e) {} }
    x.fillStyle = "#151412"; x.font = "600 22px 'Inter Tight'"; x.fillText(trim(pub(it.publisher), 38), X0 + (b.i ? 60 : 0), pubY);
    x.fillStyle = "#6E6A61"; x.font = fa ? "500 18px 'Vazirmatn'" : "400 19px 'Inter Tight'";
    x.direction = fa ? "rtl" : "ltr";
    if (fa) { x.textAlign = "left"; }
    x.fillText(`${it.canon ? T("canonBadge") : (kindLabel(it.kind) || "Work")} · ${it.canon ? it.year : fmtFull(it.date)}`, X0 + (b.i ? 60 : 0), pubY + 28);
    x.direction = "ltr"; x.textAlign = "left";
    x.fillStyle = "#0F2922"; x.fillRect(0, 1080, 1200, 120);
    x.fillStyle = "#FAF8F3"; x.font = "700 23px 'Inter Tight'"; x.fillText("market-research-hub", 70, 1148);
    x.textAlign = "right"; x.direction = fa ? "rtl" : "ltr"; x.fillStyle = "#E6A441";
    x.font = fa ? "600 22px 'Vazirmatn'" : "italic 400 24px Newsreader";
    x.fillText(T("shareTagline"), 1130, 1148);
    return c;
  }
  async function openShare(it) {
    const box = document.createElement("div");
    box.className = "share"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
    box.innerHTML = `<div class="share-card"><div class="share-img"><p>${T("shareDrawing")}</p></div>
      <div class="share-act"><button class="s-btn lbl primary" data-sh="dl" disabled>${T("shareDl")}</button><button class="s-btn lbl" data-sh="copy" disabled hidden>${T("shareCopy")}</button><button class="s-btn lbl" data-sh="share" disabled hidden>${T("shareNative")}</button><button class="s-btn lbl" data-sh="x">${T("close")}</button></div>
      <p class="share-note">${T("shareNote")}</p></div>`;
    $("#sheet").appendChild(box);
    const close = () => box.remove();
    box.addEventListener("click", async e => {
      if (e.target === box) return close();
      const a = e.target.closest("[data-sh]"); if (!a) return;
      if (a.dataset.sh === "x") return close();
      const blob = box._blob, name = `${slugify(it.title).slice(0, 60)}.png`;
      if (a.dataset.sh === "dl") { const u = URL.createObjectURL(blob); const l = document.createElement("a"); l.href = u; l.download = name; l.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); }
      if (a.dataset.sh === "copy") { try { await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]); a.textContent = T("shareCopied"); } catch (err) {} }
      if (a.dataset.sh === "share") { try { await navigator.share({ files: [new File([blob], name, { type: "image/png" })], title: it.title, text: it.url }); } catch (err) {} }
    });
    box.addEventListener("keydown", e => { if (e.key === "Escape") { e.stopPropagation(); close(); } });
    try {
      const c = await shareCanvas(it);
      box._blob = await new Promise(r => c.toBlob(r, "image/png"));
      $(".share-img", box).innerHTML = `<img src="${URL.createObjectURL(box._blob)}" alt="Share card for ${esc(it.title)}">`;
      box.querySelectorAll("[data-sh]").forEach(b => { b.disabled = false; });
      if (window.ClipboardItem && navigator.clipboard?.write) $('[data-sh="copy"]', box).hidden = false;
      if (navigator.canShare && navigator.canShare({ files: [new File([box._blob], "x.png", { type: "image/png" })] })) $('[data-sh="share"]', box).hidden = false;
    } catch (err) { $(".share-img", box).innerHTML = `<p>Could not render card in this browser.</p>`; }
  }
  const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // ---------- Events, Theme, Language & Boot ----------
  function bind() {
    document.addEventListener("click", e => {
      const slot = e.target.closest("[data-week]"); if (slot) return pickWeek(slot.dataset.week);
      const cid = e.target.closest("[data-cid]");
      if (cid) { const it = state.canon.find(x => x.id === cid.dataset.cid); if (it) openSheet(it, (cid.querySelector(".canon-cover") || cid).getBoundingClientRect()); return; }
      const cp = e.target.closest("[data-cp]");
      if (cp) { state.canonPillar = cp.dataset.cp; return renderCanon(); }
      const lid = e.target.closest("[data-lid]");
      if (lid) { const it = findItem(lid.dataset.lid); if (it) openSheet(it, (lid.querySelector(".ld-cover, .ld-thumb, .ld-mono") || lid).getBoundingClientRect()); return; }
      const lw = e.target.closest("[data-lw]");
      if (lw && lw.dataset.lw) { state.week = lw.dataset.lw; setUrl(); return renderBrief(); }
      const ex = e.target.closest("[data-exp]");
      if (ex && state.brief) { const f = { xlsx: exportXlsx, docx: exportDocx, pdf: exportPdf }[ex.dataset.exp]; if (f) f(state.brief); return; }
      const row = e.target.closest(".row[data-id]");
      if (row && state.issue) { const it = state.issue.items.find(i => i.id === row.dataset.id); if (it) openSheet(it, row.getBoundingClientRect()); return; }
      const kind = e.target.closest("[data-kind]");
      if (kind) { state.kind = kind.dataset.kind; state.shown = 20; return renderRows(); }
      if (e.target.closest("#lhBtn")) { state.longHorizon = !state.longHorizon; state.shown = 20; return renderRows(); }
      if (e.target.closest("#empBtn")) { state.empirical = !state.empirical; state.shown = 20; return renderRows(); }
      const rb = e.target.closest("[data-reel]"); if (rb) return playReel(rb.dataset.reel);
      if (e.target.closest("#sShare") && sheetIt) return openShare(sheetIt);
      if (e.target.closest("[data-mapm]")) { const b = e.target.closest("[data-mapm]"); b.parentElement.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); return mountMap($("#map"), b.dataset.mapm); }
      if (e.target.closest("#more")) { state.shown += 20; return renderRows(); }
      if (e.target.closest("#clear")) { state.kind = "all"; state.longHorizon = false; state.empirical = false; state.q = ""; const q = $("#q"); if (q) q.value = ""; return renderRows(); }
      if (e.target.closest("#sClose")) closeSheet();
    });
    document.addEventListener("input", e => { if (e.target.id === "q") { state.q = e.target.value; state.shown = 20; renderRows(); } });
    document.addEventListener("keydown", e => {
      const open = !$("#sheet").hidden;
      if (e.key === "Escape" && open) { closeSheet(); return; }
      const slot = e.target.closest && e.target.closest("[data-week]");
      if (slot && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pickWeek(slot.dataset.week); return; }
      const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
      if (!open && !typing && SH.api && SH.api.inView()) {
        if (e.key === "ArrowLeft") { e.preventDefault(); SH.api.step(-1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); SH.api.step(1); }
        else if (e.key === "Enter" && (e.target === document.body || e.target.closest(".shelf-hero"))) { e.preventDefault(); SH.api.openActive(); }
      }
    });
    window.addEventListener("hashchange", route);

    $("#langToggle").addEventListener("click", async () => {
      LANG = LANG === "en" ? "fa" : "en";
      try { localStorage.setItem("mrh-lang", LANG); } catch (e) {}
      const wasOpen = sheetIt;
      applyStaticLang();
      await route(false, true);
      if (wasOpen) openSheet(wasOpen, null);
    });

    const intro = $("#introStrip"), introBtn = $("#introClose");
    if (intro && introBtn) {
      if (document.documentElement.dataset.intro === "off") intro.hidden = true;
      introBtn.addEventListener("click", () => {
        try { localStorage.setItem("mrh-intro-dismissed", "1"); } catch (e) {}
        intro.classList.add("closing");
        setTimeout(() => {
          intro.hidden = true;
          document.documentElement.dataset.intro = "off";
          window.dispatchEvent(new Event("resize"));
        }, 280);
      });
    }
  }

  async function pickWeek(w) {
    if (w === state.week) return;
    state.week = w; state.shown = 20; state.openId = null; setUrl();
    await renderTab(false);
    const sel = document.querySelector(`.slot[data-week="${w}"]`); if (sel) sel.focus({ preventScroll: true });
  }

  async function route(initial, keepScroll) {
    const r = parseHash();
    const t = BY_SLUG[r.slug] || null, prev = state.tab;
    state.page = t ? "tab" : r.slug === "brief" ? "brief" : r.slug === "canon" ? "canon" : "home";
    const weeks = state.index.issues.map(i => i.week);
    state.route = r; state.tab = t;
    state.week = r.w && weeks.includes(r.w) ? r.w : weeks[0];
    if (t !== prev && !keepScroll) { state.kind = "all"; state.longHorizon = false; state.empirical = false; state.q = ""; state.shown = 20; }
    state.openId = null; hideSheetNow();
    if (!keepScroll) window.scrollTo(0, 0);
    markMode();
    if (t) await renderTab(true);
    else if (state.page === "brief") await renderBrief();
    else if (state.page === "canon") await renderCanon();
    else { await renderHome(); markTab(); }
    if (r.i) { const it = findItem(r.i); if (it) openSheet(it, null); }
  }

  function renderFooter() {
    if (!state.index) return;
    $("#generated").textContent = state.index.generated ? `${T("updated")} ${fmtFull(state.index.generated)}` : "";
    const list = v => (Array.isArray(v) ? v : Object.keys(v || {}));
    const src = state.index.sources || {};
    $("#sources").innerHTML = [...list(src.databases), ...list(src.publishers)].map(s => `<span>${LOGOS[s] ? plogo(s) : ""}${esc(pub(s))}</span>`).join("");
  }

  function bindTheme() {
    const btn = $("#theme"), root = document.documentElement;
    const sync = () => {
      const dark = root.dataset.theme === "dark";
      btn.setAttribute("aria-pressed", dark);
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.title = btn.getAttribute("aria-label");
      document.querySelector('meta[name="theme-color"]').content = dark ? "#0D1110" : "#0F2922";
    };
    btn.addEventListener("click", () => {
      root.classList.add("theming");
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("mrh-theme", root.dataset.theme); } catch (e) {}
      sync(); setTimeout(() => root.classList.remove("theming"), 420);
    });
    sync();
  }

  async function boot() {
    try {
      document.body.insertAdjacentHTML("beforeend", COVER_DEFS);
      const [idx, canon, logos] = await Promise.all([
        getJSON("data/index.json"),
        getJSON("data/canon.json").catch(() => ({ items: [] })),
        getJSON("data/logos.json").catch(() => ({})),
      ]);
      state.index = idx;
      state.canon = canon.items || [];
      LOGOS = logos || {};
      state.index.issues.sort((a, b) => (a.week < b.week ? 1 : -1));
      applyStaticLang();
      bind();
      bindTheme();
      await route(true);
    } catch (err) {
      $("#view").innerHTML = `<div class="wrap" style="padding-top:80px"><h1 style="font-family:var(--display);font-weight:700">The research data did not load.</h1><p style="margin-top:12px">Reload the page to try again.</p></div>`;
      console.error(err);
    }
  }
  boot();
})();
