
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");

  const updateField = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.terms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    // Connect your registration API here.
    // Never store plain-text passwords in your database.
    console.log({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-5">
        <div className="bg-emerald-950 p-7 text-white sm:p-10 md:col-span-2 md:flex md:flex-col md:justify-between">
          <Link to="/" className="text-2xl font-bold">
            NiveshTrack<span className="text-emerald-400">.</span>
          </Link>

          <div className="mt-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              ₹
            </div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Take control of your financial journey.
            </h1>
            <p className="mt-5 leading-7 text-emerald-100">
              Create your account to organise your financial goals
              and work towards a better financial future.
            </p>

            <div className="mt-8 space-y-4 text-sm text-emerald-50">
              <p>✓ Personal financial dashboard</p>
              <p>✓ Track goals and investments</p>
              <p>✓ Connect with your advisor</p>
            </div>
          </div>

          <p className="mt-8 hidden text-sm text-emerald-200 md:block">
            Your goals. Your plan. Your future.
          </p>
        </div>

        <div className="p-6 sm:p-10 md:col-span-3 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Get started
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Create your account
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Fill in your details to get started with NiveshTrack.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                required
                minLength={2}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mobile number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                inputMode="numeric"
                placeholder="10-digit mobile number"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="flex rounded-xl border border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  placeholder="At least 8 characters"
                  className="min-w-0 flex-1 rounded-xl px-4 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-4 text-sm font-medium text-emerald-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={updateField}
                autoComplete="new-password"
                required
                placeholder="Re-enter your password"
                className={inputClass}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={updateField}
                className="mt-1 accent-emerald-700"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="font-semibold text-emerald-700 hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="font-semibold text-emerald-700 hover:underline">
                  Privacy Policy
                </Link>.
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
