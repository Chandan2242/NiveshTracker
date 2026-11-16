
import { useState } from "react";
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
      { name: "NAV Finder Calculator", desc: "Find historical NAV for a scheme and date.", icon: Calculator, type: "nav" },
    ],
  },
];

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function parseMFDate(value) {
  const [day, month, year] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addMonthsSafe(date, months) {
  const day = date.getDate();
  const result = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

function findNav(rows, date) {
  const target = new Date(`${date}T00:00:00`);
  let found = null;

  for (const row of rows) {
    if (row.date <= target) found = row;
    else break;
  }

  return found;
}

function validateDateRange(start, end) {
  if (!start || !end) {
    throw new Error("Please select both start date and end date.");
  }

  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime()) ||
    startDate >= endDate
  ) {
    throw new Error("End date must be after start date.");
  }

  if (endDate > new Date()) {
    throw new Error("Future valuation dates are not allowed.");
  }

  return { startDate, endDate };
}

function CalculatorModal({ tool, onClose }) {
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const type = tool.type;

  const set = (key, value) => {
    setValues((old) => ({ ...old, [key]: value }));
    setResult(null);
    setError("");
  };

  const v = (key) => values[key] ?? "";
  const n = (key) => v(key) === "" ? NaN : Number(v(key));
  const positive = (key) => Number.isFinite(n(key)) && n(key) > 0;
  const rateOK = (key) => Number.isFinite(n(key)) && n(key) >= 0 && n(key) <= 100;
  const inr = (value) => formatINR(value);
  const monthsFromYears = (years) => Math.round(years * 12);

  // Investment calculations use effective annual return converted to monthly rate.
  const monthlyRate = (annual) => Math.pow(1 + annual / 100, 1 / 12) - 1;

  // Loan interest is treated as nominal annual interest divided by 12.
  const monthlyLoanRate = (annual) => annual / 1200;

  // Regular SIP instalment is assumed to be invested at the end of each month.
  const sipFV = (payment, annual, months) => {
    const rate = monthlyRate(annual);

    if (!months) return 0;
    if (rate === 0) return payment * months;

    return payment * ((Math.pow(1 + rate, months) - 1) / rate);
  };

  const sipRequired = (target, annual, months) => {
    const rate = monthlyRate(annual);

    if (!months) return NaN;
    if (rate === 0) return target / months;

    return target * rate / (Math.pow(1 + rate, months) - 1);
  };

  const fieldsByType = {
    sip: [
      ["monthly", "Monthly SIP amount (₹)"],
      ["rate", "Expected annual return (%)"],
      ["years", "Investment period (years)"],
    ],
    lumpsum: [
      ["principal", "One-time investment (₹)"],
      ["rate", "Expected annual return (%)"],
      ["years", "Investment period (years)"],
    ],
    stepup: [
      ["monthly", "Starting monthly SIP (₹)"],
      ["step", "Annual SIP step-up (%)"],
      ["rate", "Expected annual return (%)"],
      ["years", "Investment period (years)"],
    ],
    retirement: [
      ["age", "Current age (years)"],
      ["retireAge", "Retirement age (years)"],
      ["expense", "Current monthly household expenses (₹)"],
      ["retireYears", "Years in retirement"],
      ["inflation", "Annual expense inflation (%)"],
      ["preRate", "Pre-retirement annual return (%)"],
      ["postRate", "Post-retirement annual return (%)"],
    ],
    delay: [
      ["monthly", "Monthly SIP amount (₹)"],
      ["rate", "Expected annual return (%)"],
      ["years", "Total goal period (years)"],
      ["delay", "Delay before starting (years)"],
    ],
    insurance: [
      ["income", "Annual income to replace (₹)"],
      ["replaceYears", "Income replacement period (years)"],
      ["loans", "Outstanding loans/liabilities (₹)"],
      ["goals", "Future family goals (₹)"],
      ["assets", "Liquid assets available (₹)"],
      ["cover", "Existing life cover (₹)"],
    ],
    emi: [
      ["principal", "Loan amount (₹)"],
      ["rate", "Annual interest rate (%)"],
      ["years", "Loan tenure (years)"],
    ],
    tax: [
      ["income", "Annual salary before standard deduction (₹)"],
      ["deduction", "Standard deduction (₹) — enter applicable amount"],
    ],
    goal: [
      ["goalCost", "Goal cost today (₹)"],
      ["years", "Years until goal"],
      ["inflation", "Expected annual inflation (%)"],
      ["rate", "Expected annual investment return (%)"],
    ],
    mfSip: [
      ["scheme", "MF scheme code"],
      ["monthly", "Monthly SIP amount (₹)"],
      ["start", "SIP start date"],
      ["end", "Valuation date"],
    ],
    mfStp: [
      ["source", "Source scheme code"],
      ["target", "Target scheme code"],
      ["corpus", "Initial source investment (₹)"],
      ["transfer", "Monthly transfer (₹)"],
      ["start", "STP start date"],
      ["end", "Valuation date"],
    ],
    mfSwp: [
      ["scheme", "MF scheme code"],
      ["corpus", "Initial investment (₹)"],
      ["withdrawal", "Monthly withdrawal (₹)"],
      ["start", "SWP start date"],
      ["end", "Valuation date"],
    ],
    scheme: [
      ["scheme", "MF scheme code"],
      ["start", "Start date"],
      ["end", "End date"],
    ],
    fund: [
      ["scheme1", "First fund scheme code"],
      ["scheme2", "Second fund scheme code"],
      ["start", "Start date"],
      ["end", "End date"],
    ],
    nav: [
      ["scheme", "MF scheme code"],
      ["date", "NAV date"],
    ],
  };

  const goalName = tool.name.replace(" Calculator", "");
  const fields = fieldsByType[type] || fieldsByType.goal;

  const calculateFinancial = () => {
    setError("");
    let output;

    if (type === "sip") {
      if (!positive("monthly") || !positive("years") || !rateOK("rate")) {
        return setError("Enter a positive SIP amount and duration, and a return rate between 0 and 100%.");
      }

      const months = monthsFromYears(n("years"));
      const invested = n("monthly") * months;
      const value = sipFV(n("monthly"), n("rate"), months);

      output = {
        title: "SIP maturity value",
        value,
        invested,
        gain: value - invested,
        details: `${months} monthly instalments. Assumed annual return: ${n("rate")}%. Payments are made at month-end.`,
      };
    }

    else if (type === "lumpsum") {
      if (!positive("principal") || !positive("years") || !rateOK("rate")) {
        return setError("Enter a positive investment amount and duration, and a return rate between 0 and 100%.");
      }

      const value = n("principal") * Math.pow(1 + n("rate") / 100, n("years"));

      output = {
        title: "Lumpsum maturity value",
        value,
        invested: n("principal"),
        gain: value - n("principal"),
        details: "Single initial investment with annual compounding.",
      };
    }

    else if (type === "stepup") {
      if (!positive("monthly") || !positive("years") || !rateOK("step") || !rateOK("rate")) {
        return setError("Enter a positive SIP and duration. Step-up and return rates must be between 0 and 100%.");
      }

      const months = monthsFromYears(n("years"));
      const rate = monthlyRate(n("rate"));
      let value = 0;
      let invested = 0;

      for (let month = 0; month < months; month++) {
        const payment = n("monthly") * Math.pow(1 + n("step") / 100, Math.floor(month / 12));
        value = value * (1 + rate) + payment;
        invested += payment;
      }

      output = {
        title: "Step-up SIP maturity value",
        value,
        invested,
        gain: value - invested,
        details: `Starting SIP ${inr(n("monthly"))}; annual step-up ${n("step")}%. Instalment increases after every 12 months.`,
      };
    }

    else if (type === "retirement") {
      if (
        !positive("age") ||
        !positive("retireAge") ||
        !positive("expense") ||
        !positive("retireYears") ||
        n("retireAge") <= n("age") ||
        !rateOK("inflation") ||
        !rateOK("preRate") ||
        !rateOK("postRate")
      ) {
        return setError("Check your ages, expenses, retirement duration and rates.");
      }

      const yearsToRetire = n("retireAge") - n("age");
      const inflation = n("inflation") / 100;
      const postRate = n("postRate") / 100;

      const firstAnnualExpense =
        n("expense") * 12 * Math.pow(1 + inflation, yearsToRetire);

      let corpus = 0;

      // Annual withdrawals are modeled at the beginning of each retirement year.
      for (let year = 0; year < n("retireYears"); year++) {
        corpus +=
          firstAnnualExpense *
          Math.pow(1 + inflation, year) /
          Math.pow(1 + postRate, year);
      }

      const months = monthsFromYears(yearsToRetire);
      const monthlySIP = sipRequired(corpus, n("preRate"), months);

      output = {
        title: "Required retirement corpus",
        value: corpus,
        invested: monthlySIP * months,
        extra: `Required monthly SIP until retirement: ${inr(monthlySIP)}. First-year retirement expense: ${inr(firstAnnualExpense)} per year.`,
        details: "Simplified retirement model. Annual expenses are inflated and discounted using the assumed post-retirement return.",
      };
    }

    else if (type === "delay") {
      if (
        !positive("monthly") ||
        !positive("years") ||
        !positive("delay") ||
        !rateOK("rate") ||
        n("delay") >= n("years")
      ) {
        return setError("Delay must be positive and shorter than the total goal period.");
      }

      const totalMonths = monthsFromYears(n("years"));
      const delayedMonths = monthsFromYears(n("years") - n("delay"));

      const startNow = sipFV(n("monthly"), n("rate"), totalMonths);
      const startLater = sipFV(n("monthly"), n("rate"), delayedMonths);

      output = {
        title: "Value if SIP starts today",
        value: startNow,
        invested: n("monthly") * totalMonths,
        gain: startNow - n("monthly") * totalMonths,
        extra: `Value after delaying ${n("delay")} years: ${inr(startLater)}. Estimated opportunity gap: ${inr(startNow - startLater)}.`,
        details: "Both plans are valued on the same final date. The delayed plan makes fewer monthly contributions.",
      };
    }

    else if (type === "insurance") {
      const otherKeys = ["loans", "goals", "assets", "cover"];

      if (
        !positive("income") ||
        !positive("replaceYears") ||
        otherKeys.some((key) => !Number.isFinite(n(key)) || n(key) < 0)
      ) {
        return setError("Enter annual income and replacement years. Enter 0 for any liabilities, goals, assets or existing cover that do not apply.");
      }

      const need = Math.max(
        0,
        n("income") * n("replaceYears") +
        n("loans") +
        n("goals") -
        n("assets") -
        n("cover")
      );

      output = {
        title: "Estimated additional life cover needed",
        value: need,
        details: "Income replacement + liabilities + future goals − liquid assets − existing life cover. This is a basic needs estimate, not an insurance recommendation.",
      };
    }

    else if (type === "emi") {
      if (!positive("principal") || !positive("years") || !rateOK("rate")) {
        return setError("Enter a positive loan amount and tenure, and an interest rate between 0 and 100%.");
      }

      const months = monthsFromYears(n("years"));
      const rate = monthlyLoanRate(n("rate"));

      const emi = rate === 0
        ? n("principal") / months
        : n("principal") * rate * Math.pow(1 + rate, months) /
          (Math.pow(1 + rate, months) - 1);

      const total = emi * months;

      output = {
        title: "Monthly loan EMI",
        value: emi,
        invested: n("principal"),
        gain: total - n("principal"),
        extra: `Total repayment: ${inr(total)} over ${months} months.`,
        details: "Reducing-balance EMI formula. Assumes a fixed interest rate throughout the loan tenure.",
      };
    }

    else if (type === "tax") {
      if (
        !Number.isFinite(n("income")) ||
        n("income") < 0 ||
        !Number.isFinite(n("deduction")) ||
        n("deduction") < 0
      ) {
        return setError("Enter valid annual income and deduction amounts. Enter 0 if no deduction applies.");
      }

      // This is a simplified slab estimator. Verify applicable FY rules before relying on it.
      const taxable = Math.max(0, n("income") - n("deduction"));

      const slabs = [
        [400000, 0],
        [800000, 0.05],
        [1200000, 0.10],
        [1600000, 0.15],
        [2000000, 0.20],
        [2400000, 0.25],
        [Infinity, 0.30],
      ];

      let previousLimit = 0;
      let tax = 0;

      for (const [limit, percentage] of slabs) {
        const taxableInSlab = Math.max(
          0,
          Math.min(taxable, limit) - previousLimit
        );

        tax += taxableInSlab * percentage;
        previousLimit = limit;

        if (taxable <= limit) break;
      }

      // Section 87A rebate and marginal relief depend on eligibility and current law.
      // This basic calculator deliberately does not claim to calculate those reliably.
      const cess = tax * 0.04;
      const totalTax = tax + cess;

      output = {
        title: "Estimated income tax before rebate",
        value: totalTax,
        extra: `Taxable income: ${inr(taxable)}. Includes 4% cess on estimated slab tax, before any eligible rebate or relief.`,
        details: "Simplified slab estimate only. It does not calculate Section 87A rebate, marginal relief, surcharge, special-rate income, deductions other than the entered amount, or all individual tax situations. Verify with the official Income Tax portal.",
      };
    }

    else if (type === "goal") {
      if (
        !positive("goalCost") ||
        !positive("years") ||
        !rateOK("inflation") ||
        !rateOK("rate")
      ) {
        return setError("Enter a positive goal cost and duration. Inflation and return rates must be between 0 and 100%.");
      }

      const futureCost =
        n("goalCost") * Math.pow(1 + n("inflation") / 100, n("years"));

      const months = monthsFromYears(n("years"));
      const monthlySIP = sipRequired(futureCost, n("rate"), months);

      output = {
        title: `${goalName} — future goal cost`,
        value: futureCost,
        extra: `Estimated monthly SIP required: ${inr(monthlySIP)}.`,
        details: `Future cost assumes ${n("inflation")}% annual inflation. SIP estimate assumes ${n("rate")}% annual return and month-end instalments.`,
      };
    }

    if (!output || !Number.isFinite(output.value)) {
      return setError("Unable to calculate. Please check the entered values.");
    }

    setResult(output);
  };

  const fetchScheme = async (code) => {
    const response = await fetch(
      `https://api.mfapi.in/mf/${encodeURIComponent(code.trim())}`
    );

    if (!response.ok) {
      throw new Error(`NAV API request failed (${response.status}). Check the scheme code.`);
    }

    const json = await response.json();

    if (!Array.isArray(json.data) || json.data.length === 0) {
      throw new Error("No NAV history found for this scheme.");
    }

    const data = json.data
      .map((item) => ({
        date: parseMFDate(item.date),
        nav: Number(item.nav),
      }))
      .filter((item) => item.date && Number.isFinite(item.nav) && item.nav > 0)
      .sort((a, b) => a.date - b.date);

    if (!data.length) {
      throw new Error("Valid NAV records were not returned for this scheme.");
    }

    return { meta: json.meta, data };
  };

  const calculateMF = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      let output;

      if (type === "nav") {
        if (!v("scheme") || !v("date")) {
          throw new Error("Enter scheme code and NAV date.");
        }

        const selectedDate = new Date(`${v("date")}T00:00:00`);

        if (selectedDate > new Date()) {
          throw new Error("Future NAV dates are not allowed.");
        }

        const fund = await fetchScheme(v("scheme"));
        const nav = findNav(fund.data, v("date"));

        if (!nav) {
          throw new Error("NAV is not available on or before the selected date.");
        }

        output = {
          title: "NAV on selected date",
          value: nav.nav,
          extra: `${fund.meta?.scheme_name || "Mutual Fund"} · ${nav.date.toLocaleDateString("en-IN")}`,
          details: "This is the most recent published NAV on or before the selected date.",
        };
      }

      else if (type === "scheme") {
        if (!v("scheme")) throw new Error("Enter a mutual fund scheme code.");

        validateDateRange(v("start"), v("end"));

        const fund = await fetchScheme(v("scheme"));
        const startNAV = findNav(fund.data, v("start"));
        const endNAV = findNav(fund.data, v("end"));

        if (!startNAV || !endNAV || startNAV.nav <= 0) {
          throw new Error("NAV data is unavailable for the selected dates.");
        }

        const absoluteReturn = (endNAV.nav / startNAV.nav - 1) * 100;
        const days = (endNAV.date - startNAV.date) / 86400000;

        const cagr = days > 0
          ? (Math.pow(endNAV.nav / startNAV.nav, 365.25 / days) - 1) * 100
          : 0;

        output = {
          title: "Scheme performance",
          value: absoluteReturn,
          suffix: "% absolute return",
          extra: `${fund.meta?.scheme_name || "Scheme"} | Start NAV: ${startNAV.nav.toFixed(4)} | End NAV: ${endNAV.nav.toFixed(4)} | CAGR: ${cagr.toFixed(2)}%`,
          details: "NAV-to-NAV return for the selected period. This is not a total-return index and excludes investor taxes and exit loads.",
        };
      }

      else if (type === "fund") {
        if (!v("scheme1") || !v("scheme2")) {
          throw new Error("Enter both mutual fund scheme codes.");
        }

        validateDateRange(v("start"), v("end"));

        const [fund1, fund2] = await Promise.all([
          fetchScheme(v("scheme1")),
          fetchScheme(v("scheme2")),
        ]);

        const start1 = findNav(fund1.data, v("start"));
        const end1 = findNav(fund1.data, v("end"));
        const start2 = findNav(fund2.data, v("start"));
        const end2 = findNav(fund2.data, v("end"));

        if (![start1, end1, start2, end2].every(Boolean)) {
          throw new Error("NAV data is unavailable for one or both funds in this period.");
        }

        const return1 = (end1.nav / start1.nav - 1) * 100;
        const return2 = (end2.nav / start2.nav - 1) * 100;

        output = {
          title: "Fund comparison — absolute NAV return",
          value: return1,
          suffix: "% — Fund 1",
          extra: `${fund1.meta?.scheme_name || v("scheme1")}: ${return1.toFixed(2)}% | ${fund2.meta?.scheme_name || v("scheme2")}: ${return2.toFixed(2)}%`,
          details: "Compares NAV-to-NAV percentage returns over identical dates. Compare similar categories, plans and options. Past returns do not predict future performance.",
        };
      }

      else if (type === "mfSip") {
        if (!v("scheme") || !positive("monthly")) {
          throw new Error("Enter scheme code and a positive monthly SIP amount.");
        }

        validateDateRange(v("start"), v("end"));

        const fund = await fetchScheme(v("scheme"));
        const startDate = new Date(`${v("start")}T00:00:00`);
        const endDate = new Date(`${v("end")}T00:00:00`);

        let units = 0;
        let invested = 0;
        let count = 0;

        for (
          let date = new Date(startDate);
          date <= endDate;
          date = addMonthsSafe(date, 1)
        ) {
          const nav = findNav(fund.data, dateKey(date));

          if (!nav) continue;

          units += n("monthly") / nav.nav;
          invested += n("monthly");
          count++;
        }

        const lastNAV = findNav(fund.data, v("end"));

        if (!count || !lastNAV) {
          throw new Error("No valid monthly NAV records found for this period.");
        }

        const value = units * lastNAV.nav;

        output = {
          title: "Historical MF SIP value",
          value,
          invested,
          gain: value - invested,
          extra: `${fund.meta?.scheme_name || "Scheme"} | Instalments: ${count} | Units: ${units.toFixed(4)} | Latest NAV: ${lastNAV.nav.toFixed(4)}`,
          details: "Historical simulation using the most recent available NAV on or before each scheduled monthly date. Actual SIP allotment depends on business days, cut-off times and applicable rules. Taxes and exit loads are excluded.",
        };
      }

      else if (type === "mfStp") {
        if (
          !v("source") ||
          !v("target") ||
          !positive("corpus") ||
          !positive("transfer")
        ) {
          throw new Error("Enter source and target scheme codes, initial corpus and monthly transfer.");
        }

        validateDateRange(v("start"), v("end"));

        const [sourceFund, targetFund] = await Promise.all([
          fetchScheme(v("source")),
          fetchScheme(v("target")),
        ]);

        const startNAV = findNav(sourceFund.data, v("start"));

        if (!startNAV) throw new Error("Source fund NAV is unavailable on the start date.");

        let sourceUnits = n("corpus") / startNAV.nav;
        let targetUnits = 0;
        let transferred = 0;
        let count = 0;

        const startDate = new Date(`${v("start")}T00:00:00`);
        const endDate = new Date(`${v("end")}T00:00:00`);

        for (
          let date = addMonthsSafe(startDate, 1);
          date <= endDate;
          date = addMonthsSafe(date, 1)
        ) {
          const sourceNAV = findNav(sourceFund.data, dateKey(date));
          const targetNAV = findNav(targetFund.data, dateKey(date));

          if (!sourceNAV || !targetNAV) continue;

          const amount = Math.min(n("transfer"), sourceUnits * sourceNAV.nav);

          if (amount <= 0) break;

          sourceUnits -= amount / sourceNAV.nav;
          targetUnits += amount / targetNAV.nav;
          transferred += amount;
          count++;

          if (sourceUnits <= 0) break;
        }

        const lastSourceNAV = findNav(sourceFund.data, v("end"));
        const lastTargetNAV = findNav(targetFund.data, v("end"));

        if (!lastSourceNAV || !lastTargetNAV) {
          throw new Error("NAV data unavailable for the valuation date.");
        }

        const sourceValue = sourceUnits * lastSourceNAV.nav;
        const targetValue = targetUnits * lastTargetNAV.nav;

        output = {
          title: "Historical STP portfolio value",
          value: sourceValue + targetValue,
          extra: `Source value: ${inr(sourceValue)} | Target value: ${inr(targetValue)} | Transferred: ${inr(transferred)} | Transfer cycles: ${count}`,
          details: "Historical simulation of fixed monthly transfers from source fund to target fund using historical NAVs. Actual STP dates, tax and exit loads are excluded.",
        };
      }

      else if (type === "mfSwp") {
        if (
          !v("scheme") ||
          !positive("corpus") ||
          !positive("withdrawal")
        ) {
          throw new Error("Enter scheme code, initial investment and monthly withdrawal.");
        }

        validateDateRange(v("start"), v("end"));

        const fund = await fetchScheme(v("scheme"));
        const startNAV = findNav(fund.data, v("start"));

        if (!startNAV) throw new Error("NAV unavailable for the selected start date.");

        let units = n("corpus") / startNAV.nav;
        let totalWithdrawn = 0;
        let count = 0;

        const startDate = new Date(`${v("start")}T00:00:00`);
        const endDate = new Date(`${v("end")}T00:00:00`);

        for (
          let date = addMonthsSafe(startDate, 1);
          date <= endDate;
          date = addMonthsSafe(date, 1)
        ) {
          const nav = findNav(fund.data, dateKey(date));

          if (!nav) continue;

          const amount = Math.min(n("withdrawal"), units * nav.nav);

          if (amount <= 0) break;

          units -= amount / nav.nav;
          totalWithdrawn += amount;
          count++;

          if (units <= 0) {
            units = 0;
            break;
          }
        }

        const lastNAV = findNav(fund.data, v("end"));

        if (!lastNAV) {
          throw new Error("NAV data unavailable for the valuation date.");
        }

        const remainingValue = units * lastNAV.nav;

        output = {
          title: "Historical SWP remaining value",
          value: remainingValue,
          extra: `Total withdrawn: ${inr(totalWithdrawn)} | Withdrawal cycles: ${count} | Remaining units: ${units.toFixed(4)}`,
          details: "Historical simulation using available NAVs for monthly withdrawals. Taxes, exit loads and actual processing dates are excluded.",
        };
      }

      if (!output || !Number.isFinite(output.value)) {
        throw new Error("Unable to calculate using the selected NAV data.");
      }

      setResult(output);
    } catch (err) {
      setError(err.message || "Unable to calculate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const marketTypes = ["mfSip", "mfStp", "mfSwp", "scheme", "fund", "nav"];
  const showMarket = marketTypes.includes(type);

  const submit = () => {
    if (showMarket) calculateMF();
    else calculateFinancial();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tool.name}
        className="my-6 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <Calculator size={24} />
            </span>
            <h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2>
            <p className="mt-2 text-sm text-slate-500">{tool.desc}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close calculator"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([key, label]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
              </label>

              <input
                type={
                  ["start", "end", "date"].includes(key)
                    ? "date"
                    : "number"
                }
                inputMode="decimal"
                min="0"
                step="any"
                value={v(key)}
                onChange={(event) => set(key, event.target.value)}
                placeholder={
                  ["scheme", "source", "target", "scheme1", "scheme2"].includes(key)
                    ? "Enter scheme code"
                    : "Enter value"
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
        >
          {loading
            ? "Fetching NAV data..."
            : showMarket
              ? "Fetch NAV & Calculate"
              : "Calculate"}
        </button>

        {error && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-700 p-5 text-white">
            <p className="text-sm text-emerald-100">{result.title}</p>

            <p className="mt-2 break-words text-3xl font-bold">
              {result.suffix
                ? `${result.value.toFixed(2)} ${result.suffix}`
                : inr(result.value)}
            </p>

            {result.invested !== undefined && (
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
                <div>
                  <p className="text-xs text-emerald-100">Invested / Principal</p>
                  <p className="mt-1 font-semibold">{inr(result.invested)}</p>
                </div>

                <div>
                  <p className="text-xs text-emerald-100">Gain / Loss</p>
                  <p className="mt-1 font-semibold">{inr(result.gain)}</p>
                </div>
              </div>
            )}

            {result.extra && (
              <p className="mt-3 text-sm text-emerald-100">{result.extra}</p>
            )}

            <p className="mt-4 border-t border-white/20 pt-3 text-xs leading-5 text-emerald-50">
              {result.details}
            </p>
          </div>
        )}

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Planning estimates only. Investment returns are not guaranteed.
          Mutual fund historical simulations use available NAV data and may
          differ from actual transactions, taxes and exit loads.
        </p>
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
                <p className="text-2xl font-bold sm:text-3xl">19</p>
                <p className="mt-1 text-xs text-emerald-100 sm:text-sm">Financial Tools</p>
              </div>

              <div>
                <p className="text-2xl font-bold sm:text-3xl">Live</p>
                <p className="mt-1 text-xs text-emerald-100 sm:text-sm">NAV Data Lookup</p>
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
                <p className="text-sm text-slate-500">Financial planning tools</p>
                <p className="mt-2 text-2xl font-bold">Calculate with your own numbers</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter your investment amount, time period and assumptions to get a formula-based estimate.
                  Mutual fund simulations use historical NAV data where available.
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-emerald-700">
                  <ShieldCheck size={16} />
                  No random or pre-filled investment results
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, label: "SIP Performance", type: "mfSip" },
                  { icon: Home, label: "EMI Calculator", type: "emi" },
                ].map((item) => {
                  const Icon = item.icon;
                  const selected = allTools.find((tool) => tool.type === item.type);

                  return (
                    <button
                      key={item.label}
                      onClick={() => setSelectedTool(selected)}
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
            const selected = allTools.find((tool) => tool.type === item.type);

            return (
              <button
                key={item.title}
                onClick={() => setSelectedTool(selected)}
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
      <section
        id="calculators"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Plan • Calculate • Grow
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Build Your Wealth Smarter
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Explore financial calculators and create a roadmap for your future investments.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-xl">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
            <Menu size={19} className="text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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
                <CalculatorCard
                  key={`${tool.group}-${tool.name}`}
                  tool={tool}
                  onSelect={setSelectedTool}
                />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <p className="py-12 text-center text-slate-500">
                No calculator found. Try another name.
              </p>
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
                  <CalculatorCard
                    key={tool.name}
                    tool={tool}
                    onSelect={setSelectedTool}
                  />
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
              Take the first step towards your financial goals. Explore your options
              and build a plan that suits your needs.
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
        Calculations are for educational and illustrative purposes only.
        Investment returns are not guaranteed. Please consult a qualified
        financial advisor before making financial decisions.
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

        <ArrowRight
          size={18}
          className="mt-1 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700"
        />
      </div>

      <h4 className="mt-5 text-base font-bold text-slate-900">{tool.name}</h4>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{tool.desc}</p>

      <span className="mt-5 text-sm font-semibold text-emerald-700">
        Calculate Now
      </span>
    </button>
  );
}
