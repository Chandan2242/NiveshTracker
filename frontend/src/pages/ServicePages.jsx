
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Calculator,
  ShieldCheck,
  Landmark,
  Building2,
  House,
  FileCheck,
  CheckCircle2,
  HandCoins,
  PiggyBank,
  BriefcaseBusiness,
  Layers3,
  Globe2,
} from "lucide-react";

// All Services
const services = [
  {
    slug: "mutual-funds",
    title: "Mutual Funds",
    short: "Explore investment opportunities for your financial goals.",
    description:
      "Understand mutual funds, investment approaches, diversification and long-term wealth planning according to your goals and risk profile.",
    icon: TrendingUp,
    tag: "Investment",
    benefits: [
      "Understand different mutual fund categories",
      "Learn about SIP and lump-sum investing",
      "Explore diversification and risk",
      "Align investments with your financial goals",
    ],
  },
  {
    slug: "pms",
    title: "PMS",
    short: "Professionally managed, concentrated portfolios for eligible investors.",
    description:
      "Explore Portfolio Management Services through our empanelled partners and understand portfolio strategies, eligibility, risks and investment requirements.",
    icon: BriefcaseBusiness,
    tag: "Portfolio Management",
    benefits: [
      "Understand Portfolio Management Services",
      "Explore different portfolio strategies",
      "Learn about eligibility and investment requirements",
      "Understand associated risks and fees",
    ],
  },
  {
    slug: "aif",
    title: "AIF",
    short: "Explore alternative investment opportunities.",
    description:
      "Learn about Category I, II and III Alternative Investment Funds and explore opportunities through our empanelled fund managers.",
    icon: Layers3,
    tag: "Alternative Investments",
    benefits: [
      "Understand Category I, II and III AIFs",
      "Explore alternative investment strategies",
      "Learn about eligibility and investment requirements",
      "Understand investment risks and fund structures",
    ],
  },
  {
    slug: "sif",
    title: "SIF",
    short: "Explore specialised investment funds.",
    description:
      "Understand Specialised Investment Funds, their strategies, eligibility and how they differ from mutual funds and PMS.",
    icon: TrendingUp,
    tag: "Specialised Investment",
    benefits: [
      "Understand the SIF investment category",
      "Explore different investment strategies",
      "Learn about eligibility requirements",
      "Understand associated risks and costs",
    ],
  },
  {
    slug: "insurance",
    title: "Insurance",
    short: "Explore protection options for life's uncertainties.",
    description:
      "Explore life, health and general insurance options through our registered insurer panel and understand coverage requirements.",
    icon: ShieldCheck,
    tag: "Protection",
    benefits: [
      "Understand life and health insurance",
      "Review your coverage needs",
      "Learn about premiums and policy terms",
      "Understand exclusions and claim conditions",
    ],
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    short: "Make informed decisions about tax planning.",
    description:
      "Explore general tax-planning inputs alongside your investments and understand applicable tax provisions and deductions.",
    icon: Calculator,
    tag: "Tax Planning",
    benefits: [
      "Understand applicable tax provisions",
      "Explore eligible deductions and exemptions",
      "Plan tax-related financial decisions",
      "Organise relevant financial documents",
    ],
  },
  {
    slug: "tax-consultancy",
    title: "Tax Consultancy",
    short: "Understand tax planning and tax-related requirements.",
    description:
      "Understand tax planning, applicable deductions and tax-related requirements to organise your finances more effectively.",
    icon: FileCheck,
    tag: "Tax Consultancy",
    benefits: [
      "Understand applicable tax provisions",
      "Explore eligible deductions and exemptions",
      "Plan tax-related financial decisions",
      "Organise relevant financial documents",
    ],
  },
  {
    slug: "estate-planning",
    title: "Estate Planning",
    short: "Plan how your assets may be managed and transferred.",
    description:
      "Understand the basics of wills, nominations and succession planning with support from a legal partner.",
    icon: House,
    tag: "Legacy Planning",
    benefits: [
      "Understand the purpose of a will",
      "Review nominations and asset records",
      "Organise important financial documents",
      "Learn about succession planning",
    ],
  },
  {
    slug: "gift-city-investing",
    title: "GIFT City Investing",
    short: "Explore global investment access through GIFT City's IFSC.",
    description:
      "Learn about global investment opportunities through GIFT City's IFSC with the support of a designated partner.",
    icon: Globe2,
    tag: "Global Investments",
    benefits: [
      "Understand GIFT City's IFSC framework",
      "Explore available investment opportunities",
      "Understand eligibility and onboarding requirements",
      "Learn about associated risks and regulations",
    ],
  },
  {
    slug: "loans",
    title: "Loans",
    short: "Understand borrowing options and repayment commitments.",
    description:
      "Compare loan features, understand interest rates and repayment terms, and evaluate borrowing according to your financial situation.",
    icon: HandCoins,
    tag: "Borrowing",
    benefits: [
      "Understand common loan types",
      "Learn about interest rates and EMI",
      "Compare fees and repayment conditions",
      "Plan borrowing within your budget",
    ],
  },
  {
    slug: "fd-bonds",
    title: "FD & Bonds",
    short: "Explore fixed-income products and their features.",
    description:
      "Learn how fixed deposits and bonds work, including returns, tenure, liquidity, taxation and the risks associated with different products.",
    icon: Landmark,
    tag: "Fixed Income",
    benefits: [
      "Understand fixed deposit features",
      "Explore different types of bonds",
      "Compare tenure and potential returns",
      "Understand liquidity and investment risks",
    ],
  },
];

// General Services
const generalServices = [
  {
    title: "Financial Planning",
    description:
      "Organise your financial priorities, savings and future goals.",
    icon: PiggyBank,
  },
  {
    title: "Investment Guidance",
    description:
      "Understand investment choices, diversification and risk.",
    icon: TrendingUp,
  },
  {
    title: "Protection Planning",
    description:
      "Review your insurance needs and financial protection priorities.",
    icon: ShieldCheck,
  },
  {
    title: "Loan Guidance",
    description:
      "Understand borrowing options, interest and repayment commitments.",
    icon: HandCoins,
  },
];

// Page Hero
function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#007A55]">
          {eyebrow}
        </p>

        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#007A55] px-6 py-3.5 font-semibold text-white transition hover:bg-[#006447]"
          >
            Make an Enquiry <ArrowRight size={18} />
          </Link>

          <Link
            to="/financial-calculator"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-[#007A55] hover:text-[#007A55]"
          >
            Financial Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}

// Individual Service Card
function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
          <Icon size={27} />
        </div>

        <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
          {service.tag || "Financial Service"}
        </span>
      </div>

      <h2 className="mt-6 text-xl font-bold text-slate-900">
        {service.title}
      </h2>

      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {service.short || service.description}
      </p>

      {service.slug && (
        <Link
          to={`/${service.slug}`}
          className="mt-6 inline-flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-bold text-[#007A55]"
        >
          Explore Service
          <ArrowRight
            size={17}
            className="transition group-hover:translate-x-1"
          />
        </Link>
      )}
    </article>
  );
}

// All Services Page
export function AllServices() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Financial Solutions for Your Life Goals"
        description="Explore financial planning, investment education and other services designed to help you make informed financial decisions."
      />

      <section className="relative isolate overflow-hidden bg-[#f7faf8] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Explore Our Services
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Find information about the financial topics that matter to you.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}

            {generalServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white sm:p-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Have a financial question?
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                Contact our team to discuss your requirements and learn
                which services may be relevant to your needs.
              </p>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100 lg:ml-8 lg:mt-0"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Individual Service Detail Page
export default function ServiceDetail() {
  const { slug } = useParams();

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="px-5 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Service Not Found
        </h1>

        <p className="mt-3 text-slate-600">
          Please select a service from our services page.
        </p>

        <Link
          to="/services"
          className="mt-6 inline-flex rounded-xl bg-[#007A55] px-6 py-3 font-semibold text-white"
        >
          View All Services
        </Link>
      </section>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow={service.tag}
        title={service.title}
        description={service.description}
      />

      <section className="relative isolate overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-50 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#007A55]/10 text-[#007A55]">
              <Icon size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              How We Can Help
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              {service.description}
            </p>

            <div className="mt-8 space-y-4">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-[#007A55]"
                  />
                  <p className="leading-7 text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-emerald-100 bg-[#EDFCF4] p-7 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-[#007A55]">
              Get Started
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Let's discuss your needs.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Contact us to ask questions about this service and understand
              the next steps.
            </p>

            <Link
              to="/contact"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 py-3.5 font-semibold text-white transition hover:bg-[#006447]"
            >
              Send an Enquiry <ArrowRight size={18} />
            </Link>

            <Link
              to="/services"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#007A55]"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
