
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  CarFront,
  House,
  Plane,
  Users,
  Wallet,
  FileCheck,
  Umbrella,
  Clock,
  CheckCircle2,
  HeartHandshake,
  BadgeCheck,
  Shield,
  PiggyBank,
  BriefcaseBusiness,
} from "lucide-react";

const insuranceTypes = [
  {
    icon: HeartPulse,
    title: "Life Insurance",
    description:
      "Help provide financial security for your family and support their future needs if you are no longer there.",
    tag: "Family Protection",
  },
  {
    icon: HeartHandshake,
    title: "Health Insurance",
    description:
      "Manage eligible medical expenses, hospitalization costs, and covered treatments according to your policy.",
    tag: "Health Protection",
  },
  {
    icon: CarFront,
    title: "Motor Insurance",
    description:
      "Protect against covered vehicle damage, accidents, and third-party liabilities as per your policy.",
    tag: "Vehicle Protection",
  },
  {
    icon: House,
    title: "Home Insurance",
    description:
      "Help protect your home and belongings against covered events such as fire, theft, and specified natural disasters.",
    tag: "Property Protection",
  },
  {
    icon: Plane,
    title: "Travel Insurance",
    description:
      "Get support for covered travel risks, which may include medical emergencies, trip interruption, or lost baggage.",
    tag: "Travel Protection",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Financial Security",
    description:
      "Reduce the financial impact of covered unexpected events on you and your family.",
  },
  {
    icon: Users,
    title: "Flexible Coverage",
    description:
      "Explore coverage options according to your family, lifestyle, and financial responsibilities.",
  },
  {
    icon: PiggyBank,
    title: "Tax Considerations",
    description:
      "Understand whether your eligible insurance premiums qualify for tax benefits under applicable rules.",
  },
  {
    icon: Umbrella,
    title: "Comprehensive Protection",
    description:
      "Consider suitable policies for health, life, travel, vehicles, and property-related risks.",
  },
  {
    icon: FileCheck,
    title: "Claims Assistance",
    description:
      "Understand policy documentation, claim requirements, and the steps involved in filing a claim.",
  },
  {
    icon: Clock,
    title: "Peace of Mind",
    description:
      "Plan ahead so you can focus on life's priorities with a better understanding of your protection.",
  },
];

const reasons = [
  {
    title: "Protection Against Financial Loss",
    description:
      "Insurance can help cover eligible losses and reduce the burden of unexpected expenses.",
  },
  {
    title: "Legal Requirements",
    description:
      "Some policies, such as third-party motor insurance in India, are legally required.",
  },
  {
    title: "Protection for Lenders",
    description:
      "Certain policies can help protect financial interests connected with loans or secured assets.",
  },
  {
    title: "Business Risk Management",
    description:
      "Suitable business insurance may help manage specified operational and liability risks.",
  },
  {
    title: "Family Security",
    description:
      "Appropriate life and health coverage can help protect your family's financial plans.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#3D7A89]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default function Insurance() {
  return (
    <div className="overflow-hidden bg-white text-slate-800">
      {/* HERO SECTION */}
      <section className="relative isolate bg-[#102D38]">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#3D7A89]/30 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-700/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-teal-100">
              <ShieldCheck size={17} />
              Protection for Every Milestone
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Insurance Plans for{" "}
              <span className="text-[#8CD0D5]">Every Stage of Life</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Insurance helps manage financial risks by providing coverage for
              eligible losses arising from unexpected events. Explore
              protection options for your health, family, property, and travel.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#insurance-types"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-6 py-3.5 font-semibold text-white transition hover:bg-[#326674]"
              >
                Explore Insurance <ArrowRight size={18} />
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
                <p className="font-semibold text-white">Protect What Matters</p>
                <p className="mt-1 text-sm text-slate-400">
                  Plan for life's uncertainties
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Choose with Clarity</p>
                <p className="mt-1 text-sm text-slate-400">
                  Understand your coverage
                </p>
              </div>
            </div>
          </div>

          {/* HERO PROTECTION CARD */}
          <div className="mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">
                    Your protection checklist
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Cover What Matters
                  </h2>
                </div>
                <div className="rounded-2xl bg-[#3D7A89]/30 p-3 text-[#A6E4E5]">
                  <Shield size={28} />
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  {
                    icon: HeartPulse,
                    title: "Health & Wellbeing",
                    subtitle: "Consider medical protection",
                  },
                  {
                    icon: Users,
                    title: "Family & Loved Ones",
                    subtitle: "Plan for future responsibilities",
                  },
                  {
                    icon: House,
                    title: "Home & Assets",
                    subtitle: "Review property protection needs",
                  },
                  {
                    icon: Plane,
                    title: "Travel & Lifestyle",
                    subtitle: "Prepare for covered travel risks",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3D7A89]/25 text-[#A6E4E5]">
                        <Icon size={23} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>
                      <CheckCircle2
                        size={20}
                        className="ml-auto shrink-0 text-[#8CD0D5]"
                      />
                    </div>
                  );
                })}
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-400">
                Coverage, exclusions, waiting periods, and claim conditions
                depend on the policy selected.
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
              Investment Solutions
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Protect Your Future with{" "}
              <span className="text-[#3D7A89]">
                Thoughtful Insurance Planning
              </span>
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Insurance policies help manage the financial impact of specified
              risks, including accidents, illnesses, property damage, and
              unexpected events. The right coverage depends on your needs,
              responsibilities, budget, and the terms of the policy.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Reviewing your protection needs regularly can help you identify
              coverage gaps and make more informed decisions as your life
              circumstances change.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-[#3D7A89] hover:text-[#285b67]"
            >
              Discuss Your Insurance Needs <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-[#EDF6F5] p-6 sm:p-8">
              <HeartPulse size={30} className="text-[#3D7A89]" />
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Health Protection
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review health coverage for eligible medical expenses.
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 p-6 sm:p-8">
              <Users size={30} className="text-[#3D7A89]" />
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Family Security
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Consider the financial needs of your dependants.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6 sm:p-8">
              <House size={30} className="text-[#3D7A89]" />
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Asset Protection
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore protection for your home and belongings.
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-[#102D38] p-6 text-white sm:p-8">
              <BadgeCheck size={30} className="text-[#8CD0D5]" />
              <h3 className="mt-5 text-lg font-bold">
                Informed Decisions
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Understand premiums, exclusions, and policy terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TYPES OF INSURANCE */}
      <section
        id="insurance-types"
        className="scroll-mt-28 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Types of Insurance"
            title="Explore Insurance for Your Needs"
            description="Insurance can help you prepare for different risks throughout life. Explore the main categories and consider which types of protection are relevant to you."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insuranceTypes.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/50 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDF6F5] text-[#3D7A89] transition group-hover:bg-[#3D7A89] group-hover:text-white">
                      <Icon size={27} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3D7A89] transition hover:gap-3"
                  >
                    Know More <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY INSURANCE IS REQUIRED */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#3D7A89]">
              Why Insurance Matters
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Prepare for the Unexpected
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Unexpected events can affect savings, family plans, and business
              finances. Suitable insurance can help reduce the impact of
              covered risks and support your broader financial plan.
            </p>
            <div className="mt-7 rounded-2xl bg-[#102D38] p-6 text-white">
              <ShieldCheck size={30} className="text-[#8CD0D5]" />
              <h3 className="mt-4 text-xl font-bold">
                Protection with Purpose
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Choose coverage based on your actual risks, policy conditions,
                affordability, and financial responsibilities.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {reasons.map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 p-5 sm:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF6F5] font-bold text-[#3D7A89]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE BENEFITS */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Insurance Benefits"
            title="Features That Support Your Peace of Mind"
            description="Explore the potential benefits of suitable insurance coverage, from financial protection to support with eligible claims."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF6F5] text-[#3D7A89]">
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

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#102D38] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#8CD0D5]">
            <Umbrella size={29} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#8CD0D5]">
            Your Protection Journey Starts Here
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Let's Plan for a More Secure Tomorrow
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Take the next step toward protecting what matters to you. Discuss
            your needs and explore insurance options that fit your
            circumstances.
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
