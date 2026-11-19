
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BriefcaseBusiness,
  Handshake,
  Landmark,
  ChevronDown,
  Smartphone,
  Layers3,
  Calculator,
  BookOpen,
  Users,
  Globe2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import homeimg from "../assets/homeimg.webp";
import TrustImg from "../assets/Trust-Img.webp";

// App Store Links
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.niveshtrack.niveshtrack&hl=en_IN";

const APPLE_STORE_URL =
  "https://apps.apple.com/in/app/nivesh-track/id6744318014";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwuvkwwUBKdKrCxeOKmGD7mzWnIFuZU3z2gq-ITjLr78CpCV2FitMKPpJJFX7kLoPjZ/exec";

// Apple App Store Logo
function AppleStoreIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.05 12.54c.02 2.02 1.77 2.69 1.79 2.7-.02.05-.28.97-.92 1.92-.55.82-1.13 1.63-2.03 1.65-.88.02-1.16-.53-2.16-.53s-1.31.51-2.14.55c-.86.03-1.52-.89-2.08-1.71-1.13-1.64-1.99-4.64-.83-6.66.57-1.01 1.59-1.65 2.69-1.67.84-.02 1.64.57 2.16.57.51 0 1.48-.71 2.5-.61.43.02 1.65.17 2.43 1.3-.06.04-1.45.85-1.43 2.49ZM15.4 6.92c.45-.54.75-1.3.67-2.05-.65.03-1.43.43-1.9.97-.42.48-.79 1.25-.69 1.98.72.05 1.46-.37 1.92-.9Z" />
    </svg>
  );
}

// Google Play Store Logo
function GooglePlayIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#00D6FF"
        d="M3.2 2.1C2.45 2.5 2 3.3 2 4.3v15.4c0 1 .45 1.8 1.2 2.2L14 12 3.2 2.1Z"
      />
      <path
        fill="#00F076"
        d="m3.2 2.1 12.5 7.2-3.4 2.7L3.2 2.1Z"
      />
      <path
        fill="#FFCF00"
        d="m15.7 9.3 4.1 2.4c1 .6 1 1.5 0 2.1l-4.1 2.4-3.4-4.2 3.4-2.7Z"
      />
      <path
        fill="#FF3A44"
        d="m3.2 21.9 12.5-7.2-3.4-2.7-9.1 9.9Z"
      />
    </svg>
  );
}

// Service metadata
const serviceMeta = {
  PMS: {
    number: "01",
    tag: "Managed portfolios",
    icon: BriefcaseBusiness,
    path: "/pms",
  },
  AIF: {
    number: "02",
    tag: "Category I/II/III funds",
    icon: Layers3,
    path: "/aif",
  },
  SIF: {
    number: "03",
    tag: "SEBI's mid-ticket category",
    icon: TrendingUp,
    path: "/sif",
  },
  Insurance: {
    number: "04",
    tag: "Life, health & general",
    icon: ShieldCheck,
    path: "/insurance",
  },
  "Tax Planning": {
    number: "05",
    tag: "General inputs",
    icon: Calculator,
    path: "/tax-planning",
  },
  "Estate Planning": {
    number: "06",
    tag: "With a legal partner",
    icon: Landmark,
    path: "/estate-planning",
  },
  "GIFT City Investing": {
    number: "07",
    tag: "Via a named partner",
    icon: Globe2,
    path: "/gift-city-investing",
  },
};

const appFeatures = [
  [
    "Self-serve KYC & onboarding",
    "Complete KYC digitally on the Nivesh Track platform — in a few minutes, from anywhere.",
  ],
  [
    "Pick your own scheme, or start from our shortlist",
    "Search and choose independently, or start from a shortlist curated by our investment research desk — the decision is always yours.",
  ],
  [
    "Consolidated portfolio view",
    "Every scheme, folio and SIP across fund houses in one running account.",
  ],
  [
    "Systematic reports",
    "Pull statements and performance reports on your own schedule.",
  ],
  [
    "Goal tracking",
    "Tag investments to a goal and watch progress against it specifically.",
  ],
  [
    "Start and manage SIPs",
    "New SIPs and one-time purchases, right from the app.",
  ],
  [
    "A named relationship manager",
    "One person at Nivesh Track for onboarding, SIP changes and goal-based guidance.",
  ],
];

const faqs = [
  {
    q: "Is Nivesh Track a financial advisor?",
    a: "No. Nivesh Track, a brand of Cadence Finserve Private Limited, is registered with AMFI as a Mutual Fund Distributor (ARN-165724), not as a SEBI Investment Adviser. For mutual funds, your relationship manager can offer basic, goal-based guidance incidental to distribution. For PMS, AIF, SIF, insurance, tax and estate planning, we connect you with the specifically registered specialist for that product.",
  },
  {
    q: "Do I have to be an existing client to use the app?",
    a: "You can explore the app and begin the registration process. Completing the applicable KYC and onboarding requirements is necessary before investing.",
  },
  {
    q: "Can I choose my own mutual fund scheme?",
    a: "Yes. You can independently search and choose a scheme. Any shortlist provided by the investment research desk is only a starting point, not a requirement.",
  },
  {
    q: "What's the difference between a distributor and an RIA?",
    a: "A mutual fund distributor distributes mutual fund schemes and may provide incidental guidance within the applicable regulatory framework. A SEBI-registered Investment Adviser operates under a separate registration and regulatory framework.",
  },
  {
    q: "What is SIF, and who can invest?",
    a: "Specialised Investment Funds are a SEBI-regulated category. Eligibility, minimum investment and scheme terms depend on the applicable regulations and individual scheme documents.",
  },
  {
    q: "What is GIFT City investing?",
    a: "GIFT City is an international financial services centre in India. Investment access depends on the product, eligibility and the relevant registered partner.",
  },
  {
    q: "Is my insurance or investment amount guaranteed by Nivesh Track?",
    a: "No. Investments are subject to market risks and insurance benefits depend on policy terms. Nivesh Track does not guarantee investment returns or insurance outcomes.",
  },
  {
    q: "Can I pause or stop a SIP from the app?",
    a: "SIP modification, pause or cancellation depends on the applicable fund house process and available app functionality. Please contact your relationship manager for assistance.",
  },
];

const complianceRows = [
  ["Mutual Fund", "AMFI", "ARN-165724 — confirmed"],
  ["PMS", "APMI", "APRN & providers needed"],
  ["AIF", "Per fund manager", "Empanelment list needed"],
  ["SIF", "SEBI (SIF framework)", "Certification needs confirming"],
  ["Insurance", "IRDAI", "Registration type, number & panel needed"],
  ["Tax Planning", "CA-delivered", "Delivery model needs confirming"],
  ["Estate Planning", "Legal partner", "Partner name needed"],
  ["GIFT City Investing", "IFSCA", "Partner entity needed"],
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
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

function Home() {
  const [services, setServices] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [riskAnswers, setRiskAnswers] = useState({});
  const [riskResult, setRiskResult] = useState("");

  // Fetch public services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services/public");
        setServices(response.data.services || []);
      } catch (error) {
        console.error("Unable to load services:", error);
      }
    };

    fetchServices();
  }, []);

  // Google Apps Script form submission
  const submitGoogleForm = async (event, formType) => {
    event.preventDefault();

    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!GOOGLE_SCRIPT_URL) {
      alert("Google Apps Script URL is not configured.");
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    payload.formType = formType;
    payload.submittedAt = new Date().toISOString();

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.innerText;
        submitButton.innerText = "Submitting...";
      }

      // URLSearchParams sends data as form fields.
      // Apps Script can read these through e.parameter.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
      });

      alert("Your request has been submitted successfully. Our team will get in touch.");

      form.reset();
    } catch (error) {
      console.error("Google Apps Script submission failed:", error);
      alert("Unable to submit your request. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;

        if (submitButton.dataset.originalText) {
          submitButton.innerText = submitButton.dataset.originalText;
        }
      }
    }
  };

  const riskQuestions = [
    {
      question: "1. Your age bracket",
      options: [
        ["Under 30", 3],
        ["30–45", 3],
        ["46–55", 2],
        ["Above 55", 1],
      ],
    },
    {
      question: "2. How long before you'll likely need this money?",
      options: [
        ["Under 1 year", 1],
        ["1–3 years", 2],
        ["3–7 years", 3],
        ["7+ years", 4],
      ],
    },
    {
      question: "3. Your portfolio drops 20% in a month. You:",
      options: [
        ["Sell everything", 1],
        ["Sell some, to be safe", 2],
        ["Do nothing, wait it out", 3],
        ["Invest more while it's down", 4],
      ],
    },
    {
      question: "4. Your main goal with this money",
      options: [
        ["Protect what I have", 1],
        ["A regular income", 2],
        ["Balanced growth", 3],
        ["Maximum long-term growth", 4],
      ],
    },
    {
      question: "5. Your investing experience so far",
      options: [
        ["None", 1],
        ["Some — mutual funds or FDs", 2],
        ["Moderate — direct equities too", 3],
        ["Experienced across several asset classes", 4],
      ],
    },
    {
      question: "6. Your income stability",
      options: [
        ["Irregular / uncertain", 1],
        ["Stable, single source", 2],
        ["Stable, multiple sources", 3],
        ["Very stable, with surplus", 4],
      ],
    },
  ];

  const calculateRisk = () => {
    const answers = Object.values(riskAnswers);

    if (answers.length !== 6) {
      alert("Please answer all six questions.");
      return;
    }

    const score = answers.reduce(
      (total, answer) => total + Number(answer.score),
      0
    );

    if (score <= 7) {
      setRiskResult("Conservative");
    } else if (score <= 13) {
      setRiskResult("Moderate");
    } else if (score <= 19) {
      setRiskResult("Growth-oriented");
    } else {
      setRiskResult("Aggressive");
    }
  };

  const serviceDescriptions = {
    PMS: "Professionally managed, concentrated portfolios for investors past the mutual fund ticket size.",
    AIF: "Category I, II and III alternative investment funds, placed with empanelled fund managers.",
    SIF: "SEBI's newer category between mutual funds and PMS — ₹10 lakh minimum.",
    Insurance: "Life, health and general cover, placed with our registered insurer panel.",
    "Tax Planning":
      "General tax-planning inputs alongside your investments — not a substitute for your CA.",
    "Estate Planning":
      "Structuring how your assets pass on, with a licensed legal partner.",
    "GIFT City Investing":
      "Global market access via GIFT City's IFSC, through a named partner.",
  };

  const displayedServices =
    services.length > 0
      ? services.map((service, index) => {
          const meta = serviceMeta[service.service_name] || {};

          return {
            id: service.id,
            name: service.service_name,
            description:
              service.description ||
              meta.tag ||
              "Connect with our relationship manager for details.",
            path: meta.path || "/contact",
            number: meta.number || String(index + 1).padStart(2, "0"),
            icon: meta.icon || BriefcaseBusiness,
          };
        })
      : Object.entries(serviceMeta).map(([name, meta]) => ({
          id: name,
          name,
          description: serviceDescriptions[name],
          path: meta.path,
          number: meta.number,
          icon: meta.icon,
        }));

  return (
    <div className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate bg-[#f3faf6]">
        <div className="absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-800 shadow-sm sm:text-sm">
              <ShieldCheck size={16} />
              AMFI-REGISTERED MUTUAL FUND DISTRIBUTOR
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Mutual funds,
              <span className="block text-emerald-700">
                the easy way.
              </span>
            </h1>

            <p className="mt-5 text-lg font-semibold leading-8 text-slate-800">
              Start your SIP from home — track every rupee of it in one ledger.
            </p>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Nivesh Track, a brand of Cadence Finserve Private Limited,
              has been an AMFI-registered Mutual Fund Distributor since
              2019 (ARN-165724). Beyond mutual funds, we also connect you
              to PMS, AIF, SIF, insurance, tax planning, estate planning
              and GIFT City investing through our relationship managers
              and partners.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#007A55] px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Start your SIP <ArrowRight size={18} />
              </Link>

              <a
                href="#other-services"
                className="inline-flex items-center gap-2 rounded-xl border border-[#3D7A89]/30 bg-white px-7 py-4 font-bold text-slate-800 transition hover:border-emerald-400"
              >
                See other services <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#3D7A89]/15 bg-white/80 p-5 shadow-sm">
              <div className="rounded-xl bg-[#3D7A89]/10 p-3 text-[#3D7A89]">
                <Smartphone size={25} />
              </div>

              <div>
                <h3 className="font-bold">New to investing?</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  Complete KYC and your first SIP from the app — no branch visit needed.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <img
              src={homeimg}
              alt="Nivesh Track financial planning"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* MUTUAL FUND PASSBOOK */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-2xl bg-[#3D7A89]/20" />
            <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-2xl bg-emerald-200/50" />

            <img
              src={TrustImg}
              alt="Family financial planning"
              className="relative z-10 h-[420px] w-full rounded-3xl object-cover shadow-xl sm:h-[520px]"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#007A55]">
              Nivesh Track app
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Your Mutual Fund Passbook
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              A/C TYPE · SIP & LUMPSUM
            </p>

            <div className="mt-6 space-y-3">
              {[
                ["SIP — Flexicap Fund", "Monthly · Self-selected"],
                ["SIP — ELSS Fund", "Monthly · Tax-saving"],
                ["Lumpsum — Debt Fund", "One-time"],
                ["SIP — Index Fund", "Monthly · From our shortlist"],
              ].map(([name, detail]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-[#f3faf6] p-4"
                >
                  <div>
                    <p className="font-bold text-slate-800">{name}</p>
                    <p className="mt-1 text-xs text-slate-500">{detail}</p>
                  </div>

                  <span className="shrink-0 text-xs font-bold text-emerald-700">
                    ↑ tracked
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-500">
              <span>Illustrative view</span>
              <span>Updated automatically</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="bg-[#f3faf6] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["AMFI-registered MFD", "ARN-165724 · Est. 2019", ShieldCheck],
            ["1,900+ families · ~₹500 Cr AUM", "Tracked across our investors", Users],
            ["A named relationship manager", "One contact, every service line", Handshake],
            ["Free awareness sessions", "For organizations & teams", BookOpen],
          ].map(([title, detail, Icon]) => (
            <div
              key={title}
              className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
            >
              <Icon className="text-emerald-700" size={25} />
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-semibold text-slate-600">
          Nivesh Track — A brand of Cadence Finserve Pvt Ltd
        </p>
      </section>

      {/* APP FEATURES */}
      <section id="app" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Start here — the Nivesh Track app"
            title="Your mutual fund journey, starting from zero paperwork."
            description="Nivesh Track is built to make mutual fund investing smooth, right from your phone. Complete your KYC and place your first SIP in a few minutes, end to end on the Nivesh Track platform — no branch visit, no paper forms."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {appFeatures.map(([title, description], index) => (
              <article
                key={title}
                className="rounded-2xl border border-emerald-100 bg-[#f3faf6] p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sm font-bold tracking-widest text-emerald-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-3 text-lg font-bold">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>

          {/* APP STORE DOWNLOAD BUTTONS */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={APPLE_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Nivesh Track on the Apple App Store"
              className="group inline-flex min-w-[210px] items-center gap-3 rounded-xl border border-slate-700/20 bg-[#111827] px-6 py-4 text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-xl"
            >
              <AppleStoreIcon className="h-9 w-9 shrink-0" />

              <span className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  Download on the
                </span>
                <span className="text-lg font-bold leading-tight">
                  App Store
                </span>
              </span>
            </a>

            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Nivesh Track on Google Play"
              className="group inline-flex min-w-[210px] items-center gap-3 rounded-xl border border-slate-700/20 bg-[#111827] px-6 py-4 text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-xl"
            >
              <GooglePlayIcon className="h-9 w-9 shrink-0" />

              <span className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  Get it on
                </span>
                <span className="text-lg font-bold leading-tight">
                  Google Play
                </span>
              </span>
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Download Nivesh Track from your preferred app store.
          </p>
        </div>
      </section>

      {/* GETTING STARTED */}
      <section className="bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Getting started"
            title="Four entries to your first SIP."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Download & register",
                "Get the app and sign up with your PAN and mobile number.",
              ],
              [
                "Complete self-serve e-KYC",
                "Verify identity digitally on our onboarding platform, in line with SEBI KYC norms.",
              ],
              [
                "Explore & invest",
                "Pick a scheme yourself, or start from our shortlist, then start a SIP.",
              ],
              [
                "Track in one place",
                "Your passbook updates as transactions settle.",
              ],
            ].map(([title, description], index) => (
              <article
                key={title}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold tracking-widest text-emerald-700">
                  ENTRY {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 text-lg font-bold">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section
        id="other-services"
        className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Beyond mutual funds"
            title="The rest of your financial life — one message away."
            description="We're primarily a mutual fund distributor. For these, we connect you with the right registered partner or specialist — leave your details below and a relationship manager will reach out."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedServices.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className="rounded-2xl border border-emerald-100 bg-[#f3faf6] p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={27} className="text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-700">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{service.name}</h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-emerald-100 bg-[#f3faf6] p-6 sm:p-9">
            <h3 className="text-2xl font-bold">
              Interested in one of these?
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Leave your email and mobile number with the product you're
              after — a relationship manager will get in touch to take it further.
            </p>

            <form
              onSubmit={(event) =>
                submitGoogleForm(event, "service-callback")
              }
              className="mt-7 grid gap-4 sm:grid-cols-2"
            >
              <input
                required
                name="name"
                placeholder="Name"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                required
                name="mobile"
                type="tel"
                placeholder="Mobile"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-600"
              />

              <select
                required
                name="product"
                defaultValue=""
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600 outline-none focus:border-emerald-600"
              >
                <option value="" disabled>
                  Which product?
                </option>

                {Object.keys(serviceMeta).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                rows="3"
                placeholder="Anything else to add? (optional)"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-600 sm:col-span-2"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white transition hover:bg-emerald-800 sm:col-span-2"
              >
                Request a callback <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-500">
              We'll only use these details to get in touch about the product you've chosen.
            </p>
          </div>
        </div>
      </section>

      {/* RELATIONSHIP MANAGER */}
      <section
        id="guidance"
        className="bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Service model
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A relationship manager, not just an app.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Every client is assigned one relationship manager at Nivesh
              Track — a single point of contact across every service line,
              instead of a rotating support queue.
            </p>

            <h3 className="mt-8 text-xl font-bold">
              Goal-based guidance, kept within the rules
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              For mutual funds specifically, Nivesh Track is permitted to
              offer what SEBI's framework calls incidental advice — basic,
              goal-based guidance limited to the schemes we distribute,
              built on your goal, horizon and risk comfort. You can always
              choose a scheme yourself; the shortlist from our investment
              research desk is a starting point, not a requirement.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              For PMS, AIF, SIF, insurance, tax and estate planning, your
              relationship manager's role is to connect you with the
              specifically registered specialist or partner for that
              product — not to extend mutual-fund-style guidance into
              products that sit under a different regulator entirely.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-9">
            <h3 className="text-2xl font-bold">Request a callback</h3>

            <p className="mt-2 text-sm text-slate-600">
              Leave your number and a relationship manager will call you back.
            </p>

            <form
              onSubmit={(event) =>
                submitGoogleForm(event, "relationship-manager-callback")
              }
              className="mt-6 space-y-4"
            >
              <input
                required
                name="name"
                placeholder="Name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                required
                name="mobile"
                type="tel"
                placeholder="Mobile number"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                name="preferredTime"
                placeholder="Preferred time to call (e.g. weekdays after 6pm)"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800"
              >
                Request a callback
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CALCULATOR LINKS */}
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2">
          <Link
            to="/financial-calculator"
            className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-[#f3faf6] p-6 transition hover:shadow-lg"
          >
            <div>
              <p className="text-sm font-bold text-emerald-700">
                Run the numbers
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Goal, retirement, step-up & SWP calculators
              </h3>
            </div>

            <Calculator className="shrink-0 text-emerald-700" size={30} />
          </Link>

          <a
            href="#risk-profile"
            className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-[#f3faf6] p-6 transition hover:shadow-lg"
          >
            <div>
              <p className="text-sm font-bold text-emerald-700">
                Know your risk profile
              </p>

              <h3 className="mt-2 text-xl font-bold">
                A 2-minute self-assessment
              </h3>
            </div>

            <ShieldCheck className="shrink-0 text-emerald-700" size={30} />
          </a>
        </div>
      </section>

      {/* SIP CALCULATOR */}
      <CalculatorSection />

      {/* RISK PROFILE */}
      <section
        id="risk-profile"
        className="bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Know yourself first"
            title="What kind of investor are you?"
            description="A two-minute self-assessment — not a substitute for the fuller risk-profiling your relationship manager will do as part of onboarding, in line with SEBI's KYC norms."
          />

          <div className="mt-10 space-y-6">
            {riskQuestions.map((item, index) => (
              <div
                key={item.question}
                className="rounded-2xl border border-emerald-100 bg-white p-6"
              >
                <h3 className="font-bold">{item.question}</h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {item.options.map(([label, score]) => (
                    <label
                      key={label}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${
                        riskAnswers[index]?.label === label
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`risk-${index}`}
                        checked={riskAnswers[index]?.label === label}
                        onChange={() => {
                          setRiskAnswers((prev) => ({
                            ...prev,
                            [index]: { label, score },
                          }));
                          setRiskResult("");
                        }}
                        className="accent-emerald-700"
                      />

                      {label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={calculateRisk}
            className="mt-7 w-full rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800"
          >
            See my risk profile
          </button>

          {riskResult && (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-6 text-center">
              <p className="text-sm text-slate-500">
                Your indicative risk profile
              </p>

              <h3 className="mt-2 text-2xl font-bold text-emerald-700">
                {riskResult}
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                This is an educational self-assessment only, not an official
                risk profile or investment recommendation.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* AWARENESS SESSIONS */}
      <section
        id="awareness"
        className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              For organizations & teams
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Bring an investor awareness session to your people.
            </h2>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-[#f3faf6] p-6">
              <h3 className="font-bold">
                Free, independent of any sale
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                We run free investor awareness sessions for organizations,
                employee groups and community bodies, delivered by a
                qualified financial expert from our team. These sessions
                are general education — not a personalised portfolio review,
                and run independently of any investment, insurance or other
                product sale.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-9">
            <h3 className="text-2xl font-bold">Request a session</h3>

            <form
              onSubmit={(event) =>
                submitGoogleForm(event, "awareness-session")
              }
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <input
                required
                name="organization"
                placeholder="Organization name"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                required
                name="contactPerson"
                placeholder="Contact person"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                required
                name="phone"
                type="tel"
                placeholder="Phone"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                name="city"
                placeholder="City"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                name="groupSize"
                placeholder="Approx. group size (e.g. 40 employees)"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <textarea
                name="topics"
                rows="3"
                placeholder="What would you like covered?"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 sm:col-span-2"
              />

              <button
                type="submit"
                className="rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 sm:col-span-2"
              >
                Request a session
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-500">
              We'll only use these details to get in touch about scheduling your session.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section
        id="trust"
        className="bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Nivesh Track · Est. 2019 · AMFI-Regd. MFD · ARN-165724
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Nivesh Track distributes. It does not advise.
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-4xl space-y-4 text-sm leading-8 text-slate-600">
            <p>
              Nivesh Track, a brand of Cadence Finserve Private Limited,
              has been an AMFI-registered Mutual Fund Distributor since
              2019 — ARN-165724. Today we serve over 1,900 investor
              families, with approximately ₹500 crore tracked across
              client portfolios. We are purely a distributor of mutual
              funds and earn our commission as a product distributor
              from Asset Management Companies; we are not a
              SEBI-registered Investment Adviser.
            </p>

            <p>
              For PMS, AIF, SIF, insurance, tax planning, estate planning
              and GIFT City investing, we connect you with specifically
              registered partners and do not charge any separate fee
              for making that connection.
            </p>

            <p>
              Mutual fund investments are subject to market risks. The
              NAVs of the schemes may go up or down depending on the
              factors and forces affecting the securities market,
              including fluctuations in interest rates. Please read all
              scheme-related documents carefully before investing,
              including the Scheme Information Document and Key
              Information Memorandum. Past performance is not indicative
              of future returns.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-emerald-100 bg-white">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-emerald-50 text-slate-800">
                <tr>
                  <th className="p-4 font-bold">Service / partner</th>
                  <th className="p-4 font-bold">Regulator</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>

              <tbody>
                {complianceRows.map((row) => (
                  <tr key={row[0]} className="border-t border-slate-100">
                    {row.map((cell) => (
                      <td key={cell} className="p-4 text-slate-600">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm leading-7 text-slate-600">
            A category-wise breakdown of the commission we receive from
            AMCs is available on request — write to{" "}
            <a
              className="font-bold text-emerald-700"
              href="mailto:niveshtrack@gmail.com"
            >
              niveshtrack@gmail.com
            </a>{" "}
            for the current schedule.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Questions"
            title="Before you get in touch."
          />

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-emerald-100 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-slate-900"
                >
                  {faq.q}

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-emerald-700 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <p className="border-t border-emerald-50 px-5 py-5 text-sm leading-7 text-slate-600">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-800 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-10 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
              Ready when you are
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              One relationship manager. Every service line.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
              Free to download, free to ask. KYC takes a few minutes —
              your relationship manager handles the rest.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#guidance"
                className="rounded-xl bg-white px-6 py-4 font-bold text-emerald-800 hover:bg-emerald-50"
              >
                Request a callback
              </a>

              <a
                href={APPLE_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Nivesh Track on the Apple App Store"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-4 font-bold text-white transition hover:bg-white/10"
              >
                <AppleStoreIcon className="h-6 w-6" />
                App Store
              </a>

              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Nivesh Track on Google Play"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-4 font-bold text-white transition hover:bg-white/10"
              >
                <GooglePlayIcon className="h-6 w-6" />
                Google Play
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-5 pb-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl border border-amber-200/70 bg-amber-50 p-5 sm:p-6">
          <p className="font-bold text-slate-800">
            Important investment disclaimer
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
            Nivesh Track, a brand of Cadence Finserve Private Limited,
            is an AMFI-registered Mutual Fund Distributor (ARN-165724)
            and is not a SEBI-registered Investment Adviser. We are
            purely a distributor of mutual funds and earn our commission
            as a product distributor from Asset Management Companies;
            we do not charge investors any additional fee for this.
            Mutual fund investments are subject to market risks. The
            NAVs of the schemes may go up or down depending on the
            factors and forces affecting the securities market,
            including fluctuations in interest rates. Please read all
            scheme-related documents carefully before investing,
            including the Scheme Information Document and Key
            Information Memorandum — past performance is not indicative
            of future performance. PMS, AIF, SIF, insurance, tax
            planning, estate planning and GIFT City investing are each
            governed by their own regulator, separate from our AMFI
            registration, and are offered only once the relevant
            registration or partner arrangement is confirmed and on
            file — see Trust & compliance for current status. While all
            efforts have been made to keep this website accurate,
            please refer to official scheme documents and regulatory
            notifications as the authentic source before acting on
            anything shown here. Nothing on this website constitutes
            investment advice, a recommendation, or an offer to buy or
            sell any security or scheme. For any clarification, write
            to niveshtrack@gmail.com.
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
    <section
      id="calculators"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Plan the numbers
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Estimate Your Future Investment Value
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Adjust your monthly contribution, time period and assumed
            annual return to explore how regular investing could grow over time.
          </p>

          <div className="mt-8 space-y-7">
            <div>
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="monthlyInvestment"
                  className="text-sm font-semibold text-slate-700"
                >
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
                <label
                  htmlFor="investmentYears"
                  className="text-sm font-semibold text-slate-700"
                >
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
                onChange={(event) =>
                  setYears(Number(event.target.value))
                }
                className="mt-4 w-full accent-emerald-700"
              />

              <div className="flex justify-between text-xs text-slate-400">
                <span>1 year</span>
                <span>40 years</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="annualRate"
                  className="text-sm font-semibold text-slate-700"
                >
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
                onChange={(event) =>
                  setAnnualRate(Number(event.target.value))
                }
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
              <p className="text-sm text-slate-300">
                Estimated future value
              </p>

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

              <span className="font-bold">
                {formatRupees(invested)}
              </span>
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
                    width: `${
                      estimatedValue > 0
                        ? Math.min(
                            100,
                            (invested / estimatedValue) * 100
                          )
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
