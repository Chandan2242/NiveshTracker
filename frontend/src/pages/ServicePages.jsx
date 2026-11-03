
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
} from "lucide-react";

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
    slug: "tax-consultancy",
    title: "Tax Consultancy",
    short: "Make informed decisions about tax planning.",
    description:
      "Understand tax planning, applicable deductions and tax-related requirements to organise your finances more effectively.",
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
    slug: "insurance",
    title: "Insurance",
    short: "Explore protection options for life's uncertainties.",
    description:
      "Learn about insurance options and understand how protection planning may help safeguard your family and financial goals.",
    icon: ShieldCheck,
    tag: "Protection",
    benefits: [
      "Understand life and health insurance",
      "Review coverage needs",
      "Learn about premiums and policy terms",
      "Understand exclusions and claim conditions",
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
  {
    slug: "estate-planning",
    title: "Estate Planning",
    short: "Plan how your assets may be managed and transferred.",
    description:
      "Understand the basics of wills, nominations and succession planning to help organise your assets and communicate your wishes.",
    icon: House,
    tag: "Legacy Planning",
    benefits: [
      "Understand the purpose of a will",
      "Review nominations and asset records",
      "Organise important financial documents",
      "Learn about succession planning",
    ],
  },
];

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
    title: "Tax Planning",
    description:
      "Learn about tax-related financial planning and applicable provisions.",
    icon: FileCheck,
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
  {
    title: "Estate Planning",
    description:
      "Learn how wills, nominations and asset planning work.",
    icon: Building2,
  },
];

function PageHero({ eyebrow, title, description }) {
  return (
    <section className="bg-[#f2f8f7] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D7A89]">
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
            className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#306673]"
          >
            Make an Enquiry <ArrowRight size={18} />
          </Link>

          <Link
            to="/financial-calculator"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-[#3D7A89] hover:text-[#3D7A89]"
          >
            Financial Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/40 hover:shadow-xl sm:p-7">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3D7A89]/10 text-[#3D7A89] transition group-hover:bg-[#3D7A89] group-hover:text-white">
        <Icon size={27} />
      </div>

      <span className="mt-5 text-xs font-bold uppercase tracking-wider text-[#3D7A89]">
        {service.tag || "Financial Service"}
      </span>

      <h2 className="mt-2 text-xl font-bold text-slate-900">
        {service.title}
      </h2>

      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {service.short || service.description}
      </p>

      <Link
to={service.slug ? `/${service.slug}` : "/services"}        className="mt-6 inline-flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-bold text-[#3D7A89]"
      >
        Explore Service
        <ArrowRight
          size={17}
          className="transition group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}

export function AllServices() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Financial Solutions for Your Life Goals"
        description="Explore financial planning, investment education and other services designed to help you make informed financial decisions."
      />

      <section className="bg-[#f8faf9] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
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


export default function ServiceDetail() {
  const location = useLocation();

  const slug = location.pathname.replace("/", "");

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
          className="mt-6 inline-flex rounded-xl bg-[#3D7A89] px-6 py-3 font-semibold text-white"
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

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3D7A89]/10 text-[#3D7A89]">
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
                    className="mt-1 shrink-0 text-[#3D7A89]"
                  />
                  <p className="leading-7 text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-[#f7faf9] p-7 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-[#3D7A89]">
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
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D7A89] px-5 py-3.5 font-semibold text-white"
            >
              Send an Enquiry <ArrowRight size={18} />
            </Link>

            <Link
              to="/services"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#3D7A89]"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
