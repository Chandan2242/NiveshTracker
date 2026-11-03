
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect your login API here
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-emerald-950 p-10 text-white md:flex">
          <Link to="/" className="text-2xl font-bold">
            NiveshTrack<span className="text-emerald-400">.</span>
          </Link>

          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              ₹
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Your financial future starts here.
            </h2>
            <p className="mt-5 leading-7 text-emerald-100">
              Access your financial dashboard, track your investments
              and stay connected with your financial advisor.
            </p>
          </div>

          <p className="text-sm text-emerald-200">
            Plan smarter. Grow confidently.
          </p>
        </div>

        <div className="p-6 sm:p-10 md:p-12">
          <Link to="/" className="text-xl font-bold text-emerald-800 md:hidden">
            NiveshTrack.
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Sign in to your account
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Enter your details to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="flex rounded-xl border border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Enter your password"
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

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) =>
                    setForm({ ...form, remember: e.target.checked })
                  }
                  className="accent-emerald-700"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="font-semibold text-emerald-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
            >
              Sign In
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-emerald-700 hover:underline"
            >
              Create account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            Protect your account. Never share your password or OTP with anyone.
          </p>
        </div>
      </div>
    </div>
  );
}
