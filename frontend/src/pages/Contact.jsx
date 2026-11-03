import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(
      "The form is ready. Connect your backend API to send your message."
    );
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Contact Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20">
          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              We'd love to hear from you
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Let's Talk About Your{" "}
              <span className="text-emerald-700">Financial Future.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Have questions about your portfolio, investments, market
              analysis or financial planning? Reach out to our team anytime.
              We're here to help you make informed decisions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Send Us a Message <span>→</span>
              </a>

              <a
                href="#our-location"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
              >
                Find Our Location
              </a>
            </div>

            <div className="mt-9 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-xl">
                💬
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Your questions matter
                </p>
                <p className="text-sm text-slate-500">
                  Connect with our team for assistance.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-100/60 blur-2xl" />
            <img
              src="https://nivesh.lentislegalis.com/wp-content/uploads/2026/05/efa5abb5-79a0-4efd-a7e4-a89db2916ef0-857x1024.png"
              alt="NiveshTrack financial guidance"
              className="relative mx-auto max-h-[500px] w-full rounded-3xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
        <div
          id="contact-form"
          className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_15px_60px_rgba(15,23,42,0.07)] sm:p-9"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Contact Us
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
            We're Here to Help!
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Have questions about your portfolio, investments, market analysis
            or financial planning? Reach out to our team anytime.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Comment or Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 sm:w-auto sm:min-w-44"
            >
              Submit Message <span>→</span>
            </button>

            {status && (
              <p
                aria-live="polite"
                className="rounded-lg bg-emerald-50 p-3 text-sm leading-6 text-emerald-800"
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="rounded-3xl bg-emerald-950 p-7 text-white sm:p-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
            Get in Touch
          </span>
          <h2 className="mt-3 text-3xl font-extrabold">Let's Connect</h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-emerald-100">
            We're here to help you with your investment and financial planning
            questions.
          </p>

          <div className="mt-8 grid gap-7 border-t border-white/15 pt-7 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
                📍
              </div>
              <div>
                <h3 className="text-lg font-bold">Our Office</h3>
                <p className="mt-2 text-base leading-8 text-emerald-100">
                  Wealth Bees, Janki Vallabh Complex, Veer Vinay Chowk, near
                  Union Bank, Mohalla Chikni, Alijanpurva, Balrampur, Uttar
                  Pradesh 271201, India
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
                ✉️
              </div>
              <div>
                <h3 className="text-lg font-bold">Contact Information</h3>
                <p className="mt-3 text-base leading-7 text-emerald-100">
                  <span className="font-semibold text-white">Phone: </span>
                  <a href="tel:07800450600" className="hover:text-white hover:underline">
                    078004 50600
                  </a>
                </p>
                <p className="mt-2 text-base leading-7 text-emerald-100">
                  <span className="font-semibold text-white">Website: </span>
                  <a
                    href="https://wealthbees.in"
                    target="_blank"
                    rel="noreferrer"
                    className="break-all hover:text-white hover:underline"
                  >
                    wealthbees.in
                  </a>
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Wealth+Bees%2C+Janki+Vallabh+Complex%2C+Balrampur%2C+Uttar+Pradesh+271201"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-400"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Map Below Contact Details */}
      <section
        id="our-location"
        className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:pb-20"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                Find Us
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Visit Our Office
              </h2>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Balrampur, Uttar Pradesh 271201, India
              </p>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Wealth+Bees%2C+Janki+Vallabh+Complex%2C+Balrampur%2C+Uttar+Pradesh+271201"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl border border-emerald-700 px-5 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-700 hover:text-white"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <iframe
            title="Wealth Bees office location"
            src="https://maps.google.com/maps?q=Wealth%20Bees%2C%20Janki%20Vallabh%20Complex%2C%20Veer%20Vinay%20achowk%2C%20near%20Union%20Bank%2C%20Mohalla%20Chikni%2C%20Alijanpurva%2C%20Balrampur%2C%20Uttar%20Pradesh%20271201%2C%20India&t=&z=16&output=embed"
            width="100%"
            height="500"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* Investment CTA */}
      <section className="overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-800 px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">
              Your financial journey starts here
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Let's Start{" "}
              <span className="text-emerald-400">Investing Now</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-emerald-100">
              Learn more about investing, explore financial opportunities and
              take informed steps toward your future.
            </p>
          </div>

          <a
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-bold text-white transition hover:bg-emerald-400"
          >
            Explore Services →
          </a>
        </div>
      </section>
    </main>
  );
}
