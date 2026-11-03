
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Landmark,
  Building2,
  Wallet,
  BadgeCheck,
  Clock,
  Coins,
  CalendarDays,
  TrendingUp,
  PiggyBank,
  ChartNoAxesCombined,
  GraduationCap,
  BookOpen,
  FileText,
  CircleDollarSign,
  CheckCircle2,
  HandCoins,
  BriefcaseBusiness,
  ChevronRight,
  Target,
} from "lucide-react";

const investmentTypes = [
  {
    title: "Fixed Deposits (FD)",
    description:
      "Invest a lump sum for a selected tenure at a stated interest rate, subject to the institution's terms.",
    icon: Landmark,
    features: [
      "Choose a suitable investment tenure",
      "Understand maturity and interest payouts",
      "Compare premature withdrawal conditions",
    ],
    tag: "Fixed-income option",
  },
  {
    title: "Government Bonds",
    description:
      "Explore bonds issued by the government with defined terms and interest-payment structures.",
    icon: ShieldCheck,
    features: [
      "Review issuer and repayment terms",
      "Understand coupon and maturity dates",
      "Consider interest-rate and market risks",
    ],
    tag: "Government securities",
  },
  {
    title: "Corporate Bonds",
    description:
      "Explore debt instruments issued by companies to raise funds for business activities.",
    icon: Building2,
    features: [
      "Review the issuer's credit quality",
      "Compare yields and maturity periods",
      "Understand default and liquidity risks",
    ],
    tag: "Corporate debt",
  },
  {
    title: "Municipal Bonds",
    description:
      "Learn about bonds issued by eligible local government entities and their financing objectives.",
    icon: Landmark,
    features: [
      "Review the issuer's financial position",
      "Check applicable tax treatment",
      "Understand interest and redemption terms",
    ],
    tag: "Local government debt",
  },
  {
    title: "Debentures",
    description:
      "Consider corporate debt instruments and assess whether they are secured or unsecured.",
    icon: FileText,
    features: [
      "Check security and repayment priority",
      "Review credit ratings where available",
      "Compare the risks with expected returns",
    ],
    tag: "Corporate instruments",
  },
];

const benefits = [
  {
    title: "Predictable Income",
    description:
      "Certain FDs and bonds specify interest rates and payment schedules in advance, subject to their terms.",
    icon: CalendarDays,
  },
  {
    title: "Capital Planning",
    description:
      "Align investment amounts and maturity dates with your future financial requirements.",
    icon: Target,
  },
  {
    title: "Portfolio Diversification",
    description:
      "Consider fixed-income investments alongside other asset classes based on your financial goals.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Regular Interest Income",
    description:
      "Some products offer periodic interest payments that may suit income-planning needs.",
    icon: Coins,
  },
  {
    title: "Investment Choices",
    description:
      "Compare issuers, tenures, interest structures, minimum investment amounts, and liquidity.",
    icon: Wallet,
  },
  {
    title: "Informed Decisions",
    description:
      "Understand product documents, risks, charges, and applicable tax rules before investing.",
    icon: BadgeCheck,
  },
];

const strategies = [
  {
    title: "Wealth Creation",
    description:
      "Build a long-term plan around your financial goals and investment horizon.",
    icon: TrendingUp,
  },
  {
    title: "Tax Planning",
    description:
      "Explore eligible tax-saving investments based on current applicable rules.",
    icon: CircleDollarSign,
  },
  {
    title: "Mutual Funds",
    description:
      "Learn about professionally managed portfolios and their investment risks.",
    icon: PiggyBank,
    path: "/mutual-funds",
  },
  {
    title: "Equity Investments",
    description:
      "Explore equity investing, company research, and long-term growth potential.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Retirement Planning",
    description:
      "Plan for future expenses with a strategy suited to your retirement timeline.",
    icon: HandCoins,
  },
  {
    title: "FD & Bonds",
    description:
      "Explore fixed-income products to understand their income and maturity features.",
    icon: Landmark,
    path: "/fd-bonds",
  },
  {
    title: "Risk Management",
    description:
      "Understand risk tolerance, diversification, and the impact of market changes.",
    icon: ShieldCheck,
  },
  {
    title: "Financial Growth",
    description:
      "Create a practical roadmap for saving, investing, and achieving your goals.",
    icon: BriefcaseBusiness,
  },
];

const resources = [
  {
    title: "Investing Essentials",
    description:
      "Understand the fundamentals of saving, investing, risk, and returns.",
    icon: BookOpen,
  },
  {
    title: "Portfolio Management",
    description:
      "Learn how asset allocation and diversification can support your objectives.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Fundamental Analysis",
    description:
      "Explore issuer financials, credit quality, and important investment documents.",
    icon: FileText,
  },
  {
    title: "Financial Learning",
    description:
      "Develop practical knowledge to make more informed financial decisions.",
    icon: GraduationCap,
  },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p
        className={`mb-3 text-sm font-bold uppercase tracking-[0.2em] ${
          light ? "text-teal-300" : "text-[#3D7A89]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-[#102D38]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-7 ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function FDBonds() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      {/* Hero */}
      <section className="relative bg-[#102D38]">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#3D7A89]/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-teal-200">
              <ShieldCheck size={17} />
              Reliable Fixed-Income Solutions
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Secure Your Wealth with{" "}
              <span className="text-teal-300">FD & Bonds</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore Fixed Deposits and Bonds to understand income
              opportunities, investment tenures, and risks. Make informed
              decisions based on your financial goals and risk appetite.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
              >
                Explore Investments <ArrowRight size={18} />
              </Link>
              <a
                href="#investment-types"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                View Options <ChevronRight size={18} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-300" />
                Goal-based planning
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-300" />
                Understand investment risks
              </span>
            </div>
          </div>

          {/* Investment overview card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#3D7A89]/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">
                    Investment planning
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Fixed-Income Options
                  </h2>
                </div>
                <div className="rounded-2xl bg-teal-300/15 p-3 text-teal-200">
                  <Landmark size={30} />
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  {
                    icon: Landmark,
                    title: "Fixed Deposits",
                    subtitle: "Explore interest and maturity terms",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Government Bonds",
                    subtitle: "Review government-issued securities",
                  },
                  {
                    icon: Building2,
                    title: "Corporate Bonds",
                    subtitle: "Assess issuer quality and credit risk",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="rounded-xl bg-teal-300/10 p-3 text-teal-200">
                        <Icon size={23} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">
                          {item.subtitle}
                        </p>
                      </div>
                      <ArrowRight
                        className="ml-auto shrink-0 text-teal-200"
                        size={18}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-[#3D7A89]/25 p-5">
                <p className="text-sm text-teal-100">Your next step</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Find investments that fit your goals.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 hover:text-white"
                >
                  Connect with an advisor <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment type cards */}
      <section
        id="investment-types"
        className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investment Solutions"
            title="Types of FD & Bonds"
            description="Compare common fixed-income investment options and understand their features, repayment terms, and associated risks before making a decision."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {investmentTypes.map((investment) => {
              const Icon = investment.icon;

              return (
                <article
                  key={investment.title}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/50 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3D7A89]/10 text-[#3D7A89] transition group-hover:bg-[#3D7A89] group-hover:text-white">
                      <Icon size={27} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {investment.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#102D38]">
                    {investment.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {investment.description}
                  </p>

                  <div className="my-5 h-px bg-slate-200" />

                  <ul className="space-y-3">
                    {investment.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-[#3D7A89]"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[#3D7A89] hover:gap-3"
                  >
                    Enquire Now <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="FD & Bonds Benefits"
            title="Features of FD & Bonds"
            description="Understand how fixed-income investments may support income planning, diversification, and financial stability. Features differ by product and issuer."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#3D7A89]/40 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3D7A89]/10 text-[#3D7A89]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#102D38]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={23}
                className="mt-0.5 shrink-0 text-amber-700"
              />
              <div>
                <h3 className="font-bold text-[#102D38]">
                  Before You Invest
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Not all FDs and bonds are risk-free or liquid. Check deposit
                  insurance eligibility and limits where applicable, issuer
                  creditworthiness, lock-in or withdrawal rules, market-price
                  movements, fees, and tax treatment. Tax rules depend on the
                  product and your circumstances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment strategies */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investment Strategies"
            title="Build a Balanced Financial Plan"
            description="Explore different financial planning areas to create a strategy aligned with your investment horizon, financial priorities, and risk tolerance."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strategies.map((strategy) => {
              const Icon = strategy.icon;

              return (
                <div
                  key={strategy.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#3D7A89]/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#3D7A89]/10 text-[#3D7A89]">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-bold text-[#102D38]">
                    {strategy.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {strategy.description}
                  </p>

                  {strategy.path && (
                    <Link
                      to={strategy.path}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#3D7A89]"
                    >
                      Explore <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning resources */}
      <section className="bg-[#102D38] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investing Essentials"
            title="Make Informed Investment Decisions"
            description="Build your financial knowledge with essential topics covering investment analysis, portfolio planning, and financial education."
            light
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => {
              const Icon = resource.icon;

              return (
                <article
                  key={resource.title}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-300/10 text-teal-200">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">
                    {resource.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {resource.description}
                  </p>

                  <Link
                    to="/contact"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-teal-200 hover:text-white"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advisor CTA */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] bg-[#EAF3F3] p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#3D7A89]">
              Connect with an Advisor
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#102D38] sm:text-4xl">
              Secure Your Financial Future with Informed Choices
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Explore Fixed Deposits and Bonds with a clear understanding of
              their features, risks, and potential role in your portfolio.
              Our team can help you identify questions to consider when
              evaluating available investment options.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
            >
              Connect with Us <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Goal-Based Planning",
                text: "Consider your time horizon and financial needs.",
              },
              {
                icon: ShieldCheck,
                title: "Risk Awareness",
                text: "Understand issuer, liquidity, and market risks.",
              },
              {
                icon: CalendarDays,
                title: "Income Planning",
                text: "Review interest-payment and maturity schedules.",
              },
              {
                icon: BadgeCheck,
                title: "Informed Decisions",
                text: "Compare product documents and applicable terms.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white bg-white p-5 shadow-sm"
                >
                  <Icon size={25} className="text-[#3D7A89]" />
                  <h3 className="mt-4 font-bold text-[#102D38]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#102D38] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-teal-200">
            <Coins size={32} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
            Fixed Deposits & Bonds
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Let's Start Investing with a Plan
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            Take the next step towards your financial goals. Explore your
            options, understand the risks, and build an investment strategy
            suited to your needs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-7 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-xs leading-6 text-slate-400">
            Investment values, interest rates, returns, liquidity, and tax
            treatment depend on the product, issuer, applicable rules, and
            market conditions. Returns are not guaranteed for every product.
            Review official documents and seek qualified advice where needed.
          </p>
        </div>
      </section>
    </main>
  );
}
