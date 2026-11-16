
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send OTP.");
      }

      setMessage(data.message || "OTP sent successfully.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/verify-reset-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP.");
      }

      if (!data.resetToken) {
        throw new Error("Reset token was not received.");
      }

      setResetToken(data.resetToken);
      setMessage("OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          resetToken,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }

      setMessage(data.message || "Password reset successfully.");

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            message: "Password reset successfully. Please sign in.",
          },
        });
      }, 1200);
    } catch (err) {
      setError(err.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl sm:p-10">

        <Link to="/" className="text-2xl font-bold text-emerald-800">
          NiveshTrack<span className="text-emerald-500">.</span>
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Account Recovery
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {step === 1 && "Forgot Password?"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Create New Password"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {step === 1 &&
              "Enter your registered email address. We will send you an OTP to reset your password."}
            {step === 2 &&
              `Enter the OTP sent to ${email}.`}
            {step === 3 &&
              "Your email has been verified. Create a new password for your account."}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-7 flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-1.5 flex-1 rounded-full ${
                step >= item ? "bg-emerald-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>

              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-700 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                6-digit OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter OTP"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full rounded-xl bg-emerald-700 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setError("");
                setMessage("");
              }}
              className="w-full text-sm font-semibold text-emerald-700 hover:underline"
            >
              Change email address
            </button>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                New password
              </label>

              <div className="flex rounded-xl border border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
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
                Confirm new password
              </label>

              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-700 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {message && (
          <p role="status" className="mt-5 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
            {message}
          </p>
        )}

        <p className="mt-8 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
