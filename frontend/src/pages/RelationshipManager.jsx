
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Calculator,
  ClipboardCheck,
  Phone,
  ArrowUpRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

// Left Teal + Right Emerald Gradient Pattern
const SectionBackground = ({ reverse = false }) => (
  <>
    {/* LEFT SIDE - Always Teal */}
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${
        reverse ? "-top-20" : "-bottom-24"
      } -left-24 -z-10 h-80 w-80 rounded-full bg-teal-100/70 blur-3xl`}
    />

    {/* RIGHT SIDE - Always Emerald */}
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${
        reverse ? "-bottom-24" : "-top-20"
      } -right-24 -z-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl`}
    />
  </>
);

export default function RelationshipManager() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    preferredTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hello, I would like a callback.

Name: ${formData.name}
Mobile: ${formData.mobile}
Preferred Time: ${formData.preferredTime}`;

    window.location.href = `mailto:info@niveshtrack.com?subject=Callback Request&body=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <main className="overflow-hidden bg-[#f3faf6]">

      {/* HERO SECTION - Right Top Emerald + Left Bottom Teal */}
      <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <SectionBackground />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-semibold text-[#007A55]">
              <UserRound size={16} />
              Personal Relationship Manager
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your Financial Journey,
              <span className="text-[#007A55]"> Guided Personally.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Get personalized assistance for your investment journey.
              Our relationship managers help you understand your financial
              goals and navigate your investment options with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#callback"
                className="inline-flex items-center gap-2 rounded-xl bg-[#007A55] px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
              >
                Request a Callback
                <ArrowUpRight size={18} />
              </a>

              <Link
                to="/financial-calculator"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 font-semibold text-slate-800 transition hover:border-[#007A55] hover:text-[#007A55]"
              >
                Explore Calculators
                <Calculator size={18} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-xl shadow-emerald-900/5 backdrop-blur-sm sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#007A55]">
                <UserRound size={28} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                A Dedicated Partner for Your Financial Goals
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                From understanding your investment options to tracking your
                financial journey, get the assistance you need at every step.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Personalized assistance",
                  "Investment-related support",
                  "Regular portfolio discussions",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ShieldCheck className="shrink-0 text-[#007A55]" size={20} />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDANCE SECTION - Left Top Teal + Right Bottom Emerald */}
      <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 lg:px-10">
        <SectionBackground reverse />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#007A55]">
              Personal Guidance
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              How Your Relationship Manager Helps
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Get assistance throughout your investment journey with
              personalized support and clear communication.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: UserRound,
                title: "Understand Your Goals",
                description:
                  "Discuss your financial goals, investment preferences and expectations.",
              },
              {
                icon: ClipboardCheck,
                title: "Get Investment Support",
                description:
                  "Receive assistance in understanding available investment products and processes.",
              },
              {
                icon: Clock,
                title: "Stay Connected",
                description:
                  "Get continued assistance and updates throughout your investment journey.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/80 bg-white/75 p-7 shadow-lg shadow-emerald-900/5 backdrop-blur-sm transition hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#007A55]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK LINKS SECTION - Right Top Emerald + Left Bottom Teal */}
      <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 lg:px-10">
        <SectionBackground />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#007A55]">
              Explore More
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Take the Next Step
            </h2>

            <p className="mt-4 text-slate-600">
              Explore our tools and services to make informed financial decisions.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              to="/financial-calculator"
              className="group rounded-2xl border border-white/80 bg-white/75 p-7 shadow-lg shadow-emerald-900/5 transition hover:-translate-y-1 hover:border-emerald-200"
            >
              <div className="flex items-center justify-between">
                <Calculator size={30} className="text-[#007A55]" />
                <ArrowUpRight
                  size={22}
                  className="text-slate-400 transition group-hover:text-[#007A55]"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Financial Calculator
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Use financial calculators to estimate investments and plan
                your financial goals.
              </p>
            </Link>

            <Link
              to="/trust-compliance"
              className="group rounded-2xl border border-white/80 bg-white/75 p-7 shadow-lg shadow-emerald-900/5 transition hover:-translate-y-1 hover:border-emerald-200"
            >
              <div className="flex items-center justify-between">
                <ShieldCheck size={30} className="text-[#007A55]" />
                <ArrowUpRight
                  size={22}
                  className="text-slate-400 transition group-hover:text-[#007A55]"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Trust & Compliance
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Learn about our regulatory status, transparency and
                commitment to responsible distribution.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CALLBACK SECTION - Left Top Teal + Right Bottom Emerald */}
      <section
        id="callback"
        className="relative isolate overflow-hidden px-5 py-16 sm:px-8 lg:px-10"
      >
        <SectionBackground reverse />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#007A55]">
              Get in Touch
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Request a Callback
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Have questions about your investment journey? Share your details
              and request a callback from our team.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#007A55] shadow-sm">
                <Phone size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Personal Assistance
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Connect with our team for assistance.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-xl shadow-emerald-900/5 backdrop-blur-sm sm:p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Let Us Connect With You
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Fill in your details below.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#007A55] focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Enter 10-digit mobile number"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#007A55] focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Time
                </label>

                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-[#007A55] focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Select preferred time</option>
                  <option value="Morning (9 AM - 12 PM)">
                    Morning (9 AM - 12 PM)
                  </option>
                  <option value="Afternoon (12 PM - 4 PM)">
                    Afternoon (12 PM - 4 PM)
                  </option>
                  <option value="Evening (4 PM - 7 PM)">
                    Evening (4 PM - 7 PM)
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#007A55] px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
              >
                Request Callback
                <ArrowUpRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
