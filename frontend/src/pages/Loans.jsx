
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wallet,
  Home,
  BriefcaseBusiness,
  GraduationCap,
  Clock,
  Percent,
  FileCheck,
  Headphones,
  TrendingUp,
  PiggyBank,
  Landmark,
  CircleDollarSign,
  HandCoins,
  BadgeCheck,
  Building2,
  ChevronRight,
} from "lucide-react";

const loanTypes = [
  {
    title: "Personal Loans",
    description:
      "Flexible financing for personal expenses, planned purchases, and unexpected needs.",
    icon: Wallet,
    items: [
      {
        title: "Unsecured Personal Loans",
        description: "Borrow without collateral, subject to lender eligibility.",
      },
      {
        title: "Secured Personal Loans",
        description: "Loans backed by eligible assets, with terms set by the lender.",
      },
    ],
  },
  {
    title: "Home Loans",
    description:
      "Explore financing options for purchasing a home or accessing eligible home equity.",
    icon: Home,
    items: [
      {
        title: "Home Purchase Loans",
        description: "Financing options for buying a new home.",
      },
      {
        title: "Home Equity Loans",
        description: "Borrow against eligible equity in your existing property.",
      },
    ],
  },
  {
    title: "Business Loans",
    description:
      "Funding options to help businesses manage operations and pursue growth opportunities.",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Term Loans",
        description: "Structured repayments over an agreed loan duration.",
      },
      {
        title: "Working Capital Loans",
        description: "Financing to support day-to-day business operations.",
      },
    ],
  },
  {
    title: "Education Loans",
    description:
      "Explore financial support for education, professional courses, and higher studies.",
    icon: GraduationCap,
    items: [
      {
        title: "Undergraduate Loans",
        description: "Funding options for eligible undergraduate studies.",
      },
      {
        title: "Postgraduate Loans",
        description: "Financing options for advanced degrees and professional courses.",
      },
    ],
  },
];

const benefits = [
  {
    title: "Competitive Interest Rates",
    description:
      "Compare available rates and repayment costs to find an option suited to your budget.",
    icon: Percent,
  },
  {
    title: "Flexible Repayment Options",
    description:
      "Explore repayment periods and instalment options offered by different lenders.",
    icon: Clock,
  },
  {
    title: "Application Guidance",
    description:
      "Understand the application process and prepare the documents your lender may require.",
    icon: FileCheck,
  },
  {
    title: "Transparent Terms",
    description:
      "Review interest rates, fees, repayment schedules, and loan conditions before proceeding.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated Support",
    description:
      "Get guidance while exploring loan options and understanding the next steps.",
    icon: Headphones,
  },
];

const strategies = [
  {
    title: "Wealth Creation",
    description: "Build long-term wealth through disciplined investment planning.",
    icon: TrendingUp,
  },
  {
    title: "Tax Saving",
    description: "Explore eligible tax-saving options based on applicable rules.",
    icon: CircleDollarSign,
  },
  {
    title: "Mutual Funds",
    description: "Learn about diversified investment portfolios and their risks.",
    icon: PiggyBank,
  },
  {
    title: "Equity Investments",
    description: "Explore stock-market opportunities with informed research.",
    icon: TrendingUp,
  },
  {
    title: "Retirement Planning",
    description: "Prepare for future financial needs with a retirement strategy.",
    icon: HandCoins,
  },
  {
    title: "FD & Bonds",
    description: "Explore fixed-income products and understand their terms.",
    icon: Landmark,
  },
  {
    title: "Risk Management",
    description: "Understand risk and consider suitable financial diversification.",
    icon: ShieldCheck,
  },
  {
    title: "Financial Growth",
    description: "Work towards sustainable financial goals with long-term planning.",
    icon: Building2,
  },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
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

export default function Loans() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      {/* Hero */}
      <section className="relative bg-[#102D38]">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#3D7A89]/20 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-teal-200">
              <ShieldCheck size={17} />
              Financial Solutions for Your Goals
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn Your Plans into{" "}
              <span className="text-teal-300">Reality</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore loan options for personal needs, home ownership,
              education, and business growth. Get guidance to understand your
              choices and move forward with greater confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
              >
                Explore Loan Options <ArrowRight size={18} />
              </Link>
              <a
                href="#loan-solutions"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Discover More <ChevronRight size={18} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-300" />
                Personalised guidance
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-300" />
                Clear loan information
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#3D7A89]/20 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Plan with confidence</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">
                    Your Financial Goals
                  </h3>
                </div>
                <div className="rounded-2xl bg-teal-300/15 p-3 text-teal-200">
                  <HandCoins size={30} />
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  {
                    icon: Home,
                    title: "Home & Personal",
                    subtitle: "Finance important life decisions",
                  },
                  {
                    icon: BriefcaseBusiness,
                    title: "Business Growth",
                    subtitle: "Explore business funding options",
                  },
                  {
                    icon: GraduationCap,
                    title: "Education",
                    subtitle: "Plan for academic expenses",
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
                        <h4 className="font-semibold text-white">
                          {item.title}
                        </h4>
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
                  Find a loan that fits your needs.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 hover:text-white"
                >
                  Talk to our team <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan types */}
      <section id="loan-solutions" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Loan Solutions"
            title="Types of Loans Available"
            description="Explore personal, housing, business, and education financing options. The right product depends on your needs, eligibility, and the lender's terms."
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {loanTypes.map((loan) => {
              const Icon = loan.icon;
              return (
                <article
                  key={loan.title}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/50 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3D7A89]/10 text-[#3D7A89] transition group-hover:bg-[#3D7A89] group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-xl font-bold text-[#102D38]">
                    {loan.title}
                  </h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {loan.description}
                  </p>

                  <div className="my-5 h-px bg-slate-200" />

                  <div className="space-y-5">
                    {loan.items.map((item) => (
                      <div key={item.title}>
                        <h4 className="flex items-start gap-2 text-sm font-bold text-[#102D38]">
                          <CheckCircle2
                            size={17}
                            className="mt-0.5 shrink-0 text-[#3D7A89]"
                          />
                          {item.title}
                        </h4>
                        <p className="mt-2 pl-6 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

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

      {/* Investment strategies */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investment Strategies"
            title="Plan Beyond Borrowing"
            description="Loans are one part of your financial journey. Explore other planning areas that can help you work towards your long-term goals."
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
                </div>
              );
            })}
          </div>

          <div className="mt-9 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#3D7A89] px-6 py-3 font-semibold text-[#3D7A89] transition hover:bg-[#3D7A89] hover:text-white"
            >
              Explore Financial Planning <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Equity feature */}
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] bg-[#102D38] p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Equity Investments
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Smart Stock Investment Solutions
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Build a more informed approach to long-term wealth creation
              through research, diversification, and investment planning.
              Understand the risks and opportunities before making investment
              decisions.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
            >
              Learn More <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: TrendingUp,
                title: "Growth Planning",
                subtitle: "Long-term perspective",
              },
              {
                icon: ShieldCheck,
                title: "Risk Awareness",
                subtitle: "Understand your exposure",
              },
              {
                icon: PiggyBank,
                title: "Goal Based",
                subtitle: "Plan for your priorities",
              },
              {
                icon: BadgeCheck,
                title: "Informed Choices",
                subtitle: "Research before investing",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <Icon size={27} className="text-teal-300" />
                  <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Loan Benefits"
            title="Features of Our Loan Guidance"
            description="Understand your options with practical guidance, clear information, and support as you compare available loan products."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
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
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#EAF3F3] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#3D7A89] shadow-sm">
            <HandCoins size={32} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#3D7A89]">
            Your Next Chapter
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-[#102D38] sm:text-5xl">
            Let's Start Planning Today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            With a range of financing options to explore, you can take the next
            step towards your personal or business goals. Connect with us to
            discuss your requirements and understand the available options.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-7 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
            >
              Talk to Our Team <ArrowRight size={18} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#3D7A89]/30 px-7 py-3.5 font-semibold text-[#102D38] transition hover:bg-white"
            >
              Back to Home
            </Link>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-xs leading-6 text-slate-500">
            Loan approval, interest rates, fees, eligibility, collateral
            requirements, and repayment terms depend on the lender and the
            applicant's circumstances. Review the official loan agreement
            before committing. This page provides general information and does
            not guarantee loan approval or specific rates.
          </p>
        </div>
      </section>
    </main>
  );
}
