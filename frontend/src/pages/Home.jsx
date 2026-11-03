

import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BriefcaseBusiness,
  LockKeyhole,
  Handshake,
  ChartNoAxesCombined,
  Landmark,
  HeartPulse,
  Wallet,
  PiggyBank,
  ReceiptText,
  Building2,
  Target,
  BadgeCheck,
  ChevronRight,
  Menu,
  BookOpenCheck ,
  Sparkles,
  Calculator,
  CircleDollarSign,
  BookOpen,
  Search,
  Clock3,
  Users,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  Lightbulb,
  Smartphone,
  Layers3,
  Globe2,
} from "lucide-react";

import { useState } from "react";
import homeimg from "../assets/homeimg.webp";
import TrustImg from "../assets/Trust-Img.webp";



const services = [
  {
    number: "01",
    title: "PMS",
    tag: "Portfolio Management",
    description:
      "Professionally managed, concentrated portfolios for investors looking beyond traditional mutual funds.",
    icon: BriefcaseBusiness,
    path: "/pms",
  },
  {
    number: "02",
    title: "AIF",
    tag: "Alternative Investments",
    description:
      "Explore Category I, II and III Alternative Investment Funds through our empanelled fund managers.",
    icon: Layers3,
    path: "/aif",
  },
  {
    number: "03",
    title: "SIF",
    tag: "Specialised Investment",
    description:
      "Discover SEBI's newer investment category positioned between mutual funds and PMS, with a ₹10 lakh minimum investment.",
    icon: TrendingUp,
    path: "/sif",
  },
  {
    number: "04",
    title: "Insurance",
    tag: "Protection & Security",
    description:
      "Explore life, health and general insurance options through our registered insurer panel.",
    icon: ShieldCheck,
    path: "/insurance",
  },
  {
    number: "05",
    title: "Tax Planning",
    tag: "Tax & Wealth",
    description:
      "Get general tax-planning inputs alongside your investments to make more informed financial decisions.",
    icon: Calculator,
    path: "/tax-planning",
  },
  {
    number: "06",
    title: "Estate Planning",
    tag: "Legacy Planning",
    description:
      "Plan how your assets and wealth can be structured and transferred with support from a legal partner.",
    icon: Landmark,
    path: "/estate-planning",
  },
  {
    number: "07",
    title: "GIFT City Investing",
    tag: "Global Investments",
    description:
      "Explore global market access through GIFT City's IFSC with the support of a designated partner.",
    icon: Globe2,
    path: "/gift-city-investing",
  },
];
const differentiators = [
  {
    icon: ShieldCheck,
    title: "Fiduciary Responsibility",
    description:
      "We aim to put clients' financial interests first with transparent, responsible guidance.",
  },
  {
    icon: Search,
    title: "Industry Expertise",
    description:
      "Make informed decisions with structured research and financial-market insights.",
  },
  {
    icon: LockKeyhole,
    title: "Methodological Approach",
    description:
      "A disciplined approach to financial planning, risk awareness and portfolio reviews.",
  },
  {
    icon: Handshake,
    title: "Transparency & Trust",
    description:
      "Understand the process, associated charges and the risks involved before investing.",
  },
];

const strategies = [
  {
    icon: TrendingUp,
    title: "Wealth Creation",
    description: "Build long-term wealth through disciplined financial planning.",
  },
  {
    icon: CircleDollarSign,
    title: "Tax Saving",
    description: "Explore tax-planning options based on your circumstances.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Mutual Funds",
    description: "Understand diversified investment options and their risks.",
  },
  {
    icon: Search,
    title: "Equity Investments",
    description: "Research opportunities while considering risk and time horizon.",
  },
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Work towards a retirement plan aligned with your goals.",
  },
  {
    icon: Landmark,
    title: "FD & Bonds",
    description: "Learn about fixed-income products and their features.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description: "Understand diversification and how it relates to investment risk.",
  },
  {
    icon: Sparkles,
    title: "Financial Growth",
    description: "Create a financial roadmap with clear priorities and milestones.",
  },
];

const articles = [
  {
    category: "INVESTING ESSENTIALS",
    title: "Factors to Consider When Selecting an Investment Manager",
    description:
      "Understand experience, transparency, investment philosophy and risk management before choosing an investment professional.",
    icon: BookOpen,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    category: "PORTFOLIO MANAGEMENT",
    title: "Build a Portfolio Around Your Financial Goals",
    description:
      "Learn how time horizon, diversification and risk tolerance can shape a financial plan.",
    icon: ChartNoAxesCombined,
    color: "bg-blue-50 text-blue-700",
  },
  {
    category: "FUNDAMENTAL ANALYSIS",
    title: "Understand the Basics of Investment Research",
    description:
      "Explore financial strength, business performance and important factors to review before investing.",
    icon: Search,
    color: "bg-violet-50 text-violet-700",
  },
  {
    category: "FINANCIAL LEARNING",
    title: "Build Your Financial Knowledge",
    description:
      "Develop practical knowledge of investing, financial planning and wealth management.",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-700",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function SectionLink({ href = "/contact", children = "Read More" }) {
  return (
    <a
      href={href}
      className="group/link inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-900"
    >
      {children}
      <ArrowRight
        size={17}
        className="transition-transform group-hover/link:translate-x-1"
      />
    </a>
  );
}

function Home() {
  return (
    <div className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate bg-[#f3faf6]">
        <div className="absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-800 shadow-sm sm:text-sm">
              <Sparkles size={16} />
              YOUR PARTNER IN FINANCIAL GROWTH
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Investment
              <span className="block text-emerald-700">Manager</span>
              <span className="mt-2 block text-2xl leading-snug text-slate-600 sm:text-3xl">
                Your future deserves a smarter plan.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Transforming the way you plan, invest and grow. Discover
              thoughtful financial planning designed around your goals,
              values and long-term future.
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Invest Now <ArrowRight size={19} />
              </a>
              <a
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-800"
              >
                Discover More <ChevronRight size={18} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-700" />
                Client-focused approach
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-700" />
                Goal-based planning
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <img
              src={homeimg}
              alt="NiveshTrack financial planning"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}

     
{/* WHY TRUST US SECTION */}


{/* Mutual Funds - The Easy Way Section */}
{/* Mutual Funds - The Easy Way Section */}
<section className="relative isolate overflow-hidden bg-[#f3faf6] py-16 sm:py-20 lg:py-24">

  {/* Background Glow - Keep Same Hero Gradient */}
  <div className="pointer-events-none absolute -right-24 -bottom-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

  <div className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />

  {/* Main Container */}
  <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

    {/* Left: Original Family Financial Image */}
    <div className="relative mx-auto w-full max-w-xl">

      <div className="absolute -left-5 -top-5 h-28 w-28 rounded-2xl bg-[#3D7A89]/20 sm:-left-6 sm:-top-6" />

      <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-2xl bg-emerald-200/50 sm:-bottom-6 sm:-right-6" />

      <img
        src={TrustImg}
        alt="Family financial planning and future goals"
        className="relative z-10 block h-[420px] w-full rounded-3xl object-cover shadow-2xl sm:h-[520px] lg:h-[580px]"
        loading="lazy"
      />
    </div>

    {/* Right: Mutual Funds Content */}
    <div className="relative">

      {/* Small Label */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#007A55]">
          Simple. Smart. Transparent.
        </span>

        <span className="h-px w-12 bg-[#3D7A89]" />
      </div>

      {/* Heading */}
      <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        Mutual funds,
        <br />
        <span className="text-[#007A55]">the easy way.</span>
      </h2>

      {/* Subheading */}
      <p className="mt-6 text-lg font-semibold leading-8 text-slate-800 sm:text-xl">
        Start your SIP from home — track every rupee of it in one ledger.
      </p>

      {/* Description */}
      <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
        Nivesh Track, a brand of Cadence Finserve Private Limited, has
        been an AMFI-registered Mutual Fund Distributor since 2019
        (ARN-165724). Beyond mutual funds, we also connect you to PMS,
        AIF, SIF, insurance, tax planning, estate planning and GIFT City
        investing through our relationship managers and partners.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-4">

        <a
          href="/register"
          className="group inline-flex items-center gap-2 rounded-xl bg-[#007A55] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#3D7A89]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 sm:text-base"
        >
          Start your SIP

          <ArrowRight
            size={19}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        <a
          href="/services"
          className="inline-flex items-center gap-2 rounded-xl border border-[#3D7A89]/30 bg-white/70 px-7 py-4 text-sm font-bold text-[] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 sm:text-base"
        >
          See other services
          <ArrowRight size={19} />
        </a>

      </div>

      {/* New Investor Note */}
      <div className="mt-9 flex items-start gap-4 rounded-2xl border border-[#3D7A89]/15 bg-white/70 p-5 shadow-sm backdrop-blur-sm">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3D7A89]/10 text-[#7FAFA1]">
          <Smartphone size={25} />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            New to investing?
          </h3>

          <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
            Complete KYC and your first SIP from the app — no branch visit needed.
          </p>
        </div>

      </div>

    </div>

  </div>
</section>





       {/* WHY TRUST US */}
      


<section className="relative isolate overflow-hidden bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

  {/* Top Right - Emerald Green Glow */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"
  />

  {/* Bottom Left - Teal Green Glow */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl"
  />

  {/* Main Container */}
  <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

    {/* Left Content */}
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D7A89]">
        Trusted by investors
      </p>

      <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        Why Trust Us?
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-600">
        NiveshTrack is committed to transparent, data-informed and
        client-centric investment solutions. Our approach puts your
        financial well-being, informed decisions and long-term goals
        at the centre of the planning process.
      </p>

      <p className="mt-4 text-sm leading-7 text-slate-500">
        Every investment has risks. We believe that clear information,
        appropriate planning and an understanding of those risks are
        essential to making informed choices.
      </p>

      <div className="mt-7">
        <SectionLink href="/about-us">Know More</SectionLink>
      </div>
    </div>

    {/* Right: Four Green Cards */}
    <div className="grid gap-4 sm:grid-cols-2">
      {differentiators.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.title}
            className="group rounded-2xl border border-emerald-100/80 bg-emerald-50/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-100/70 hover:shadow-xl hover:shadow-emerald-900/5"
          >
            <div className="inline-flex rounded-xl border border-white/80 bg-white/80 p-3 text-[#3D7A89] shadow-sm transition duration-300 group-hover:bg-[#3D7A89] group-hover:text-white">
              <Icon size={24} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        );
      })}
    </div>

  </div>
</section>




      {/* SERVICES */}
      {/* Beyond Mutual Funds - Services Section */}
<section className="relative isolate overflow-hidden bg-[#f7faf8] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

  {/* Top Left - Teal Green Glow */}
  <div
    className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl"
  />

  {/* Bottom Right - Emerald Green Glow */}
  <div
    className="pointer-events-none absolute -right-24 -bottom-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"
  />

  <div className="relative z-10 mx-auto max-w-[1440px]">

    {/* Section Heading */}
    <SectionHeading
      eyebrow="Beyond Mutual Funds"
      title="The Rest of Your Financial Life — One Message Away."
      description="We're primarily a mutual fund distributor. For these services, we connect you with the right registered partner or specialist. Leave your details and a relationship manager will reach out."
    />

    {/* Service Cards */}
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {services.map((service) => {
        const Icon = service.icon;

        return (
          <article
            key={service.title}
            className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 sm:p-7"
          >

            {/* Card Top */}
            <div className="flex items-start justify-between gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                <Icon size={27} />
              </div>

              <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                {service.tag}
              </span>

            </div>

            {/* Number */}
            <p className="mt-6 text-xs font-bold tracking-[0.2em] text-emerald-700">
              {service.number}
            </p>

            {/* Title */}
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {service.title}
            </h3>

            {/* Description */}
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
              {service.description}
            </p>

            {/* Redirect Link */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <SectionLink href={service.path}>
                Read More
              </SectionLink>
            </div>

          </article>
        );
      })}

    </div>

  </div>
</section>

      {/* STRATEGIES */}
    

{/* STRATEGIES */}

{/* STRATEGIES SECTION */}
<section className="relative isolate overflow-hidden bg-[#f7faf8] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

  {/* Top Right - Emerald Green Glow */}
  <div
    className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"
  />

  {/* Bottom Left - Teal Green Glow */}
  <div
    className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl"
  />

  <div className="relative z-10 mx-auto max-w-7xl">

    {/* Section Heading */}
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#3D7A89]">
        Our Investment Approach
      </p>

      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        Strategies Designed Around
        <span className="block text-[#3D7A89]">Your Financial Goals</span>
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-600">
        Explore a thoughtful approach to wealth creation, investment
        planning and financial protection for every stage of life.
      </p>
    </div>

    {/* Main Strategy Layout */}
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_300px_1fr] lg:gap-8">

      {/* LEFT FOUR CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">

        {strategies.slice(0, 4).map((strategy, index) => {
          const Icon = strategy.icon;

          return (
            <article
              key={strategy.title}
              className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_8px_30px_rgba(35,90,75,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/40 hover:shadow-xl hover:shadow-[#3D7A89]/10 sm:p-6"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-[#3D7A89] transition-all duration-300 group-hover:w-1.5" />

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F4EF] text-[#3D7A89] transition-all duration-300 group-hover:bg-[#3D7A89] group-hover:text-white">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-800 transition group-hover:text-[#3D7A89] sm:text-lg">
                    {strategy.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {strategy.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#3D7A89] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span>Explore strategy</span>
                <ArrowRight size={14} />
              </div>
            </article>
          );
        })}

      </div>

      {/* CENTER ANIMATED CIRCLE */}
      <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center">

        {/* Outer Animated Ring */}
        <div className="absolute inset-0 animate-[spin_22s_linear_infinite] rounded-full border border-dashed border-[#3D7A89]/35" />

        {/* Middle Ring */}
        <div className="absolute inset-4 animate-pulse rounded-full border border-[#3D7A89]/25" />

        {/* Glow */}
        <div className="absolute inset-8 rounded-full bg-[#3D7A89]/15 blur-2xl" />

        {/* Main Circle */}
        <div className="relative flex h-52 w-52 flex-col items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#3D7A89] via-[#397F82] to-[#65AAA0] text-center text-white shadow-[0_20px_55px_rgba(61,122,137,0.30)] transition-transform duration-500 hover:scale-105 sm:h-60 sm:w-60">

          {/* Animated Shine */}
          <div className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-transparent" />

          <div className="relative z-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm">
              <ChartNoAxesCombined size={27} />
            </div>

            <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              Investment
              <span className="block">Strategies</span>
            </h3>

            <p className="mt-3 text-xs font-medium tracking-wide text-white/85">
              Plan • Invest • Grow
            </p>
          </div>
        </div>

        {/* Floating Dots */}
        <span className="absolute right-5 top-8 h-3 w-3 animate-ping rounded-full bg-[#3D7A89]/60" />
        <span className="absolute bottom-8 left-5 h-3 w-3 animate-pulse rounded-full bg-emerald-500" />

      </div>

      {/* RIGHT FOUR CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">

        {strategies.slice(4, 8).map((strategy, index) => {
          const Icon = strategy.icon;

          return (
            <article
              key={strategy.title}
              className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_8px_30px_rgba(35,90,75,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#3D7A89]/40 hover:shadow-xl hover:shadow-[#3D7A89]/10 sm:p-6"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-[#3D7A89] transition-all duration-300 group-hover:w-1.5" />

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F4EF] text-[#3D7A89] transition-all duration-300 group-hover:bg-[#3D7A89] group-hover:text-white">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-800 transition group-hover:text-[#3D7A89] sm:text-lg">
                    {strategy.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {strategy.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#3D7A89] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span>Explore strategy</span>
                <ArrowRight size={14} />
              </div>
            </article>
          );
        })}

      </div>

    </div>

    {/* Bottom CTA */}
    <div className="mt-14 text-center">
      <a
        href="/contact"
        className="inline-flex items-center gap-2 rounded-xl bg-[#3D7A89] px-7 py-4 font-bold text-white shadow-lg shadow-[#3D7A89]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#2F6572]"
      >
        Discuss Your Financial Goals
        <ArrowRight size={18} />
      </a>
    </div>

  </div>
</section>




      {/* FEATURED INVESTMENT SECTION
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-emerald-800 text-white lg:grid-cols-2">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
              Investment insights
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Invest in Your Money with Knowledge
            </h2>
            <p className="mt-5 leading-8 text-emerald-50/90">
              Learn about investment products, compare available options and
              understand the role of risk in building a long-term financial
              plan.
            </p>
            <div className="mt-8">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                Read More <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-emerald-700 p-8 sm:min-h-80">
            <div className="absolute h-64 w-64 rounded-full border border-white/15" />
            <div className="absolute h-48 w-48 rounded-full border border-white/20" />
            <div className="absolute h-32 w-32 rounded-full border border-white/25" />
            <div className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-white/15 p-3">
                  <ChartNoAxesCombined size={28} />
                </div>
                <Sparkles size={22} className="text-emerald-200" />
              </div>
              <p className="mt-6 text-sm text-emerald-100">
                Your investment journey
              </p>
              <h3 className="mt-2 text-2xl font-bold">Knowledge first.</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/90">
                Understand your options before making financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ARTICLES */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                Knowledge centre
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Learn. Understand. Invest.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Helpful resources to strengthen your financial understanding.
              </p>
            </div>
            <SectionLink href="/blog">View All Articles</SectionLink>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => {
              const Icon = article.icon;
              return (
                <article
                  key={article.title}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${article.color}`}>
                    <Icon size={27} />
                  </div>
                  <p className="mt-5 text-[10px] font-bold tracking-[0.13em] text-emerald-700">
                    {article.category}
                  </p>
                  <h3 className="mt-3 text-lg font-bold leadinwg-snug">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {article.description}
                  </p>
                  <div className="mt-5">
                    <SectionLink href="/blog">Read More</SectionLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Portfolio overview
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              See Your Financial Picture More Clearly
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              A financial dashboard can help you organize your investments,
              review progress and keep your goals in sight. Connect your
              portfolio data when account integration becomes available.
            </p>
            <div className="mt-7">
              <SectionLink href="/login">View Portfolio</SectionLink>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Portfolio preview</p>
                <h3 className="mt-1 text-xl font-bold">Investment Summary</h3>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <ChartNoAxesCombined size={24} />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Example portfolio value</p>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                ₹32,75,000
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Illustrative sample figure only, not actual investor data or
                a return forecast.
              </p>

              <div className="mt-6 flex h-28 items-end gap-2">
                {[38, 43, 35, 52, 48, 65, 57, 74, 69, 86, 80, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className={`flex-1 rounded-t-md ${index === 11 ? "bg-emerald-800" : "bg-emerald-400"
                        }`}
                      style={{ height: `${height}%` }}
                    />
                  )
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-xs text-slate-500">Investment tracking</p>
                <p className="mt-2 font-bold">Organize holdings</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-xs text-slate-500">Financial planning</p>
                <p className="mt-2 font-bold">Review goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET INSIGHTS */}
      <section className="bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
              <TrendingUp size={17} />
              Market insights
            </div>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Smart Investing,
              <span className="block text-emerald-700">Simplified</span>
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Explore goal-based financial planning, learn about investment
              choices and make decisions with a better understanding of
              potential risks and opportunities.
            </p>
            <div className="mt-7">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white transition hover:bg-emerald-800"
              >
                Get Started <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700 w-fit">
                <ChartNoAxesCombined size={25} />
              </div>
              <p className="mt-5 text-2xl font-bold sm:text-3xl">Plan</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Set clear financial goals.
              </p>
            </div>
            <div className="mt-8 rounded-2xl bg-slate-950 p-5 text-white shadow-sm sm:p-7">
              <div className="w-fit rounded-xl bg-white/10 p-3 text-emerald-300">
                <ShieldCheck size={25} />
              </div>
              <p className="mt-5 text-2xl font-bold sm:text-3xl">Protect</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Understand risk and diversification.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-700 p-5 text-white shadow-sm sm:p-7">
              <div className="w-fit rounded-xl bg-white/10 p-3 text-emerald-200">
                <Target size={25} />
              </div>
              <p className="mt-5 text-2xl font-bold sm:text-3xl">Progress</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50">
                Review your goals regularly.
              </p>
            </div>
            <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm sm:p-7">
              <div className="w-fit rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <BookOpen size={25} />
              </div>
              <p className="mt-5 text-2xl font-bold sm:text-3xl">Learn</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT CALCULATOR */}
      <CalculatorSection />

      {/* STATISTICS */}
      {/* Getting Started Section */}
{/* Getting Started Section */}
<section className="relative isolate overflow-hidden bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

  {/* Same Hero Gradient - Top Right */}
  <div className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

  {/* Same Hero Gradient - Bottom Left */}
  <div className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-[1440px]">

    {/* Heading */}
    <div className="mx-auto max-w-2xl text-center">

      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#007A55]">
        Getting Started
      </p>

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        Four Entries to Your First SIP.
      </h2>

      <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
        Start your investment journey with a simple digital process.
        From registration to tracking, everything is designed to be easy.
      </p>

    </div>

    {/* Four Steps */}
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {[
        {
          number: "01",
          title: "Download & register",
          description:
            "Get the app and sign up with your PAN and mobile number.",
          icon: Smartphone,
        },
        {
          number: "02",
          title: "Complete self-serve e-KYC",
          description:
            "Verify identity digitally on our onboarding platform, in line with SEBI KYC norms.",
          icon: ShieldCheck,
        },
        {
          number: "03",
          title: "Explore & invest",
          description:
            "Pick a scheme yourself, or start from our shortlist, then start a SIP.",
          icon: TrendingUp,
        },
        {
          number: "04",
          title: "Track in one place",
          description:
            "Your passbook updates as transactions settle.",
          icon: BookOpenCheck,
        },
      ].map((item) => {

        const Icon = item.icon;

        return (
          <article
            key={item.number}
            className="group flex h-full flex-col rounded-2xl border border-emerald-100 bg-[#EDFCF4] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10 sm:p-7"
          >

            {/* Number & Icon */}
            <div className="flex items-center justify-between">

              <span className="text-sm font-extrabold tracking-[0.2em] text-[#007A55]">
                ENTRY {item.number}
              </span>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#007A55]/10 text-[#007A55] transition-all duration-300 group-hover:bg-[#007A55] group-hover:text-white">
                <Icon size={27} />
              </div>

            </div>

            {/* Content */}
            <h3 className="mt-7 text-xl font-bold leading-snug text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
              {item.description}
            </p>

            {/* Bottom Accent */}
            <div className="mt-7 h-1 w-12 rounded-full bg-[#007A55] transition-all duration-300 group-hover:w-20" />

          </article>
        );
      })}

    </div>

    {/* CTA */}
    <div className="mt-12 text-center">

      <a
        href="/register"
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#007A55] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#007A55]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#006447] sm:text-base"
      >
        Start Your SIP
        <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>

    </div>

  </div>
</section>

      {/* WEALTH CREATION */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Plan for tomorrow"
            title="Start Your Financial Journey"
            description="Create a financial plan that reflects your priorities, supports your goals and adapts as life changes."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                number: "01",
                title: "Wealth Growth",
                text: "Explore long-term financial strategies suited to your goals and risk tolerance.",
              },
              {
                icon: PiggyBank,
                number: "02",
                title: "Financial Planning",
                text: "Bring your savings, future expenses and priorities into a clearer plan.",
              },
              {
                icon: ShieldCheck,
                number: "03",
                title: "Secure Future",
                text: "Prepare for life's milestones with informed decisions and regular reviews.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">
                      <Icon size={27} />
                    </div>
                    <span className="text-3xl font-bold text-slate-100">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                  <div className="mt-6">
                    <SectionLink href="/contact">Read More</SectionLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNERS PLACEHOLDER */}
      <section className="border-y border-slate-100 bg-slate-50 px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 sm:text-sm">
            Trusted partners
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Associate Partners
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Partner logos can be displayed here once the approved partner
            names and brand assets are available.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Financial Planning", "Investment Research", "Client Support"].map(
              (label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600"
                >
                  <CheckCircle2 size={17} className="text-emerald-700" />
                  {label}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-800 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-10 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-200">
              <Sparkles size={28} />
            </div>
            <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Let's Start Investing Now
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
              Take the first step towards a more organized financial future.
              Connect with our team to learn about your options.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                Get Started <ArrowRight size={18} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                <Mail size={18} /> Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-5 pb-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl border border-amber-200/70 bg-amber-50 p-5 sm:p-6">
          <p className="text-sm font-bold text-slate-800">
            Important investment disclaimer
          </p>
          <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
            Mutual fund investments are subject to market risks. Please read
            all scheme-related documents carefully before investing. Past
            performance is not indicative of future returns. Investment
            values may rise or fall, and returns are not guaranteed. Consider
            your financial objectives and risk tolerance before making
            investment decisions. Product availability, eligibility and
            applicable terms should be independently verified.
          </p>
        </div>
      </section>
    </div>
  );
}

function CalculatorSection() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(12);


  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  const invested = monthlyInvestment * months;

  const estimatedValue =
    monthlyRate === 0
      ? invested
      : monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

  const formatRupees = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Investment calculator
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Estimate Your Future Investment Value
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Adjust your monthly contribution, time period and assumed annual
            return to explore how regular investing could grow over time.
          </p>

          <div className="mt-8 space-y-7">
            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="monthlyInvestment" className="text-sm font-semibold text-slate-700">
                  Monthly investment
                </label>
                <span className="font-bold text-emerald-800">
                  {formatRupees(monthlyInvestment)}
                </span>
              </div>
              <input
                id="monthlyInvestment"
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvestment}
                onChange={(event) =>
                  setMonthlyInvestment(Number(event.target.value))
                }
                className="mt-4 w-full accent-emerald-700"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="investmentYears" className="text-sm font-semibold text-slate-700">
                  Investment period
                </label>
                <span className="font-bold text-emerald-800">
                  {years} years
                </span>
              </div>
              <input
                id="investmentYears"
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(event) => setYears(Number(event.target.value))}
                className="mt-4 w-full accent-emerald-700"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>1 year</span>
                <span>40 years</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="annualRate" className="text-sm font-semibold text-slate-700">
                  Assumed annual return
                </label>
                <span className="font-bold text-emerald-800">
                  {annualRate}%
                </span>
              </div>
              <input
                id="annualRate"
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={annualRate}
                onChange={(event) => setAnnualRate(Number(event.target.value))}
                className="mt-4 w-full accent-emerald-700"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-9">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3 text-emerald-300">
              <Calculator size={25} />
            </div>
            <div>
              <p className="text-sm text-slate-300">Estimated future value</p>
              <h3 className="mt-1 text-3xl font-bold sm:text-4xl">
                {formatRupees(estimatedValue)}
              </h3>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="text-sm text-slate-300">
                Total amount invested
              </span>
              <span className="font-bold">{formatRupees(invested)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="text-sm text-slate-300">
                Illustrative growth
              </span>
              <span className="font-bold text-emerald-300">
                {formatRupees(Math.max(0, estimatedValue - invested))}
              </span>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>Invested amount</span>
                <span>Estimated growth</span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="bg-emerald-400"
                  style={{
                    width: `${estimatedValue > 0
                        ? Math.min(100, (invested / estimatedValue) * 100)
                        : 100
                      }%`,
                  }}
                />
                <div className="flex-1 bg-lime-300" />
              </div>
            </div>
          </div>

          <p className="mt-7 text-xs leading-6 text-slate-400">
            This calculator provides an illustrative estimate using a
            simplified monthly-compounding formula. Actual investment
            performance, taxes, fees and market conditions may differ.
            Returns are not guaranteed and this is not investment advice.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
