
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  ChartNoAxesCombined,
  ShieldCheck,
  Droplets,
  Eye,
  CalendarDays,
  Layers3,
  Wallet,
  Landmark,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

const investmentCards = [
  {
    title: "Stocks",
    description: "Build wealth through equity investments in leading companies.",
    icon: TrendingUp,
    link: "/mutual-funds",
  },
  {
    title: "Mutual Funds",
    description: "Enjoy professionally managed and diversified investments.",
    icon: ChartNoAxesCombined,
    link: "/mutual-funds",
  },
  {
    title: "Bonds",
    description: "Explore fixed-income investments and understand their features.",
    icon: Landmark,
    link: "/fd-bonds",
  },
  {
    title: "IPOs",
    description: "Learn about emerging businesses during their market debut.",
    icon: Building2,
    link: "/mutual-funds",
  },
];

const benefits = [
  {
    title: "Professional Management",
    description: "Skilled fund managers make investment decisions.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Diversification",
    description: "Spread investments across different assets to manage risk.",
    icon: Layers3,
  },
  {
    title: "Liquidity",
    description: "Redeem fund units according to the fund's applicable terms.",
    icon: Droplets,
  },
  {
    title: "Transparency",
    description: "Stay informed about fund holdings and performance.",
    icon: Eye,
  },
  {
    title: "SIP Option",
    description: "Invest regularly to build wealth steadily over time.",
    icon: CalendarDays,
  },
];

const fundTypes = [
  {
    title: "Equity Funds",
    description: "Invest primarily in stocks and seek long-term capital growth.",
    icon: TrendingUp,
  },
  {
    title: "Debt Funds",
    description: "Invest in debt securities and other fixed-income instruments.",
    icon: Landmark,
  },
  {
    title: "Hybrid Funds",
    description: "Combine equity and debt investments in varying proportions.",
    icon: Layers3,
  },
  {
    title: "Index Funds",
    description: "Track a market index to provide broad market exposure.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Sectoral Funds",
    description: "Focus on specific sectors such as technology, healthcare or banking.",
    icon: Building2,
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D7A89]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default function MutualFunds() {
  return (
    <div className="overflow-hidden bg-white text-slate-800">
      {/* Hero */}
      <section className="relative bg-[#f3f8f7] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3D7A89]/20 bg-white px-4 py-2 text-sm font-semibold text-[#3D7A89]">
              <ChartNoAxesCombined size={17} />
              Investment Solutions
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Secure Tomorrow with Strategic{" "}
              <span className="text-[#3D7A89]">Mutual Fund Planning</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Mutual funds offer a convenient way to invest towards your
              financial goals. Professionally managed funds pool money from
              multiple investors and invest across different assets.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#fund-types"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2d626e]"
              >
                Explore Mutual Funds <ArrowRight size={18} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:border-[#3D7A89] hover:text-[#3D7A89]"
              >
                Make an Enquiry
              </Link>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500">
              Mutual fund investments are subject to market risks. Returns are
              not guaranteed.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#3D7A89]/10 blur-2xl" />
            <div className="relative rounded-[2rem] bg-[#173e47] p-7 text-white shadow-2xl sm:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Your financial future</p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Plan with purpose.
                  </h2>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <TrendingUp size={30} />
                </div>
              </div>

              <div className="my-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/70">Investment approach</p>
                <div className="mt-5 space-y-5">
                  {[
                    ["Clear financial goals", "01"],
                    ["Diversified investments", "02"],
                    ["Consistent investing", "03"],
                  ].map(([label, number]) => (
                    <div key={number} className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3D7A89] text-sm font-bold">
                        {number}
                      </span>
                      <p className="font-medium">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/75">
                <ShieldCheck size={20} className="shrink-0 text-teal-300" />
                <p>Understand your goals, risk tolerance and time horizon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment cards */}
      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Explore Opportunities"
            title="Grow Your Wealth with Mutual Funds"
            description="Explore different investment categories and learn how they may fit into your financial plan."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {investmentCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/40 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3D7A89]/10 text-[#3D7A89] transition group-hover:bg-[#3D7A89] group-hover:text-white">
                    <Icon size={27} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                  <Link
                    to={item.link}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-[#3D7A89] hover:gap-3"
                  >
                    Read More <ArrowRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#f6f9f8] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Mutual Fund Benefits"
            title="Features of Mutual Funds"
            description="Explore common features of mutual funds and understand how they can support your investment approach."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6"
                >
                  <Icon size={29} className="text-[#3D7A89]" />
                  <h3 className="mt-5 font-bold text-slate-900">
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

      {/* Types of mutual funds */}
      <section id="fund-types" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investment Solutions"
            title="Types of Mutual Funds"
            description="Mutual funds collect investments from multiple individuals and invest them in stocks, bonds and other assets according to the fund's objectives."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fundTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="flex gap-5 rounded-2xl border border-slate-200 p-6 transition hover:border-[#3D7A89]/40 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3D7A89]/10 text-[#3D7A89]">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#3D7A89]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#173e47] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-teal-200">
            <Wallet size={17} /> Mutual Fund Planning
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Secure Returns in an Uncertain Market
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/75">
            Start your investment journey with a clear understanding of your
            financial goals, investment horizon and risk tolerance.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#173e47] transition hover:bg-teal-50"
          >
            Let's Start Investing <ArrowRight size={19} />
          </Link>

          <p className="mt-5 text-xs text-white/55">
            Investments involve risk. Please review relevant scheme documents
            before investing.
          </p>
        </div>
      </section>
    </div>
  );
}
