
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not available";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const typeLabels = {
  mutual_fund: "Mutual Fund",
  pms: "PMS",
  aif: "AIF",
  sif: "SIF",
  insurance: "Insurance",
  fd: "Fixed Deposit",
  bonds: "Bonds",
  other: "Other",
};

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  redeemed: "bg-slate-100 text-slate-600",
};

export default function ClientInvestments() {
  const navigate = useNavigate();

  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchInvestments = async () => {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get(
          "/investments/my-investments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInvestments(response.data.investments || []);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
          "Unable to load your investments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [navigate]);

  const totalInvested = investments.reduce(
    (total, item) =>
      total + Number(item.invested_amount || 0),
    0
  );

  const activeCount = investments.filter(
    (item) => item.status === "active"
  ).length;

  const pendingCount = investments.filter(
    (item) => item.status === "pending"
  ).length;

  const redeemedCount = investments.filter(
    (item) => item.status === "redeemed"
  ).length;

  const filteredInvestments = useMemo(() => {
    return investments.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        item.product_name,
        item.folio_number,
        typeLabels[item.investment_type],
      ].some((value) =>
        String(value || "").toLowerCase().includes(searchText)
      );

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [investments, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm font-medium text-slate-500">
          Loading your investments...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Client Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          My Investments
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View and track all your registered investments.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Invested
          </p>
          <h2 className="mt-3 text-2xl font-bold text-emerald-700">
            {formatCurrency(totalInvested)}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Registered investment amount
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Investments
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            {investments.length}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            All investment records
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Active Investments
          </p>
          <h2 className="mt-3 text-2xl font-bold text-emerald-700">
            {activeCount}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Currently active records
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Pending Investments
          </p>
          <h2 className="mt-3 text-2xl font-bold text-amber-600">
            {pendingCount}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Awaiting completion
          </p>
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty State */}
      {investments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-700">
            ₹
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            No Investments Yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your investment records will appear here once
            they have been added to your account by your advisor.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Investment Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredInvestments.length} of {investments.length} records
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product or folio..."
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="redeemed">Redeemed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Folio Number</th>
                  <th className="px-5 py-4">Invested Amount</th>
                  <th className="px-5 py-4">Units</th>
                  <th className="px-5 py-4">Purchase NAV</th>
                  <th className="px-5 py-4">Investment Date</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredInvestments.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {item.product_name}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {typeLabels[item.investment_type] ||
                        item.investment_type}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.folio_number || "—"}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {formatCurrency(item.invested_amount)}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.units ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.purchase_nav != null
                        ? formatCurrency(item.purchase_nav)
                        : "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(item.investment_date)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          statusStyles[item.status] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

            {filteredInvestments.length === 0 && (
              <div className="px-5 py-12 text-center">
                <p className="font-semibold text-slate-700">
                  No matching investments found
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search term or status filter.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:justify-between">
            <span>
              Redeemed Investments: {redeemedCount}
            </span>
            <span>
              Data registered by your advisor
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
