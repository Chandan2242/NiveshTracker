
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const initialForm = {
  investment_type: "mutual_fund",
  product_name: "",
  investment_mode: "SIP",
  amount: "",
  duration_months: "",
  remarks: "",
};

const investmentTypes = [
  { value: "mutual_fund", label: "Mutual Fund" },
  { value: "pms", label: "Portfolio Management Services (PMS)" },
  { value: "aif", label: "Alternative Investment Fund (AIF)" },
  { value: "sif", label: "Specialised Investment Fund (SIF)" },
  { value: "insurance", label: "Insurance" },
  { value: "fd", label: "Fixed Deposit" },
  { value: "bonds", label: "Bonds" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

export default function InvestmentRequest() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [requestId, setRequestId] = useState(null);

  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
    setRequestId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setRequestId(null);

    const token = getToken();

    if (!token) {
      setError("Please login to submit an investment request.");
      return;
    }

    if (!form.product_name.trim()) {
      setError("Please enter a fund or product name.");
      return;
    }

    const amount = Number(form.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid investment amount.");
      return;
    }

    let durationMonths = null;

    if (form.investment_mode === "SIP") {
      durationMonths = Number(form.duration_months);

      if (
        !Number.isInteger(durationMonths) ||
        durationMonths <= 0
      ) {
        setError("Please enter a valid SIP duration in months.");
        return;
      }
    }

    try {
      setSubmitting(true);

      const payload = {
        investment_type: form.investment_type,
        product_name: form.product_name.trim(),
        investment_mode: form.investment_mode,
        amount,
        duration_months: durationMonths,
        remarks: form.remarks.trim(),
      };

      const response = await api.post(
        "/investments/requests",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        response.data.message ||
          "Your investment request has been submitted successfully."
      );

      setRequestId(response.data.requestId || null);
      setForm(initialForm);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit your investment request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3faf6] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-emerald-700">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-emerald-700">
            Investment Request
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Start Investing
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Submit Your Investment Request
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Share your investment requirements with our team.
            Our team will review your request and contact you
            regarding the next steps.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg shadow-emerald-900/5">

          <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-6 sm:px-9">
            <h2 className="text-xl font-bold text-slate-900">
              Investment Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the details below to submit your request.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-9">

            {/* Investment Type */}
            <div>
              <label className={labelClass}>
                Investment Type <span className="text-red-500">*</span>
              </label>

              <select
                name="investment_type"
                value={form.investment_type}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {investmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Name */}
            <div>
              <label className={labelClass}>
                Fund / Product Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
                placeholder="e.g. HDFC Flexi Cap Fund"
                className={inputClass}
                maxLength={255}
                required
              />
            </div>

            {/* Investment Mode */}
            <div>
              <label className={labelClass}>
                Investment Mode <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      investment_mode: "SIP",
                    }))
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    form.investment_mode === "SIP"
                      ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <span className="block font-bold text-slate-800">
                    SIP
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Regular periodic investment
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      investment_mode: "LUMP_SUM",
                    }))
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    form.investment_mode === "LUMP_SUM"
                      ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <span className="block font-bold text-slate-800">
                    Lump Sum
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    One-time investment
                  </span>
                </button>
              </div>
            </div>

            {/* Amount and Duration */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  {form.investment_mode === "SIP"
                    ? "Monthly Investment Amount (₹)"
                    : "Investment Amount (₹)"}
                  <span className="text-red-500"> *</span>
                </label>

                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className={inputClass}
                  min="1"
                  step="0.01"
                  required
                />

                {form.amount && Number(form.amount) > 0 && (
                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    {formatCurrency(form.amount)}
                  </p>
                )}
              </div>

              {form.investment_mode === "SIP" && (
                <div>
                  <label className={labelClass}>
                    SIP Duration (Months){" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="duration_months"
                    value={form.duration_months}
                    onChange={handleChange}
                    placeholder="e.g. 60"
                    className={inputClass}
                    min="1"
                    step="1"
                    required
                  />
                </div>
              )}
            </div>

            {/* Remarks */}
            <div>
              <label className={labelClass}>
                Additional Requirements / Remarks
              </label>

              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Tell us about your investment goals or any specific requirements..."
                rows={4}
                maxLength={2000}
                className={inputClass}
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {form.remarks.length}/2000 characters
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <p className="font-semibold">{success}</p>

                {requestId && (
                  <p className="mt-1 text-xs">
                    Request ID: #{requestId}
                  </p>
                )}

                <p className="mt-2 text-xs">
                  Your request is submitted for review. No investment
                  or payment has been executed through this form.
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="border-t border-slate-100 pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Submitting Request..."
                  : "Submit Investment Request"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Submitting this form does not execute an investment
                or initiate a payment. Your request will be reviewed
                by our team.
              </p>
            </div>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
