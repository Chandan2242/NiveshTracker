
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Users,
  Landmark,
  HeartHandshake,
  Scale,
  LockKeyhole,
  HandCoins,
  BadgeCheck,
  CheckCircle2,
  TrendingUp,
  PiggyBank,
  ChartNoAxesCombined,
  GraduationCap,
  BriefcaseBusiness,
  Clock,
  ScrollText,
  Building2,
  ChevronRight,
  Wallet,
  Target,
} from "lucide-react";

const planningServices = [
  {
    title: "Will Writing",
    description:
      "Document your wishes regarding the distribution of your assets and help your family understand your intentions.",
    icon: ScrollText,
    features: [
      "Record asset distribution wishes",
      "Identify intended beneficiaries",
      "Understand applicable legal formalities",
    ],
  },
  {
    title: "Trust Planning",
    description:
      "Explore whether a trust structure may help manage assets for beneficiaries according to your objectives.",
    icon: Landmark,
    features: [
      "Plan for beneficiaries' future needs",
      "Define asset management arrangements",
      "Understand trustee responsibilities",
    ],
  },
  {
    title: "Asset & Wealth Planning",
    description:
      "Organise information about your assets, ownership, and financial priorities to support long-term planning.",
    icon: ShieldCheck,
    features: [
      "Create an overview of your assets",
      "Review ownership and nominations",
      "Plan for continuity and succession",
    ],
  },
  {
    title: "Family Legacy Planning",
    description:
      "Prepare a structured approach to passing on wealth and communicating your wishes to loved ones.",
    icon: HeartHandshake,
    features: [
      "Consider family financial needs",
      "Identify future responsibilities",
      "Organise important documents",
    ],
  },
];

const benefits = [
  {
    title: "Peace of Mind",
    description:
      "Make your wishes clearer and help your loved ones understand your plans for the future.",
    icon: HeartHandshake,
  },
  {
    title: "Legacy Preservation",
    description:
      "Plan how your assets and family legacy may be managed and passed on to future generations.",
    icon: Landmark,
  },
  {
    title: "Tax Awareness",
    description:
      "Understand the tax implications of asset transfers and seek appropriate professional advice.",
    icon: Scale,
  },
  {
    title: "Asset Organisation",
    description:
      "Keep ownership details, financial records, and important documents organised for future reference.",
    icon: LockKeyhole,
  },
  {
    title: "Family Protection",
    description:
      "Consider the financial needs of dependants and plan for the people who matter most.",
    icon: Users,
  },
  {
    title: "Planned Wealth Transfer",
    description:
      "Establish a clearer process for communicating your wishes and arranging the transfer of assets.",
    icon: FileText,
  },
];

const strategies = [
  {
    title: "Wealth Creation",
    description:
      "Build a long-term financial plan around your personal and family goals.",
    icon: TrendingUp,
  },
  {
    title: "Tax Planning",
    description:
      "Explore tax considerations that may apply to your investments and assets.",
    icon: Wallet,
  },
  {
    title: "Mutual Funds",
    description:
      "Learn how diversified investment portfolios may fit into your financial plan.",
    icon: PiggyBank,
    path: "/mutual-funds",
  },
  {
    title: "Equity Investments",
    description:
      "Understand equity investments and their potential role in long-term wealth creation.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Retirement Planning",
    description:
      "Plan for future income requirements and financial independence.",
    icon: HandCoins,
  },
  {
    title: "FD & Bonds",
    description:
      "Explore fixed-income products and understand their risks and terms.",
    icon: Landmark,
    path: "/fd-bonds",
  },
  {
    title: "Risk Management",
    description:
      "Consider financial risks and organise your plans to address changing circumstances.",
    icon: ShieldCheck,
  },
  {
    title: "Financial Growth",
    description:
      "Connect your savings, investments, and future financial priorities.",
    icon: BriefcaseBusiness,
  },
];

const planningSteps = [
  {
    number: "01",
    title: "Understand Your Assets",
    description:
      "Create a record of your property, savings, investments, and other important assets.",
  },
  {
    number: "02",
    title: "Identify Your Priorities",
    description:
      "Consider your dependants, intended beneficiaries, and long-term family needs.",
  },
  {
    number: "03",
    title: "Explore Suitable Arrangements",
    description:
      "Review options such as wills, trusts, nominations, and succession arrangements with qualified professionals.",
  },
  {
    number: "04",
    title: "Review Your Plan",
    description:
      "Revisit your arrangements when your family, assets, or personal circumstances change.",
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

export default function EstatePlanning() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      {/* Hero */}
      <section className="relative bg-[#102D38]">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#3D7A89]/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-teal-200">
              <ShieldCheck size={17} />
              Plan Today. Protect Tomorrow.
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Protect, Preserve &{" "}
              <span className="text-teal-300">Pass On</span> Your Wealth
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Estate planning helps you organise your assets, document your
              wishes, and plan how your wealth may be managed and transferred
              to the people who matter most.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
              >
                Start Planning <ArrowRight size={18} />
              </Link>

              <a
                href="#estate-services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services <ChevronRight size={18} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-300" />
                Family-focused planning
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-300" />
                Organised wealth transfer
              </span>
            </div>
          </div>

          {/* Hero information card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#3D7A89]/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">
                    Your family's future
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Your Legacy Plan
                  </h2>
                </div>

                <div className="rounded-2xl bg-teal-300/15 p-3 text-teal-200">
                  <HeartHandshake size={30} />
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                A thoughtful plan can help bring clarity to asset ownership,
                family priorities, and future wealth transfer.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  {
                    icon: ScrollText,
                    title: "Wills & Documentation",
                    subtitle: "Record your wishes clearly",
                  },
                  {
                    icon: Landmark,
                    title: "Trust Planning",
                    subtitle: "Explore asset management options",
                  },
                  {
                    icon: Users,
                    title: "Family & Beneficiaries",
                    subtitle: "Plan for the people you care about",
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

              <Link
                to="/contact"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#3D7A89]/30 px-5 py-3 font-semibold text-white transition hover:bg-[#3D7A89]/50"
              >
                Discuss Your Goals <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#3D7A89]">
              Secure Your Legacy
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[#102D38] sm:text-4xl">
              Secure Your Legacy for Future Generations
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Protect your assets, provide for your loved ones, and establish
              a clearer approach to transferring wealth with a well-considered
              estate plan. Planning ahead can help your family understand your
              wishes and locate important financial information when it is
              needed.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Organise details of your assets and liabilities",
                "Document your wishes and intended beneficiaries",
                "Review nominations and relevant legal documents",
                "Keep your arrangements updated as circumstances change",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#3D7A89]"
                  />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
            >
              Talk to Our Team <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#3D7A89]/10 blur-xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#EAF3F3] p-7 sm:p-10">
              <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#102D38] text-teal-200 shadow-lg">
                  <ShieldCheck size={48} />
                </div>

                <h3 className="mt-7 text-2xl font-extrabold text-[#102D38]">
                  Protect What Matters
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Your assets, your wishes, your family's future. Bring them
                  together in a plan designed around your priorities.
                </p>

                <div className="mt-7 grid w-full grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4">
                    <ScrollText
                      size={24}
                      className="mx-auto text-[#3D7A89]"
                    />
                    <p className="mt-3 text-sm font-semibold text-[#102D38]">
                      Your Wishes
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <Users size={24} className="mx-auto text-[#3D7A89]" />
                    <p className="mt-3 text-sm font-semibold text-[#102D38]">
                      Your Family
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estate planning benefits */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Estate Planning Benefits"
            title="Features of Estate Planning"
            description="A well-organised estate plan can help preserve your legacy, communicate your intentions, and prepare your family for future responsibilities."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#3D7A89]/40 hover:shadow-lg"
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

      {/* Planning services */}
      <section
        id="estate-services"
        className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Estate Planning"
            title="Types of Estate Planning"
            description="Explore key estate-planning services to help organise your assets, record your wishes, and plan for your intended beneficiaries."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {planningServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-[#3D7A89]/50 hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#3D7A89]/10 text-[#3D7A89] transition group-hover:bg-[#3D7A89] group-hover:text-white">
                      <Icon size={27} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#102D38]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-[#3D7A89]"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3D7A89] transition hover:gap-3"
                  >
                    Enquire About This Service <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Planning process */}
      <section className="bg-[#102D38] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Your Planning Journey"
            title="A Clearer Path to Your Legacy"
            description="Start with your current assets and priorities, explore appropriate arrangements, and review your plan as your life changes."
            light
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {planningSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:bg-white/10"
              >
                <span className="text-3xl font-extrabold text-teal-300">
                  {step.number}
                </span>

                <h3 className="mt-5 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investment strategies */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investment Strategies"
            title="Connect Your Investments with Your Legacy"
            description="Estate planning works alongside broader financial planning. Explore areas that may help you organise your financial future."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strategies.map((strategy) => {
              const Icon = strategy.icon;

              return (
                <article
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
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important note */}
      <section className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <Scale size={24} className="mt-0.5 shrink-0 text-amber-700" />
          <div>
            <h3 className="font-bold text-[#102D38]">
              Important Legal Considerations
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Estate planning laws, will formalities, inheritance rules, trust
              requirements, and tax treatment vary by jurisdiction and
              individual circumstances. Consult a qualified legal or tax
              professional before relying on a document or arrangement. This
              page provides general information, not legal or tax advice.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#EAF3F3] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#3D7A89] shadow-sm">
            <HeartHandshake size={32} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#3D7A89]">
            Estate Planning
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-[#102D38] sm:text-5xl">
            Preserve Your Legacy. Plan for Tomorrow.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Take the first step towards organising your assets and documenting
            your wishes. Connect with our team to discuss your goals and
            understand the next steps in your estate-planning journey.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-7 py-3.5 font-semibold text-white transition hover:bg-[#326775]"
            >
              Start Your Plan <ArrowRight size={18} />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#3D7A89]/30 px-7 py-3.5 font-semibold text-[#102D38] transition hover:bg-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
