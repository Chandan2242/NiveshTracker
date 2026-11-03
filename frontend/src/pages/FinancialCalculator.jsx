
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
      { name: "SIP Calculator", desc: "Estimate monthly investment returns.", icon: TrendingUp, type: "sip" },
      { name: "Lumpsum Calculator", desc: "Calculate one-time investment growth.", icon: PiggyBank, type: "lumpsum" },
      { name: "STP Calculator", desc: "Explore systematic transfer planning.", icon: ChartNoAxesCombined, type: "stp" },
      { name: "SWP Calculator", desc: "Estimate regular withdrawals.", icon: Wallet, type: "swp" },
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
    title: "MF Tools Calculators",
    description: "Explore mutual fund performance tools.",
    tools: [
      { name: "SIP Performance", desc: "Explore periodic investment growth.", icon: TrendingUp, type: "sip" },
      { name: "STP Performance", desc: "Understand systematic transfers.", icon: ChartNoAxesCombined, type: "stp" },
      { name: "SWP Performance", desc: "Explore systematic withdrawals.", icon: Wallet, type: "swp" },
      { name: "Scheme Performance", desc: "Compare mutual fund schemes.", icon: ChartNoAxesCombined, type: "market" },
      { name: "Fund Performance", desc: "Review fund return scenarios.", icon: PiggyBank, type: "market" },
      { name: "NAV Finder Calculator", desc: "Find NAV from a verified market-data source.", icon: SearchIcon, type: "market" },
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

function CalculatorPanel({ tool, onClose }) {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [extraAmount, setExtraAmount] = useState("");
  const [inflation, setInflation] = useState("");

  const isMarketTool = tool.type === "market";
  const isEmi = tool.type === "emi";
  const isTax = tool.type === "tax";
  const isStp = tool.type === "stp";
  const isSwp = tool.type === "swp";
  const isGoal = tool.type === "goal";
  const isRetirement = tool.type === "retirement";
  const isInsurance = tool.type === "insurance";
  const isDelay = tool.type === "delay";
  const isSip = tool.type === "sip";

  const amountLabel = isEmi ? "Loan Amount (₹)" : isSip || isDelay ? "Monthly Investment (₹)" : isSwp || isStp ? "Initial Corpus (₹)" : isRetirement ? "Current Monthly Expenses (₹)" : isInsurance ? "Annual Income (₹)" : isTax ? "Annual Taxable Income (₹)" : isGoal ? "Goal Cost Today (₹)" : "Investment Amount (₹)";
  const rateLabel = isEmi ? "Annual Interest Rate (%)" : isTax ? "Tax calculation" : isGoal || isRetirement ? "Annual Inflation (%)" : isInsurance ? "Existing Life Cover (₹)" : "Expected Annual Return (%)";
  const yearsLabel = isTax ? "Tax estimate" : isInsurance ? "Income replacement period (years)" : isRetirement ? "Years until retirement" : isGoal ? "Years until goal" : isDelay ? "Investment horizon (years)" : "Duration (years)";
  const extraLabel = isStp ? "Monthly Transfer Amount (₹)" : isSwp ? "Monthly Withdrawal (₹)" : isInsurance ? "Existing Life Cover (₹, optional)" : "";

  const calculation = useMemo(() => {
    const P = amount === "" ? NaN : Number(amount);
    const R = rate === "" ? NaN : Number(rate);
    const Y = years === "" ? NaN : Number(years);
    const X = extraAmount === "" ? NaN : Number(extraAmount);
    if (isMarketTool) return { ready: false, market: true, message: "Live NAV and actual mutual-fund performance need a verified market-data API. No fabricated market values are shown." };
    if (!Number.isFinite(P) || P <= 0) return { ready: false, message: "Enter an amount greater than zero." };
    if (isTax) {
      const slabs = [[400000, 0], [800000, 0.05], [1200000, 0.10], [1600000, 0.15], [2000000, 0.20], [2400000, 0.25], [Infinity, 0.30]];
      let lower = 0; let tax = 0;
      for (const [upper, slabRate] of slabs) { tax += Math.max(0, Math.min(P, upper) - lower) * slabRate; lower = upper; if (P <= upper) break; }
      return { ready: true, result: tax * 1.04, label: "Estimated tax + 4% cess", invested: null, gain: null, schedule: [], note: "Basic new-regime slab estimate only. Rebate, deductions, special-rate income and marginal relief are excluded. Verify with the official tax calculator." };
    }
    if (!Number.isFinite(Y) || Y <= 0) return { ready: false, message: isSwp ? "Enter withdrawal period in months." : "Enter a duration greater than zero." };
    if (isRetirement && (!Number.isFinite(Number(inflation)) || Number(inflation) <= 0)) return { ready: false, message: "Enter the number of years you expect to spend in retirement." };
    if (!Number.isFinite(R) || R < 0) return { ready: false, message: "Enter a valid rate (zero or greater)." };
    const months = Math.min(1200, Math.max(1, Math.round(Y * 12)));
    const monthlyRate = R / 1200;
    let schedule = [];

    if (isInsurance) {
      const cover = Number.isFinite(X) && X > 0 ? X : 0;
      return { ready: true, result: Math.max(0, P * Y - cover), label: "Indicative Additional Cover", invested: null, gain: null, schedule: [], note: "Simple estimate: annual income × replacement years − existing cover. Debts, assets, dependants' goals and policy details are excluded." };
    }
    if (isEmi) {
      const factor = Math.pow(1 + monthlyRate, months);
      const emi = monthlyRate === 0 ? P / months : (P * monthlyRate * factor) / (factor - 1);
      let balance = P;
      for (let i = 1; i <= months && balance > 0.005; i++) {
        const opening = balance; const interest = opening * monthlyRate; const principalPaid = Math.min(opening, Math.max(0, emi - interest)); balance = Math.max(0, opening - principalPaid);
        schedule.push({ period: `Month ${i}`, opening, cashFlow: -Math.min(emi, opening + interest), interest, closing: balance });
      }
      return { ready: true, result: emi, label: "Estimated Monthly EMI", invested: P, gain: Math.max(0, emi * months - P), schedule, note: "Fixed-rate amortization estimate. Fees, lender-specific rounding and changing interest rates are excluded." };
    }
    if (tool.type === "lumpsum") {
      let balance = P;
      const effectiveMonthlyRate = Math.pow(1 + R / 100, 1 / 12) - 1;
      for (let i = 1; i <= months; i++) { const opening = balance; const gain = opening * effectiveMonthlyRate; balance += gain; schedule.push({ period: `Month ${i}`, opening, cashFlow: 0, interest: gain, closing: balance }); }
      return { ready: true, result: balance, label: "Estimated Future Value", invested: P, gain: balance - P, schedule, note: "Uses an effective monthly rate equivalent to the entered annual return. Actual investment returns are not guaranteed." };
    }
    if (isSip || isDelay) {
      let balance = 0; let invested = 0;
      for (let i = 1; i <= months; i++) { const opening = balance; const gain = opening * monthlyRate; const contribution = P; balance = opening + gain + contribution; invested += contribution; schedule.push({ period: `Month ${i}`, opening, cashFlow: contribution, interest: gain, closing: balance }); }
      const fv = balance;
      if (isDelay) {
        const delayedMonths = Math.max(0, months - 12); let delayed = 0;
        for (let i = 0; i < delayedMonths; i++) delayed = delayed * (1 + monthlyRate) + P;
        return { ready: true, result: fv, label: "Value if You Start Now", invested, gain: fv - invested, extraLabel: `Estimated value if you delay by 1 year: ${formatINR(delayed)}`, schedule, note: "Month-end contributions and constant returns assumed. Real returns are not guaranteed." };
      }
      return { ready: true, result: fv, label: "Estimated Future Value", invested, gain: fv - invested, schedule, note: "Month-end SIP contributions assumed, with a constant monthly return derived from the annual rate." };
    }
    if (isSwp) {
      if (!Number.isFinite(X) || X <= 0) return { ready: false, message: "Enter a monthly withdrawal greater than zero." };
      let balance = P; let totalWithdrawn = 0; let totalGain = 0;
      for (let i = 1; i <= months; i++) {
        const opening = balance; const interest = opening * monthlyRate; const available = opening + interest; const withdrawal = Math.min(X, available); balance = Math.max(0, available - withdrawal); totalWithdrawn += withdrawal; totalGain += interest;
        schedule.push({ period: `Month ${i}`, opening, cashFlow: -withdrawal, interest, closing: balance });
      }
      return { ready: true, result: balance, label: "Estimated Remaining Corpus", invested: P, gain: totalGain, totalWithdrawn, totalValue: balance + totalWithdrawn, schedule, note: "Monthly return is credited before each withdrawal. Withdrawal stops when the corpus is exhausted; actual returns and tax may differ." };
    }
    if (isStp) {
      if (!Number.isFinite(X) || X <= 0) return { ready: false, message: "Enter a monthly transfer greater than zero." };
      let source = P; let target = 0;
      for (let i = 1; i <= months; i++) { const opening = source + target; const sourceGrowth = source * monthlyRate; const targetGrowth = target * monthlyRate; const transfer = Math.min(X, source + sourceGrowth); source = Math.max(0, source + sourceGrowth - transfer); target = target + targetGrowth + transfer; schedule.push({ period: `Month ${i}`, opening, cashFlow: 0, interest: sourceGrowth + targetGrowth, closing: source + target, detail: `Transfer ${formatINR(transfer)}` }); }
      return { ready: true, result: source + target, label: "Estimated Combined Value", invested: P, gain: source + target - P, schedule, note: "Illustrative model assumes source and target funds earn the same return. Actual STP depends on fund NAVs, taxes and exit loads." };
    }
    if (isGoal) {
      const inflationRate = R / 1200; let futureCost = P;
      for (let i = 0; i < months; i++) futureCost *= (1 + inflationRate);
      const investRate = 0.12 / 12; const sip = investRate === 0 ? futureCost / months : futureCost * investRate / (Math.pow(1 + investRate, months) - 1);
      let balance = 0;
      for (let i = 1; i <= months; i++) { const opening = balance; const interest = opening * investRate; balance = opening + interest + sip; schedule.push({ period: `Month ${i}`, opening, cashFlow: sip, interest, closing: balance }); }
      return { ready: true, result: futureCost, label: "Estimated Future Goal Cost", invested: null, gain: null, requiredSip: sip, schedule, note: "Future cost uses the entered inflation rate. Required SIP assumes a separate illustrative 12% annual investment return." };
    }
    if (isRetirement) {
      const inflationRate = R / 100; const retirementMonthlyExpense = P * Math.pow(1 + inflationRate, Y); const retirementYears = Number(inflation); const postMonthlyRate = 0.06 / 12; const retirementMonths = Math.round(retirementYears * 12);
      const corpus = postMonthlyRate === 0 ? retirementMonthlyExpense * retirementMonths : retirementMonthlyExpense * (1 - Math.pow(1 + postMonthlyRate, -retirementMonths)) / postMonthlyRate;
      const accumulationRate = 0.12 / 12; const sip = accumulationRate === 0 ? corpus / months : corpus * accumulationRate / (Math.pow(1 + accumulationRate, months) - 1); let balance = 0;
      for (let i = 1; i <= months; i++) { const opening = balance; const interest = opening * accumulationRate; balance = opening + interest + sip; schedule.push({ period: `Month ${i}`, opening, cashFlow: sip, interest, closing: balance }); }
      return { ready: true, result: corpus, label: "Illustrative Retirement Corpus", invested: null, gain: null, requiredSip: sip, extraLabel: `Monthly expense at retirement: ${formatINR(retirementMonthlyExpense)} · Retirement years assumed: ${retirementYears}`, schedule, note: "Assumes 6% annual return during retirement and 12% annual accumulation return. Adjust assumptions to your circumstances." };
    }
    return { ready: false, message: "This calculator is not configured yet." };
  }, [amount, rate, years, extraAmount, inflation, tool.type, isMarketTool, isTax, isEmi, isInsurance, isSip, isDelay, isSwp, isStp, isGoal, isRetirement]);

  const reset = () => { setAmount(""); setRate(""); setYears(""); setExtraAmount(""); setInflation(""); };
  const Icon = tool.icon;
  const maxClosing = calculation.schedule?.length ? Math.max(1, ...calculation.schedule.map((row) => row.closing)) : 1;
  const schedule = calculation.schedule || [];
  const chartSchedule = schedule.length <= 12
    ? schedule
    : Array.from({ length: 12 }, (_, index) => schedule[Math.round(index * (schedule.length - 1) / 11)]).filter(Boolean);

  return (
    <section id="active-calculator" className="mt-12 scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-950/5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 px-5 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-emerald-100 p-3 text-emerald-800"><Icon size={24} /></span>
          <div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Interactive calculator</p><h3 className="mt-1 text-2xl font-bold text-slate-900">{tool.name}</h3><p className="mt-1 text-sm text-slate-500">{tool.desc}</p></div>
        </div>
        <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Close ✕</button>
      </div>

      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between"><h4 className="text-lg font-bold text-slate-900">Calculator inputs</h4><button type="button" onClick={reset} className="text-sm font-semibold text-emerald-700 hover:underline">Reset</button></div>
          {isMarketTool ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><p className="font-semibold">Live market data required</p><p className="mt-1">NAV and actual scheme/fund performance need a verified market-data API. No sample values are presented as real data.</p></div> : <div className="space-y-4">
            <div><label className="mb-2 block text-sm font-semibold text-slate-700">{amountLabel}</label><input type="number" min="0" step="any" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></div>
            {!isTax && <div><label className="mb-2 block text-sm font-semibold text-slate-700">{rateLabel}</label>{isInsurance ? <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">Enter existing cover in the optional field below.</p> : <input type="number" min="0" step="any" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Enter rate (%)" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />}</div>}
            {!isTax && <div><label className="mb-2 block text-sm font-semibold text-slate-700">{yearsLabel}</label><input type="number" min={isSwp ? "1" : "0.1"} step="any" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Enter years (e.g. 5)" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></div>}
            {extraLabel && <div><label className="mb-2 block text-sm font-semibold text-slate-700">{extraLabel}</label><input type="number" min="0" step="any" inputMode="decimal" value={extraAmount} onChange={(e) => setExtraAmount(e.target.value)} placeholder={isInsurance ? "Enter existing cover (optional)" : "Enter monthly amount"} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></div>}
            {isRetirement && <div><label className="mb-2 block text-sm font-semibold text-slate-700">Years spent in retirement</label><input type="number" min="1" max="50" value={inflation} onChange={(e) => setInflation(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></div>}
          </div>}
          <p className="mt-5 text-xs leading-5 text-slate-500">All outputs are indicative estimates based on standard finance formulas. Values remain blank until you enter the required inputs.</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#063d34] to-emerald-700 p-5 text-white sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">Your calculation</p>
          {calculation.ready ? <><p className="mt-3 text-sm text-emerald-100">{calculation.label}</p><p className="mt-1 break-words text-3xl font-bold sm:text-4xl">{formatINR(calculation.result)}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">{calculation.invested != null && <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-emerald-100">{isEmi ? "Loan Principal" : "Principal / Invested"}</p><p className="mt-1 font-bold">{formatINR(calculation.invested)}</p></div>}{calculation.gain != null && <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-emerald-100">{isEmi ? "Total Interest" : "Gain / Interest"}</p><p className="mt-1 font-bold">{formatINR(calculation.gain)}</p></div>}{calculation.totalWithdrawn != null && <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-emerald-100">Total Withdrawn</p><p className="mt-1 font-bold">{formatINR(calculation.totalWithdrawn)}</p></div>}{calculation.totalValue != null && <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-emerald-100">Total Value</p><p className="mt-1 font-bold">{formatINR(calculation.totalValue)}</p></div>}</div>
            {calculation.requiredSip != null && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">Indicative monthly SIP needed: <strong>{formatINR(calculation.requiredSip)}</strong></p>}{calculation.extraLabel && <p className="mt-3 text-sm text-emerald-100">{calculation.extraLabel}</p>}
            {calculation.totalWithdrawn != null && <div className="mt-5 rounded-xl bg-white/10 p-4"><p className="text-sm font-semibold">Corpus breakup</p><div className="mt-3 flex items-center gap-4"><div className="relative h-24 w-24 shrink-0 rounded-full" style={{ background: `conic-gradient(#a7f3d0 0deg ${(calculation.totalWithdrawn / Math.max(1, calculation.totalValue)) * 360}deg, #ffffff ${(calculation.totalWithdrawn / Math.max(1, calculation.totalValue)) * 360}deg 360deg)` }}><div className="absolute inset-4 rounded-full bg-emerald-800" /></div><div className="space-y-2 text-xs"><p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-200" />Total withdrawn: <strong>{formatINR(calculation.totalWithdrawn)}</strong></p><p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-white" />Remaining corpus: <strong>{formatINR(calculation.result)}</strong></p></div></div></div>}
            {calculation.note && <p className="mt-5 border-t border-white/20 pt-4 text-xs leading-5 text-emerald-50">{calculation.note}</p>}
          </> : <div className="mt-5 rounded-xl bg-white/10 p-4"><p className="font-semibold">{calculation.market ? "Market data connection needed" : "Result will appear here"}</p><p className="mt-2 text-sm leading-6 text-emerald-100">{calculation.message}</p></div>}
        </div>
      </div>

      {calculation.ready && schedule.length > 0 && <div className="border-t border-slate-100 p-5 sm:p-8">
        <div className="mb-5"><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Monthly breakdown</p><h4 className="mt-1 text-xl font-bold text-slate-900">Month-by-month calculation</h4><p className="mt-1 text-sm text-slate-500">Each row shows how the balance changes over time.</p></div>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4"><h5 className="font-bold text-slate-800">Balance growth graph</h5><div className="mt-5 flex h-44 items-end gap-1 overflow-hidden border-b border-slate-200 px-1">{chartSchedule.map((row, i) => <div key={`${row.period}-${i}`} title={`${row.period}: ${formatINR(row.closing)}`} className="min-w-1 flex-1 rounded-t-sm bg-emerald-500/80 hover:bg-emerald-700" style={{ height: `${Math.max(3, (row.closing / maxClosing) * 100)}%` }} />)}</div><div className="mt-2 flex justify-between text-xs text-slate-500"><span>{schedule[0]?.period}</span><span>{schedule[schedule.length - 1]?.period}</span></div><p className="mt-2 text-xs text-slate-500">Showing up to 12 representative points across the selected period. Scroll the table below to view every month.</p></div>
          <div className="rounded-2xl border border-slate-200 p-4"><h5 className="font-bold text-slate-800">Breakdown summary</h5><div className="mt-4 space-y-4">{[{ label: "Opening / Principal", value: calculation.invested ?? schedule[0]?.opening ?? 0, width: 100 }, { label: "Final balance", value: calculation.result, width: Math.max(4, Math.min(100, (calculation.result / Math.max(1, calculation.invested ?? calculation.result)) * 100)) }].map((item) => <div key={item.label}><div className="mb-1 flex justify-between gap-3 text-sm"><span className="text-slate-600">{item.label}</span><strong className="text-slate-900">{formatINR(item.value)}</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${item.width}%` }} /></div></div>)}</div><p className="mt-4 text-xs leading-5 text-slate-500">Chart is a visual summary of this calculator's monthly schedule, not a market forecast.</p></div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200"><div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 px-4 py-3"><h5 className="font-bold text-slate-800">Detailed monthly table</h5><span className="text-xs text-slate-500">{schedule.length} month(s)</span></div><div className="max-h-[520px] overflow-auto"><table className="min-w-[720px] w-full text-left text-sm"><thead className="sticky top-0 bg-white text-xs uppercase tracking-wide text-slate-500 shadow-sm"><tr><th className="px-4 py-3">Period</th><th className="px-4 py-3 text-right">Opening</th><th className="px-4 py-3 text-right">Cash Flow</th><th className="px-4 py-3 text-right">Interest/Gain</th><th className="px-4 py-3 text-right">Closing</th></tr></thead><tbody>{schedule.map((row, index) => <tr key={`${row.period}-${index}`} className="border-t border-slate-100 even:bg-slate-50/60"><td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700">{row.period}</td><td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{formatINR(row.opening)}</td><td className={`whitespace-nowrap px-4 py-3 text-right tabular-nums ${row.cashFlow < 0 ? "text-rose-600" : row.cashFlow > 0 ? "text-emerald-700" : "text-slate-500"}`}>{row.cashFlow < 0 ? "−" : row.cashFlow > 0 ? "+" : ""}{formatINR(Math.abs(row.cashFlow))}</td><td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{formatINR(row.interest)}</td><td className="whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums text-slate-900">{formatINR(row.closing)}</td></tr>)}</tbody></table></div></div>
      </div>}
      {calculation.ready && schedule.length === 0 && !isMarketTool && <div className="border-t border-slate-100 px-5 py-6 text-sm text-slate-500 sm:px-8">This calculator produces a summary estimate; a monthly schedule is not applicable to this calculation.</div>}
      <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs leading-5 text-slate-500 sm:px-8">Educational estimate only—not financial, tax or investment advice. Investment returns are not guaranteed. Tax treatment, fees and actual market outcomes may differ.</div>
    </section>
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

  const openCalculator = (tool) => {
    setSelectedTool(tool);
    window.setTimeout(() => {
      document.getElementById("active-calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

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
                  { icon: TrendingUp, label: "SIP Calculator", type: "sip" },
                  { icon: Home, label: "EMI Calculator", type: "emi" },
                ].map((item) => {
                  const Icon = item.icon;
                  const tool = allTools.find((t) => t.type === item.type);
                  return (
                    <button
                      key={item.label}
                      onClick={() => openCalculator(tool)}
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
            { icon: TrendingUp, title: "SIP Calculator", text: "Estimate SIP growth", type: "sip" },
            { icon: Landmark, title: "Retirement", text: "Plan your corpus", type: "retirement" },
            { icon: IndianRupee, title: "Tax Planning", text: "Explore tax planning", type: "tax" },
            { icon: Home, title: "EMI Calculator", text: "Calculate loan EMIs", type: "emi" },
          ].map((item) => {
            const Icon = item.icon;
            const tool = allTools.find((t) => t.type === item.type);
            return (
              <button
                key={item.title}
                onClick={() => openCalculator(tool)}
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
                <CalculatorCard key={`${tool.group}-${tool.name}`} tool={tool} onSelect={openCalculator} />
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
                  <CalculatorCard key={tool.name} tool={tool} onSelect={openCalculator} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {selectedTool && (
        <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
          <CalculatorPanel tool={selectedTool} onClose={() => setSelectedTool(null)} />
        </div>
      )}

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
