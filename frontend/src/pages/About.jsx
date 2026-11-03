
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Search,
  LockKeyhole,
  Handshake,
  Eye,
  Target,
  HeartHandshake,
  Lightbulb,
  Award,
  Landmark,
  ChartNoAxesCombined,
  Wallet,
  HeartPulse,
  PiggyBank,
  ReceiptText,
  Building2,
  BriefcaseBusiness,
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const marketInsights = [
  { name: "NIFTY 50", exchange: "NSE", type: "Equity Index", icon: ChartNoAxesCombined },
  { name: "SENSEX", exchange: "BSE", type: "Equity Index", icon: TrendingUp },
  { name: "NIFTY BANK", exchange: "NSE", type: "Banking Index", icon: Landmark },
  { name: "NIFTY IT", exchange: "NSE", type: "Technology Index", icon: BriefcaseBusiness },
  { name: "Gold", exchange: "MCX", type: "Precious Metal", icon: Wallet },
  { name: "Silver", exchange: "MCX", type: "Precious Metal", icon: Sparkles },
  { name: "USD / INR", exchange: "FOREX", type: "Currency", icon: Globe },
  { name: "10Y G-SEC", exchange: "INDIA", type: "Government Bond", icon: Landmark },
];

const services = [
  {
    icon: TrendingUp,
    title: "Mutual Funds",
    description:
      "Explore diversified investment options that align with your financial goals and risk profile.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Equity",
    description:
      "Understand equity investment opportunities with a focus on research and long-term goals.",
  },
  {
    icon: BriefcaseBusiness,
    title: "PMS & AIF",
    description:
      "Explore portfolio management and alternative investment solutions, subject to eligibility.",
  },
  {
    icon: Landmark,
    title: "FD & Bonds",
    description:
      "Learn about fixed-income products, their features, risks and potential role in your plan.",
  },
  {
    icon: HeartPulse,
    title: "Insurance",
    description:
      "Consider protection solutions designed around your family and financial responsibilities.",
  },
  {
    icon: Wallet,
    title: "Loans",
    description:
      "Explore financing options for personal and business needs with informed comparisons.",
  },
  {
    icon: PiggyBank,
    title: "National Pension Scheme",
    description:
      "Plan for retirement with a structured approach to long-term savings and pension planning.",
  },
  {
    icon: ReceiptText,
    title: "Tax Consultancy",
    description:
      "Understand tax-planning options and applicable compliance requirements for your situation.",
  },
  {
    icon: Building2,
    title: "Estate Planning",
    description:
      "Plan for the organized management and transfer of assets to future generations.",
  },
];

const strengths = [
  {
    icon: Users,
    title: "Fiduciary Responsibility",
    description:
      "We aim to put our clients' interests first and encourage informed, suitable financial decisions.",
  },
  {
    icon: Search,
    title: "Industry Expertise",
    description:
      "Research, financial knowledge and market awareness help bring context to complex decisions.",
  },
  {
    icon: LockKeyhole,
    title: "Methodological Approach",
    description:
      "A structured approach to financial planning, portfolio reviews and understanding investment risks.",
  },
  {
    icon: Handshake,
    title: "Transparency & Trust",
    description:
      "We value clear communication about processes, costs, product features and potential risks.",
  },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Mission",
    description:
      "Make financial stability and growth more accessible to individuals in India through tailored financial services, practical knowledge and personalized guidance.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "Build a trusted financial services experience that empowers individuals to make informed decisions and work towards a more secure financial future.",
  },
  {
    icon: Lightbulb,
    title: "Values",
    description:
      "We value integrity, transparency, client-centricity, innovation, excellence, teamwork and sustainable financial decision-making.",
  },
];

const expertise = [
  "Equity Research",
  "Portfolio Advisory",
  "Wealth Planning",
  "Tax Strategy",
  "Market Intelligence",
  "Estate Planning",
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p
        className={`text-xs font-bold uppercase tracking-[0.22em] sm:text-sm ${
          light ? "text-emerald-300" : "text-emerald-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-7 sm:text-base ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function About() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate bg-[#f1f8f4]">
        <div className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute -bottom-20 left-10 -z-10 h-72 w-72 rounded-full bg-teal-100/80 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
              <Sparkles size={16} />
              ABOUT NIVESH TRACK
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Maximize Returns
              <span className="mt-2 block text-emerald-700">
                With Expert Guidance
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Unlock growth opportunities through strategic planning,
              professional guidance and a data-driven approach to wealth
              management.
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Talk to Our Team <ArrowRight size={18} />
              </a>
              <a
                href="#who-we-are"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-800"
              >
                Who We Are
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-700" />
                Client-focused
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-700" />
                Research-led
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-700" />
                Transparent
              </span>
            </div>
          </div>

          {/* Decorative financial illustration */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-5 rounded-[2rem] bg-emerald-300/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-emerald-950/10 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">
                    Our approach
                  </p>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                    Your goals come first
                  </h2>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <ShieldCheck size={28} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">
                      Financial journey
                    </p>
                    <p className="mt-2 text-2xl font-bold sm:text-3xl">
                      Plan with purpose
                    </p>
                  </div>
                  <ChartNoAxesCombined
                    size={30}
                    className="text-emerald-300"
                  />
                </div>

                <div className="mt-7 flex h-32 items-end gap-2 sm:h-40 sm:gap-3">
                  {[28, 40, 35, 51, 46, 62, 58, 73, 67, 84, 78, 95].map(
                    (height, index) => (
                      <div
                        key={index}
                        className={`flex-1 rounded-t-md ${
                          index === 11 ? "bg-lime-300" : "bg-emerald-500"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-400">
                  <span>Today</span>
                  <span>Illustrative progress</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-100 p-4">
                  <Target className="text-emerald-700" size={23} />
                  <p className="mt-3 font-bold">Your goals</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    A plan shaped around you
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <ShieldCheck className="text-emerald-700" size={23} />
                  <p className="mt-3 font-bold">Informed choices</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Clarity about risk
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-slate-400">
                Illustrative design only. No actual investment performance is
                represented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section
        id="who-we-are"
        className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Who we are
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              More Than Numbers.
              <span className="block text-emerald-700">
                It's About Your Future.
              </span>
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Step into the world of Nivesh Track, where your financial
              journey is about more than just numbers. It is about the hopes,
              dreams and aspirations that matter most to you.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              We aim to make financial planning easier to understand through
              clear information, thoughtful guidance and solutions that
              consider your individual circumstances.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-900"
            >
              Get to Know Us <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl bg-emerald-700 p-6 text-white sm:p-7">
              <div className="rounded-xl bg-white/10 p-3 w-fit">
                <Users size={27} />
              </div>
              <h3 className="mt-5 text-xl font-bold">Expert Guidance</h3>
              <p className="mt-3 text-sm leading-7 text-emerald-50">
                Financial guidance designed around your needs, priorities and
                long-term objectives.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:mt-10 sm:p-7">
              <div className="rounded-xl bg-white p-3 text-emerald-700 shadow-sm w-fit">
                <Handshake size={27} />
              </div>
              <h3 className="mt-5 text-xl font-bold">Building Trust</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Honest communication and a commitment to helping clients
                understand their choices.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:-mt-3 sm:p-7">
              <div className="rounded-xl bg-white p-3 text-emerald-700 shadow-sm w-fit">
                <Target size={27} />
              </div>
              <h3 className="mt-5 text-xl font-bold">Our Mission</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Empower individuals with knowledge and support to work towards
                their financial goals.
              </p>
            </article>

            <article className="rounded-3xl bg-slate-950 p-6 text-white sm:mt-7 sm:p-7">
              <div className="rounded-xl bg-white/10 p-3 text-emerald-300 w-fit">
                <HeartHandshake size={27} />
              </div>
              <h3 className="mt-5 text-xl font-bold">
                Your Future, Our Priority
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Help you approach financial decisions with a clearer view of
                your future and responsibilities.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* EXPERTISE MARQUEE */}
      <section className="overflow-hidden border-y border-emerald-100 bg-[#f3faf6] py-6">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
          Our areas of expertise
        </p>
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
          {[...expertise, ...expertise].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* MISSION VISION VALUES */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What guides us"
            title="Our Mission, Vision & Values"
            description="The principles behind our commitment to financial awareness, responsible guidance and client-focused service."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className={`rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                    index === 1
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-slate-100 bg-white text-slate-900 shadow-sm"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      index === 1
                        ? "bg-white/10 text-emerald-200"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{value.title}</h3>
                  <p
                    className={`mt-4 text-sm leading-7 ${
                      index === 1 ? "text-emerald-50" : "text-slate-600"
                    }`}
                  >
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Trusted by investors"
            title="Why Trust Us?"
            description="We are committed to transparent, data-informed and client-centric financial guidance, with an emphasis on understanding each client's needs and risks."
            light
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/50 hover:bg-white/10"
                >
                  <div className="inline-flex rounded-xl bg-emerald-500/15 p-3 text-emerald-300">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-9 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-400"
            >
              Know More <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* MARKET INSIGHTS */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                Market insights
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Understand the Financial Markets
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Explore key market categories and financial instruments to
                build your understanding of the investment landscape.
              </p>
            </div>
            <a
              href="/services"
              className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-900"
            >
              View Market Insights <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketInsights.map((market) => {
              const Icon = market.icon;
              return (
                <article
                  key={market.name}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <Icon size={23} />
                    </div>
                    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                      {market.exchange}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{market.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{market.type}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Market category
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-6 text-slate-500">
            These are market categories, not live market quotes. No current
            prices, returns or market direction are displayed. Verify live
            data from official exchanges or reliable market-data providers.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#f5f9f6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our services"
            title="Investment & Financial Products"
            description="Explore the financial products and services that may fit your goals, circumstances and risk profile."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                      <Icon size={27} />
                    </div>
                    <ArrowRight
                      size={19}
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <a
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
                    >
                      Read More <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-800 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-10 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-200">
              <Award size={29} />
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
              Let's start
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Investing Now Starts With a Conversation
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
              Every financial journey is different. Connect with our team to
              discuss your goals and explore your available options.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                Get in Touch <ArrowRight size={18} />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-5 pb-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <p className="font-bold text-slate-800">Investment disclaimer</p>
          <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
            Mutual fund investments are subject to market risks. Please read
            all scheme-related documents carefully before investing. Past
            performance is not indicative of future returns. Investments can
            lose value, and returns are not guaranteed. Product eligibility,
            fees and applicable terms should be verified before investing.
            Information on this page is for general educational purposes and
            is not a substitute for personalized financial, investment or tax
            advice.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
