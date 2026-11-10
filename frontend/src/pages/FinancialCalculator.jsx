
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  PiggyBank,
  Wallet,
  Home,
  ShieldCheck,
  GraduationCap,
  Car,
  Plane,
  Heart,
  Landmark,
  ChartNoAxesCombined,
  IndianRupee,
  Menu,
} from "lucide-react";

const calculatorGroups = [
  {
    title: "Financial Calculators",
    description: "Plan your investments and future goals.",
    tools: [
      { name: "SIP Calculator", desc: "Calculate monthly SIP maturity value.", icon: TrendingUp, type: "sip" },
      { name: "Lumpsum Calculator", desc: "Calculate one-time investment growth.", icon: PiggyBank, type: "lumpsum" },
      { name: "Step-up SIP Calculator", desc: "Increase your SIP every year and estimate the growth.", icon: TrendingUp, type: "stepup" },
      { name: "Retirement Planning", desc: "Plan your retirement corpus.", icon: Landmark, type: "retirement" },
      { name: "Delay Planning Calculator", desc: "Understand the cost of delayed investing.", icon: TrendingUp, type: "delay" },
      { name: "Life Insurance Calculator", desc: "Estimate income replacement needs.", icon: ShieldCheck, type: "insurance" },
      { name: "EMI Planning Calculator", desc: "Calculate monthly loan payments.", icon: Calculator, type: "emi" },
      { name: "Tax Calculator", desc: "Estimate tax using basic new-regime slabs.", icon: IndianRupee, type: "tax" },
      { name: "Marriage Planning Calculator", desc: "Plan your wedding savings goal.", icon: Heart, type: "goal" },
      { name: "Education Planning Calculator", desc: "Estimate future education expenses.", icon: GraduationCap, type: "goal" },
      { name: "Home Loan Calculator", desc: "Estimate your home loan EMI.", icon: Home, type: "emi" },
      { name: "Car Planning Calculator", desc: "Plan your next vehicle purchase.", icon: Car, type: "goal" },
      { name: "Vacation Planning Calculator", desc: "Build a savings plan for travel.", icon: Plane, type: "goal" },
    ],
  },
  {
    title: "Mutual Fund (MF) Calculators",
    description: "Explore mutual fund performance tools.",
    tools: [
      { name: "SIP Performance", desc: "Calculate mutual fund SIP investment performance.", icon: TrendingUp, type: "mfSip" },
      { name: "STP Performance", desc: "Calculate source-to-target mutual fund transfers.", icon: ChartNoAxesCombined, type: "mfStp" },
      { name: "SWP Performance", desc: "Calculate mutual fund withdrawal duration and balance.", icon: Wallet, type: "mfSwp" },
      { name: "Scheme Performance", desc: "Compare mutual fund schemes.", icon: ChartNoAxesCombined, type: "scheme" },
      { name: "Fund Performance", desc: "Compare returns of two mutual fund schemes.", icon: PiggyBank, type: "fund" },
      { name: "NAV Finder Calculator", desc: "Find historical NAV for a scheme and date.", icon: SearchIcon, type: "nav" },
    ],
  },
];

function SearchIcon(props) {
  return <Calculator {...props} />;
}

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function CalculatorModal({ tool, onClose }) {
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [schemeOptions, setSchemeOptions] = useState([]);
  const type = tool.type;
  const isMF = ["mfSip", "mfStp", "mfSwp", "market"].includes(type);

  const set = (key, value) => {
    setValues((old) => ({ ...old, [key]: value }));
    setResult(null);
    setError("");
  };
  const v = (key) => values[key] ?? "";
  const n = (key) => v(key) === "" ? NaN : Number(v(key));
  const positive = (key) => Number.isFinite(n(key)) && n(key) > 0;
  const rateOK = (key) => Number.isFinite(n(key)) && n(key) >= 0 && n(key) <= 100;
  const inr = (x) => formatINR(x);
  const monthsFromYears = (y) => Math.round(y * 12);
  const monthlyRate = (annual) => Math.pow(1 + annual / 100, 1 / 12) - 1;
  const sipFV = (pmt, annual, months, due = false) => {
    const r = monthlyRate(annual);
    if (!months) return 0;
    if (Math.abs(r) < 1e-12) return pmt * months;
    const fv = pmt * (Math.pow(1 + r, months) - 1) / r;
    return due ? fv * (1 + r) : fv;
  };
  const sipRequired = (target, annual, months) => {
    const r = monthlyRate(annual);
    if (!months) return NaN;
    if (Math.abs(r) < 1e-12) return target / months;
    return target * r / (Math.pow(1 + r, months) - 1);
  };

  const fieldsByType = {
    sip: [
      ["monthly", "Monthly SIP amount (₹)"], ["rate", "Expected annual return (%)"], ["years", "Investment period (years)"]
    ],
    lumpsum: [["principal", "One-time investment (₹)"], ["rate", "Expected annual return (%)"], ["years", "Investment period (years)"]],
    stepup: [["monthly", "Starting monthly SIP (₹)"], ["step", "Annual SIP step-up (%)"], ["rate", "Expected annual return (%)"], ["years", "Investment period (years)"]],
    retirement: [["age", "Current age (years)"], ["retireAge", "Retirement age (years)"], ["expense", "Current monthly household expenses (₹)"], ["retireYears", "Years in retirement"], ["inflation", "Annual expense inflation (%)"], ["preRate", "Pre-retirement annual return (%)"], ["postRate", "Post-retirement annual return (%)"]],
    delay: [["monthly", "Monthly SIP amount (₹)"], ["rate", "Expected annual return (%)"], ["years", "Total goal period (years)"], ["delay", "Delay before starting (years)"]],
    insurance: [["income", "Annual income to replace (₹)"], ["replaceYears", "Income replacement period (years)"], ["loans", "Outstanding loans/liabilities (₹)"], ["goals", "Future family goals (₹)"], ["assets", "Liquid assets available (₹)"], ["cover", "Existing life cover (₹)"]],
    emi: [["principal", "Loan amount (₹)"], ["rate", "Annual interest rate (%)"], ["years", "Loan tenure (years)"]],
    tax: [["income", "Annual gross salary (₹)"], ["deduction", "Standard deduction (₹) — default 75000"]],
    goal: [["goalCost", "Goal cost today (₹)"], ["years", "Years until goal"], ["inflation", "Expected annual inflation (%)"], ["rate", "Expected annual investment return (%)"]],
    mfSip: [["scheme", "MF scheme code"], ["monthly", "Monthly SIP amount (₹)"], ["start", "SIP start date (YYYY-MM-DD)"], ["end", "Valuation date (YYYY-MM-DD)"]],
    mfStp: [["source", "Source scheme code"], ["target", "Target scheme code"], ["corpus", "Initial source investment (₹)"], ["transfer", "Monthly transfer (₹)"], ["start", "STP start date (YYYY-MM-DD)"], ["end", "Valuation date (YYYY-MM-DD)"]],
    mfSwp: [["scheme", "MF scheme code"], ["corpus", "Initial investment (₹)"], ["withdrawal", "Monthly withdrawal (₹)"], ["start", "SWP start date (YYYY-MM-DD)"], ["end", "Valuation date (YYYY-MM-DD)"]],
    scheme: [["scheme", "MF scheme code"], ["start", "Start date (YYYY-MM-DD)"], ["end", "End date (YYYY-MM-DD)"]],
    fund: [["scheme1", "First fund scheme code"], ["scheme2", "Second fund scheme code"], ["start", "Start date (YYYY-MM-DD)"], ["end", "End date (YYYY-MM-DD)"]],
    nav: [["scheme", "MF scheme code"], ["date", "NAV date (YYYY-MM-DD)"]],
  };

  const goalName = tool.name.replace(" Calculator", "");
  const fields = fieldsByType[type] || (type === "homeEmi" ? fieldsByType.emi : fieldsByType.goal);

  const calculateFinancial = () => {
    setError("");
    const required = (keys) => keys.every((key) => v(key) !== "" && Number.isFinite(Number(v(key))));
    const positiveKeys = (keys) => keys.every(positive);
    const validRates = (keys) => keys.every(rateOK);
    let out;

    if (type === "sip") {
      if (!positiveKeys(["monthly", "years"]) || !rateOK("rate")) return setError("Enter a positive SIP and duration, and a return rate from 0–100%.");
      const months = monthsFromYears(n("years"));
      const invested = n("monthly") * months;
      const value = sipFV(n("monthly"), n("rate"), months);
      out = { title: "SIP maturity value", value, invested, gain: value - invested, details: `Monthly SIP: ${inr(n("monthly"))}; ${months} instalments; assumed annual return ${n("rate")}%` };
    } else if (type === "lumpsum") {
      if (!positiveKeys(["principal", "years"]) || !rateOK("rate")) return setError("Enter a positive investment and duration, and a return rate from 0–100%.");
      const value = n("principal") * Math.pow(1 + n("rate") / 100, n("years"));
      out = { title: "Lumpsum maturity value", value, invested: n("principal"), gain: value - n("principal"), details: "Annual compounding on a single initial investment." };
    } else if (type === "stepup") {
      if (!positiveKeys(["monthly", "years"]) || !validRates(["step", "rate"])) return setError("Enter a positive starting SIP and duration; step-up and return must be 0–100%.");
      const months = monthsFromYears(n("years")); const mr = monthlyRate(n("rate")); let value = 0; let invested = 0;
      for (let m = 0; m < months; m++) { const payment = n("monthly") * Math.pow(1 + n("step") / 100, Math.floor(m / 12)); value = (value + payment) * (1 + mr); invested += payment; }
      out = { title: "Step-up SIP maturity value", value, invested, gain: value - invested, details: `Starting SIP ${inr(n("monthly"))}, stepped up ${n("step")}% after every 12 instalments.` };
    } else if (type === "retirement") {
      if (!positiveKeys(["age", "retireAge", "expense", "retireYears"]) || n("retireAge") <= n("age") || !validRates(["inflation", "preRate", "postRate"])) return setError("Check ages, monthly expenses, retirement duration and all return/inflation rates.");
      const yearsToRetire = n("retireAge") - n("age"); const g = n("inflation") / 100; const r = n("postRate") / 100;
      const firstAnnualExpense = n("expense") * 12 * Math.pow(1 + g, yearsToRetire);
      let corpus = 0;
      for (let y = 0; y < n("retireYears"); y++) corpus += firstAnnualExpense * Math.pow(1 + g, y) / Math.pow(1 + r, y);
      const months = yearsToRetire * 12; const monthlySIP = sipRequired(corpus, n("preRate"), months);
      out = { title: "Required retirement corpus", value: corpus, invested: monthlySIP * months, gain: null, extra: `Required monthly SIP until retirement: ${inr(monthlySIP)}. First-year retirement expense: ${inr(firstAnnualExpense)} per year.`, details: "Annual expenses are inflated until retirement and then modeled as beginning-of-year withdrawals, with the post-retirement return discounted annually." };
    } else if (type === "delay") {
      if (!positiveKeys(["monthly", "years", "delay"]) || !rateOK("rate") || n("delay") >= n("years")) return setError("Delay must be positive and shorter than the total goal period.");
      const total = monthsFromYears(n("years")); const delayed = monthsFromYears(n("years") - n("delay"));
      const startNow = sipFV(n("monthly"), n("rate"), total); const startLater = sipFV(n("monthly"), n("rate"), delayed);
      out = { title: "Value if SIP starts today", value: startNow, invested: n("monthly") * total, gain: startNow - n("monthly") * total, extra: `Value after delaying ${n("delay")} years: ${inr(startLater)}. Estimated opportunity gap: ${inr(startNow - startLater)}.`, details: "Both plans are valued on the same final date; the delayed plan makes fewer monthly contributions." };
    } else if (type === "insurance") {
      if (!positiveKeys(["income", "replaceYears"]) || !required(["loans", "goals", "assets", "cover"]) || ["loans", "goals", "assets", "cover"].some(k => n(k) < 0)) return setError("Enter annual income, replacement years, liabilities, goals, assets and existing cover. Use 0 where not applicable.");
      const need = Math.max(0, n("income") * n("replaceYears") + n("loans") + n("goals") - n("assets") - n("cover"));
      out = { title: "Estimated additional life cover needed", value: need, details: "Income replacement + outstanding liabilities + future family goals − liquid assets − existing life cover. This is a needs estimate, not an insurance recommendation." };
    } else if (type === "emi" || type === "homeEmi") {
      if (!positiveKeys(["principal", "years"]) || !rateOK("rate")) return setError("Enter a positive loan amount and tenure, and interest rate from 0–100%.");
      const months = monthsFromYears(n("years")); const r = monthlyRate(n("rate")); const emi = r === 0 ? n("principal") / months : n("principal") * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1); const total = emi * months;
      out = { title: "Monthly loan EMI", value: emi, invested: n("principal"), gain: total - n("principal"), extra: `Total repayment: ${inr(total)} over ${months} months.`, details: "Reducing-balance EMI formula; assumes a fixed rate for the full tenure." };
    } else if (type === "tax") {
      if (!positive("income") || v("deduction") === "" || n("deduction") < 0) return setError("Enter annual salary and standard deduction (enter 0 if not applicable).");
      const taxable = Math.max(0, n("income") - n("deduction")); const slabs = [[400000,0],[800000,.05],[1200000,.10],[1600000,.15],[2000000,.20],[2400000,.25],[Infinity,.30]]; let base = 0, tax = 0;
      for (const [limit, pct] of slabs) { tax += Math.max(0, Math.min(taxable, limit) - base) * pct; base = limit; if (taxable <= limit) break; }
      let rebate = taxable <= 1200000 ? Math.min(tax, 60000) : 0;
      if (taxable > 1200000) rebate = Math.max(0, tax - (taxable - 1200000));
      const beforeCess = Math.max(0, tax - rebate); const totalTax = beforeCess * 1.04;
      out = { title: "Estimated new-regime income tax", value: totalTax, extra: `Taxable income: ${inr(taxable)}; tax before cess: ${inr(beforeCess)}; 4% cess included.`, details: "Illustrative resident-individual salary estimate for tax year 2026–27 using ₹4L–₹24L new-regime slabs, ₹75,000 standard deduction as entered, Section 87A rebate and marginal relief. Surcharge, special-rate income and other adjustments are excluded; verify with the official tax portal." };
    } else if (type === "goal") {
      if (!positiveKeys(["goalCost", "years"]) || !validRates(["inflation", "rate"])) return setError("Enter goal cost, time horizon and inflation/return rates (0–100%).");
      const futureCost = n("goalCost") * Math.pow(1 + n("inflation") / 100, n("years")); const months = monthsFromYears(n("years")); const sip = sipRequired(futureCost, n("rate"), months);
      out = { title: `${goalName} — future goal cost`, value: futureCost, extra: `Monthly SIP required to target this amount: ${inr(sip)}.`, details: `Future cost is inflated at ${n("inflation")}% annually; required monthly investment assumes ${n("rate")}% annual return and month-end instalments.` };
    }
    setResult(out);
  };

  const fetchScheme = async (code) => {
    const response = await fetch(`https://api.mfapi.in/mf/${encodeURIComponent(code)}`);
    if (!response.ok) throw new Error(`MF API request failed (${response.status}). Check the scheme code or try again.`);
    const json = await response.json();
    if (!json.data || !Array.isArray(json.data) || !json.data.length) throw new Error("No NAV history returned for this scheme.");
    return { meta: json.meta, data: json.data.map(x => ({ date: parseMFDate(x.date), nav: Number(x.nav) })).filter(x => x.date && Number.isFinite(x.nav) && x.nav > 0).sort((a,b) => a.date - b.date) };
  };
  const parseMFDate = (s) => { const [d,m,y] = String(s).split("-").map(Number); return new Date(y, m - 1, d); };
  const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const findNav = (rows, date) => { const target = new Date(`${date}T00:00:00`); let found = null; for (const row of rows) { if (row.date <= target) found = row; else break; } return found; };
  const dateRange = (start, end) => { const s = new Date(`${start}T00:00:00`); const e = new Date(`${end}T00:00:00`); if (!start || !end || Number.isNaN(+s) || Number.isNaN(+e) || s >= e) throw new Error("Enter valid dates; end date must be after start date."); return { s, e }; };

  const calculateMF = async () => {
    setLoading(true); setError(""); setResult(null);
    try {
      let out;
      if (type === "nav") {
        if (!v("scheme") || !v("date")) throw new Error("Enter scheme code and NAV date.");
        const fund = await fetchScheme(v("scheme")); const nav = findNav(fund.data, v("date"));
        if (!nav) throw new Error("NAV is not available on or before this date.");
        out = { title: "NAV on selected date", value: nav.nav, extra: `${fund.meta?.scheme_name || "Scheme"} · ${nav.date.toLocaleDateString("en-IN")}`, details: "NAV is taken from the most recent published NAV on or before the selected date." };
      } else if (type === "scheme") {
        if (!v("scheme")) throw new Error("Enter a scheme code."); const { s, e } = dateRange(v("start"), v("end")); const fund = await fetchScheme(v("scheme")); const a = findNav(fund.data, v("start")); const b = findNav(fund.data, v("end"));
        if (!a || !b || a.nav <= 0) throw new Error("NAV data is unavailable for the selected dates."); const abs = (b.nav / a.nav - 1) * 100; const days = (b.date - a.date) / 86400000; const cagr = days > 0 ? (Math.pow(b.nav / a.nav, 365.25 / days) - 1) * 100 : 0;
        out = { title: "Scheme performance", value: abs, suffix: "% absolute return", extra: `${fund.meta?.scheme_name || "Scheme"}; start NAV ${a.nav.toFixed(4)} (${a.date.toLocaleDateString("en-IN")}); end NAV ${b.nav.toFixed(4)} (${b.date.toLocaleDateString("en-IN")}); CAGR ${cagr.toFixed(2)}%.`, details: "NAV-to-NAV return for the selected period. CAGR annualizes the same NAV change; it is not a total-return index and excludes investor taxes/loads." };
      } else if (type === "fund") {
        if (!v("scheme1") || !v("scheme2")) throw new Error("Enter both scheme codes."); dateRange(v("start"), v("end")); const [f1,f2] = await Promise.all([fetchScheme(v("scheme1")), fetchScheme(v("scheme2"))]);
        const a1 = findNav(f1.data,v("start")), b1 = findNav(f1.data,v("end")), a2 = findNav(f2.data,v("start")), b2 = findNav(f2.data,v("end")); if (![a1,b1,a2,b2].every(Boolean)) throw new Error("One or both funds do not have NAV for the selected period.");
        const r1 = (b1.nav/a1.nav-1)*100, r2 = (b2.nav/a2.nav-1)*100;
        out = { title: "Fund comparison — absolute NAV return", value: r1, suffix: "% — Fund 1", extra: `${f1.meta?.scheme_name || v("scheme1")}: ${r1.toFixed(2)}%; ${f2.meta?.scheme_name || v("scheme2")}: ${r2.toFixed(2)}%.`, details: "Compares NAV-to-NAV percentage returns over identical dates. Compare like-for-like plan, option and category; past performance does not predict future returns." };
      } else if (type === "mfSip") {
        if (!v("scheme") || !positive("monthly")) throw new Error("Enter scheme code and monthly SIP amount."); dateRange(v("start"),v("end")); const fund = await fetchScheme(v("scheme")); let units = 0, invested = 0, count = 0; const start = new Date(`${v("start")}T00:00:00`), end = new Date(`${v("end")}T00:00:00`);
        for (let d = new Date(start); d <= end; d.setMonth(d.getMonth()+1)) { const nav = findNav(fund.data, dateKey(d)); if (nav) { units += n("monthly")/nav.nav; invested += n("monthly"); count++; } }
        const last = findNav(fund.data,v("end")); if (!count || !last) throw new Error("No matching monthly NAV dates found in this period."); const value = units*last.nav;
        out = { title: "Historical MF SIP value", value, invested, gain: value-invested, extra: `${fund.meta?.scheme_name || "Scheme"}; instalments: ${count}; units accumulated: ${units.toFixed(4)}; latest NAV: ${last.nav.toFixed(4)}.`, details: "Historical simulation: each monthly instalment buys units at the most recent available NAV on or before that monthly date. SIP date convention is approximate; actual allotment follows scheme cut-off and business-day rules." };
      } else if (type === "mfStp") {
        if (!v("source") || !v("target") || !positive("corpus") || !positive("transfer")) throw new Error("Enter source and target scheme codes, initial corpus and monthly transfer."); dateRange(v("start"),v("end")); const [src,dst] = await Promise.all([fetchScheme(v("source")),fetchScheme(v("target"))]); const first = findNav(src.data,v("start")); if (!first) throw new Error("Source fund has no NAV for start date."); let sourceUnits=n("corpus")/first.nav, targetUnits=0, transferred=0, count=0; const start=new Date(`${v("start")}T00:00:00`), end=new Date(`${v("end")}T00:00:00`);
        for(let d=new Date(start.getFullYear(),start.getMonth()+1,start.getDate()); d<=end; d.setMonth(d.getMonth()+1)){ const date=dateKey(d); const sn=findNav(src.data,date), tn=findNav(dst.data,date); if(!sn||!tn) continue; const amount=Math.min(n("transfer"),sourceUnits*sn.nav); sourceUnits-=amount/sn.nav; targetUnits+=amount/tn.nav; transferred+=amount; count++; }
        const sLast=findNav(src.data,v("end")), tLast=findNav(dst.data,v("end")); if(!sLast||!tLast) throw new Error("NAV unavailable on valuation date."); const sourceValue=sourceUnits*sLast.nav, targetValue=targetUnits*tLast.nav;
        out={title:"Historical STP portfolio value",value:sourceValue+targetValue,extra:`Source value ${inr(sourceValue)}; target value ${inr(targetValue)}; amount transferred ${inr(transferred)}; transfer cycles ${count}.`,details:"Historical simulation: fixed rupee transfers redeem source-fund units at source NAV and purchase target-fund units at target NAV. Taxes, exit loads and actual STP processing dates are excluded."};
      } else if (type === "mfSwp") {
        if (!v("scheme") || !positive("corpus") || !positive("withdrawal")) throw new Error("Enter scheme code, initial corpus and monthly withdrawal."); dateRange(v("start"),v("end")); const fund=await fetchScheme(v("scheme")); const first=findNav(fund.data,v("start")); if(!first) throw new Error("No NAV for selected start date."); let units=n("corpus")/first.nav, total=0, count=0; const start=new Date(`${v("start")}T00:00:00`), end=new Date(`${v("end")}T00:00:00`);
        for(let d=new Date(start.getFullYear(),start.getMonth()+1,start.getDate());d<=end;d.setMonth(d.getMonth()+1)){const nav=findNav(fund.data,dateKey(d));if(!nav)continue;const amount=Math.min(n("withdrawal"),units*nav.nav);units-=amount/nav.nav;total+=amount;count++;if(units<=0)break;}
        const last=findNav(fund.data,v("end")); const remaining=last?units*last.nav:0; out={title:"Historical SWP remaining value",value:remaining,extra:`Total withdrawn ${inr(total)} across ${count} withdrawal cycles; remaining units ${units.toFixed(4)}.`,details:"Historical simulation: monthly withdrawals redeem units at the most recent available NAV on or before each scheduled date. Tax, exit loads and actual business-day processing are excluded."};
      }
      setResult(out);
    } catch (e) { setError(e.message || "Unable to calculate with the selected data."); }
    finally { setLoading(false); }
  };

  const marketTypes = ["mfSip","mfStp","mfSwp","scheme","fund","nav"];
  const showMarket = marketTypes.includes(type);
  const submit = () => showMarket ? calculateMF() : calculateFinancial();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={tool.name} className="my-6 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8" onClick={(e)=>e.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between gap-4"><div><span className="mb-3 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700"><Calculator size={24}/></span><h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2><p className="mt-2 text-sm text-slate-500">{tool.desc}</p></div><button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close calculator">✕</button></div>
        <div className="grid gap-4 sm:grid-cols-2">{fields.map(([key,label])=><div key={key}><label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label><input type={key==="start"||key==="end"||key==="date"?"date":"number"} inputMode="decimal" min="0" step="any" value={v(key)} onChange={e=>set(key,e.target.value)} placeholder={key.includes("scheme")||key==="source"||key==="target"?"Enter scheme code":"Enter value"} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/></div>)}</div>
        <button type="button" onClick={submit} disabled={loading} className="mt-6 w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60">{loading?"Fetching NAV data…":showMarket?"Fetch NAV & Calculate":"Calculate"}</button>
        {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {result && <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-700 p-5 text-white"><p className="text-sm text-emerald-100">{result.title}</p><p className="mt-2 break-words text-3xl font-bold">{result.suffix?`${result.value.toFixed(2)} ${result.suffix}`:inr(result.value)}</p>{result.invested!==undefined&&<div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-4"><div><p className="text-xs text-emerald-100">Invested / Principal</p><p className="mt-1 font-semibold">{inr(result.invested)}</p></div><div><p className="text-xs text-emerald-100">Gain / Loss</p><p className="mt-1 font-semibold">{inr(result.gain)}</p></div></div>}{result.extra&&<p className="mt-3 text-sm text-emerald-100">{result.extra}</p>}<p className="mt-4 border-t border-white/20 pt-3 text-xs leading-5 text-emerald-50">{result.details}</p></div>}
        <p className="mt-4 text-xs leading-5 text-slate-500">Planning estimates only. Investment returns are not guaranteed. MF historical results use MFAPI.in NAV data and are not a substitute for official account statements, transaction NAVs or tax calculations.</p>
      </div>
    </div>
  );
}

export default function FinancialCalculator() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [search, setSearch] = useState("");

  const allTools = calculatorGroups.flatMap((group) =>
    group.tools.map((tool) => ({ ...tool, group: group.title }))
  );

  const filteredTools = allTools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#062e2a] via-[#075c4e] to-[#087e68] text-white">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-teal-200/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
              <ChartNoAxesCombined size={17} />
              Smart Financial Planning Tools
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Financial
              <span className="block text-emerald-300">Calculators</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/90 sm:text-lg">
              Plan investments, calculate returns, manage taxes, track retirement
              goals, and make smarter financial decisions with our financial
              planning tools.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#calculators"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Explore Calculators <ArrowRight size={18} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Talk To Advisor
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-6">
              <div>
                <p className="text-2xl font-bold sm:text-3xl">20+</p>
                <p className="mt-1 text-xs text-emerald-100 sm:text-sm">Financial Tools</p>
              </div>
              <div>
                <p className="text-2xl font-bold sm:text-3xl">10K+</p>
                <p className="mt-1 text-xs text-emerald-100 sm:text-sm">Calculations Done</p>
              </div>
              <div>
                <p className="text-2xl font-bold sm:text-3xl">Goal</p>
                <p className="mt-1 text-xs text-emerald-100 sm:text-sm">Focused Planning</p>
              </div>
            </div>
          </div>

          {/* HERO CALCULATOR PANEL */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-100">Your financial snapshot</p>
                  <h2 className="mt-1 text-xl font-bold">Build your future</h2>
                </div>
                <span className="rounded-2xl bg-emerald-300/20 p-3 text-emerald-200">
                  <TrendingUp size={25} />
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-white p-5 text-slate-900">
                <p className="text-sm text-slate-500">Example investment goal</p>
                <p className="mt-2 text-3xl font-bold">₹25,00,000</p>
                <p className="mt-1 text-sm text-emerald-700">Illustrative target corpus</p>

                <div className="mt-6 flex h-28 items-end gap-2">
                  {[25, 34, 30, 45, 40, 54, 48, 65, 58, 76, 70, 95].map((height, index) => (
                    <div
                      key={index}
                      className={`flex-1 rounded-t-md ${
                        index === 11 ? "bg-emerald-700" : "bg-emerald-200"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <span>Start planning</span>
                  <span>Future goals</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, label: "SIP Performance", type: "mfSip" },
                  { icon: Home, label: "EMI Calculator", type: "emi" },
                ].map((item) => {
                  const Icon = item.icon;
                  const tool = allTools.find((t) => t.type === item.type);
                  return (
                    <button
                      key={item.label}
                      onClick={() => setSelectedTool(tool)}
                      className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 text-left transition hover:bg-white/20"
                    >
                      <Icon size={21} className="shrink-0 text-emerald-200" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-7 sm:grid-cols-4 sm:px-8 lg:px-10">
          {[
            { icon: TrendingUp, title: "SIP Performance", text: "Estimate MF SIP growth", type: "mfSip" },
            { icon: Landmark, title: "Retirement", text: "Plan your corpus", type: "retirement" },
            { icon: IndianRupee, title: "Tax Planning", text: "Explore tax planning", type: "tax" },
            { icon: Home, title: "EMI Calculator", text: "Calculate loan EMIs", type: "emi" },
          ].map((item) => {
            const Icon = item.icon;
            const tool = allTools.find((t) => t.type === item.type);
            return (
              <button
                key={item.title}
                onClick={() => setSelectedTool(tool)}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <Icon size={22} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-800">{item.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">{item.text}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* CALCULATORS */}
      <section id="calculators" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Plan • Calculate • Grow
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Build Your Wealth Smarter
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Explore powerful financial calculators and create a roadmap for
            your future investments.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-xl">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
            <Menu size={19} className="text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search calculators..."
              aria-label="Search calculators"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {search.trim() ? (
          <div className="mt-10">
            <p className="mb-5 text-sm text-slate-500">
              {filteredTools.length} tool(s) found
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => (
                <CalculatorCard key={`${tool.group}-${tool.name}`} tool={tool} onSelect={setSelectedTool} />
              ))}
            </div>
            {filteredTools.length === 0 && (
              <p className="py-12 text-center text-slate-500">No calculator found. Try another name.</p>
            )}
          </div>
        ) : (
          calculatorGroups.map((group) => (
            <div key={group.title} className="mt-14">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{group.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{group.description}</p>
                </div>
                <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">
                  {group.tools.length} Tools
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.tools.map((tool) => (
                  <CalculatorCard key={tool.name} tool={tool} onSelect={setSelectedTool} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#063d34] to-emerald-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border-[35px] border-white/5" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full border-[35px] border-white/5" />
          <div className="relative">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <PiggyBank size={28} />
            </span>
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Let’s Start Investing Now
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
              Take the first step towards your financial goals. Explore your
              options and build a plan that suits your needs.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              Talk To An Advisor <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="border-t border-slate-100 bg-slate-50 px-5 py-5 text-center text-xs leading-6 text-slate-500">
        Calculations are for educational and illustrative purposes only. Investment
        returns are not guaranteed. Please consult a qualified financial advisor
        before making financial decisions.
      </div>

      {selectedTool && (
        <CalculatorModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </main>
  );
}

function CalculatorCard({ tool, onSelect }) {
  const Icon = tool.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(tool)}
      className="group flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
    >
      <div className="flex w-full items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
          <Icon size={23} />
        </span>
        <ArrowRight size={18} className="mt-1 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700" />
      </div>
      <h4 className="mt-5 text-base font-bold text-slate-900">{tool.name}</h4>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{tool.desc}</p>
      <span className="mt-5 text-sm font-semibold text-emerald-700">
        Calculate Now
      </span>
    </button>
  );
}
