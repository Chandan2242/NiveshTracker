
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Calculator,
  FileCheck,
  Lightbulb,
  Clock,
  TrendingUp,
  Wallet,
  PiggyBank,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Landmark,
  Umbrella,
  Target,
} from "lucide-react";

const benefits = [
  {
    icon: Lightbulb,
    title: "Expert Guidance",
    description:
      "Get professional guidance to understand tax obligations and make informed financial decisions.",
  },
  {
    icon: FileCheck,
    title: "Comprehensive Solutions",
    description:
      "Support for tax planning, filing, compliance, and tax-related concerns.",
  },
  {
    icon: Target,
    title: "Customized Advice",
    description:
      "Explore tax strategies suited to your financial situation and business requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    description:
      "Stay organized with guidance on applicable tax rules and filing requirements.",
  },
  {
    icon: Clock,
    title: "Time Efficiency",
    description:
      "Simplify tax-related tasks with structured documentation and expert assistance.",
  },
  {
    icon: Calculator,
    title: "Tax Saving Strategies",
    description:
      "Identify eligible deductions and tax-saving opportunities based on applicable laws.",
  },
];

const taxServices = [
  {
    icon: Calculator,
    title: "Tax Planning",
    description:
      "Plan your finances in advance and explore lawful ways to manage your tax liability.",
  },
  {
    icon: FileCheck,
    title: "Tax Compliance",
    description:
      "Get support understanding filing requirements, documentation, and compliance obligations.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Tax Advisory",
    description:
      "Receive guidance for personal finances, investments, and business-related tax questions.",
  },
  {
    icon: ShieldCheck,
    title: "Tax Dispute Resolution",
    description:
      "Understand notices and available next steps for resolving tax-related concerns.",
  },
];

const investmentOptions = [
  {
    icon: TrendingUp,
    title: "Wealth Creation",
    description:
      "Build a long-term investment approach aligned with your financial goals.",
    path: "/mutual-funds",
  },
  {
    icon: PiggyBank,
    title: "Tax Saving",
    description:
      "Understand eligible tax-saving options based on your circumstances and applicable rules.",
    path: "/mutual-funds",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Equity Investments",
    description:
      "Explore stock market basics, investment research, and growth opportunities.",
    path: "/mutual-funds",
  },
  {
    icon: Wallet,
    title: "Retirement Planning",
    description:
      "Prepare for future financial needs with a disciplined long-term plan.",
    path: "/estate-planning",
  },
  {
    icon: Landmark,
    title: "FD & Bonds",
    description:
      "Learn about fixed-income products, their risks, and potential returns.",
    path: "/fd-bonds",
  },
  {
    icon: Umbrella,
    title: "Risk Management",
    description:
      "Consider diversification and risk management while planning your finances.",
    path: "/insurance",
  },
];

const articles = [
  {
    number: "01",
    title: "Investing Essentials",
    description:
      "Build a strong financial foundation with informed and strategic investment decisions.",
  },
  {
    number: "02",
    title: "Portfolio Management",
    description:
      "Learn how portfolio diversification can help balance investment risk and objectives.",
  },
  {
    number: "03",
    title: "Fundamental Analysis",
    description:
      "Understand company performance, financial strength, and investment fundamentals.",
  },
  {
    number: "04",
    title: "Financial Learning",
    description:
      "Develop practical knowledge of financial planning and wealth management.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#3D7A89]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default function TaxConsultancy() {
  return (
    <div className="overflow-hidden bg-white text-slate-800">
      {/* HERO */}
      <section className="relative isolate bg-[#102D38]">
        <div className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-[#3D7A89]/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-emerald-700/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-teal-100">
              <ShieldCheck size={17} />
              Tax Planning & Consultancy
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Smart Tax Planning{" "}
              <span className="text-[#8CD0D5]">& Consultancy</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Get expert tax advice, seamless filing support, and strategic
              tax planning solutions designed to help manage your finances and
              support regulatory compliance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#tax-services"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326674]"
              >
                Explore Our Services <ArrowRight size={18} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Talk to an Expert
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="font-semibold text-white">Tax Planning</p>
                <p className="mt-1 text-sm text-slate-400">
                  Plan with clarity
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Filing Support</p>
                <p className="mt-1 text-sm text-slate-400">
                  Stay organized
                </p>
              </div>
            </div>
          </div>

          {/* HERO INFO CARD */}
          <div className="mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">
                    Your financial checklist
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Tax Planning Essentials
                  </h2>
                </div>
                <div className="rounded-2xl bg-[#3D7A89]/30 p-3 text-[#A6E4E5]">
                  <Calculator size={28} />
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  ["Review income & expenses", "Understand your finances"],
                  ["Check eligible deductions", "Review applicable tax rules"],
                  ["Organize documents", "Prepare filing information"],
                  ["Plan future investments", "Align with financial goals"],
                ].map(([title, description], index) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3D7A89]/25 text-[#A6E4E5]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {description}
                      </p>
                    </div>
                    <CheckCircle2
                      className="ml-auto shrink-0 text-[#8CD0D5]"
                      size={20}
                    />
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-400">
                Tax outcomes depend on individual circumstances and applicable
                laws. Professional review may be required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#3D7A89]">
              Expert Tax Consultancy Services
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Maximize Savings.
              <span className="block text-[#3D7A89]">
                Minimize Tax Complexity.
              </span>
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Tax consultancy provides professional advice to help individuals
              and businesses understand tax obligations, plan their finances,
              and complete filing requirements. A structured approach can help
              identify eligible tax-saving opportunities and reduce avoidable
              errors.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Our goal is to make the tax process easier to understand, so you
              can focus on your personal and financial priorities.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-[#3D7A89] hover:text-[#285b67]"
            >
              Get Tax Planning Assistance <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-[#EDF6F5] p-6 sm:p-8">
              <Calculator className="text-[#3D7A89]" size={30} />
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Plan Ahead
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand tax responsibilities before important deadlines.
              </p>
            </div>
            <div className="mt-8 rounded-3xl bg-slate-50 p-6 sm:p-8">
              <FileCheck className="text-[#3D7A89]" size={30} />
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                File Confidently
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep records organized and review filing information carefully.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 sm:p-8">
              <ShieldCheck className="text-[#3D7A89]" size={30} />
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Stay Compliant
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand applicable regulations and reporting obligations.
              </p>
            </div>
            <div className="mt-8 rounded-3xl bg-[#102D38] p-6 text-white sm:p-8">
              <TrendingUp className="text-[#8CD0D5]" size={30} />
              <h3 className="mt-5 text-lg font-bold">Think Long Term</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Connect tax decisions with your broader financial goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Tax Consultancy Benefits"
            title="Guidance That Simplifies Tax Planning"
            description="Get professional guidance, organized filing support, and practical planning solutions designed around your financial needs."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/40 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF6F5] text-[#3D7A89] transition group-hover:bg-[#3D7A89] group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TAX SERVICES */}
      <section
        id="tax-services"
        className="scroll-mt-28 px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Services"
            title="Explore Our Tax Consultancy Solutions"
            description="Explore services that can help you organize your tax affairs, understand your responsibilities, and make informed financial decisions."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {taxServices.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 p-6 transition hover:border-[#3D7A89] hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#102D38] text-white">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3D7A89] hover:gap-3"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STOCK MARKET EDUCATION */}
      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-[#EDF6F5] lg:grid-cols-2">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#3D7A89]">
              Investing Education
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Want to Learn More About Stocks?
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Gain knowledge about investment fundamentals, market trends, risk
              management, and portfolio building. Financial education can help
              you make more informed decisions before investing.
            </p>
            <Link
              to="/mutual-funds"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-5 py-3 font-semibold text-white transition hover:bg-[#326674]"
            >
              Explore Investment Options <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex items-center bg-[#102D38] p-7 text-white sm:p-10 lg:p-14">
            <div className="w-full">
              {[
                "Stock Market Basics",
                "Fundamental Analysis",
                "Technical Analysis",
                "Risk Management",
                "Portfolio Building",
                "Wealth Creation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-white/10 py-4 last:border-b-0"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-[#8CD0D5]"
                  />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT SOLUTIONS */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investment Solutions"
            title="Build a Stronger Financial Future"
            description="Explore financial planning areas that may complement your tax strategy. Each investment has its own risks, costs, and eligibility conditions."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {investmentOptions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon size={27} className="text-[#3D7A89]" />
                  <h3 className="mt-4 font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                  <Link
                    to={item.path}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3D7A89] hover:text-[#285b67]"
                  >
                    Explore More <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EDUCATIONAL ARTICLES */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#3D7A89]">
                Investing Essentials
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Learn. Plan. Grow.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Strengthen your financial knowledge with useful concepts in
                investing, portfolio management, and financial planning.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#3D7A89] hover:text-[#285b67]"
            >
              View All Articles <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <article
                key={article.number}
                className="rounded-2xl border border-slate-200 p-6 transition hover:border-[#3D7A89]/50 hover:shadow-lg"
              >
                <p className="text-sm font-bold tracking-widest text-[#3D7A89]">
                  {article.number}
                </p>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {article.description}
                </p>
                <Link
                  to="/blog"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3D7A89] hover:gap-3"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#102D38] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#8CD0D5]">
            <TrendingUp size={29} />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#8CD0D5]">
            Start Your Financial Journey
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Let's Start Planning Your Financial Future
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Take the next step towards better tax organization and smarter
            financial planning. Connect with us to discuss your requirements.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-7 py-3.5 font-semibold text-white transition hover:bg-[#326674]"
          >
            Contact Our Team <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
