
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

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return parsed.toLocaleDateString("en-IN", {
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

const requestStatusStyles = {
  pending: "bg-amber-50 text-amber-700",
  under_review: "bg-blue-50 text-blue-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
  completed: "bg-purple-50 text-purple-700",
};

const requestStatusLabels = {
  pending: "Pending",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  completed: "Completed",
};

export default function ClientDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [investmentRequests, setInvestmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          profileResponse,
          investmentResponse,
          requestResponse,
        ] = await Promise.all([
          api.get("/auth/me", { headers }),
          api.get("/investments/my-investments", { headers }),
          api.get("/investments/my-requests", { headers }),
        ]);

        const userData = profileResponse.data.user;

        setUser(userData);

        setInvestments(
          investmentResponse.data.investments || []
        );

        setInvestmentRequests(
          requestResponse.data.requests ||
          requestResponse.data.investmentRequests ||
          []
        );

        if (localStorage.getItem("token")) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (err) {
        console.error("Dashboard error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");

          navigate("/login", { replace: true });
          return;
        }

        setError(
          err.response?.data?.message ||
          "Unable to load your dashboard. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const summary = useMemo(() => {
    const totalInvested = investments.reduce(
      (total, item) =>
        total + Number(item.invested_amount || 0),
      0
    );

    return {
      totalInvested,
      totalCount: investments.length,
      activeCount: investments.filter(
        (item) => item.status === "active"
      ).length,
      pendingCount: investments.filter(
        (item) => item.status === "pending"
      ).length,
    };
  }, [investments]);

  const recentInvestments = useMemo(() => {
    return [...investments]
      .sort((a, b) => {
        const dateA = new Date(a.created_at || a.investment_date || 0);
        const dateB = new Date(b.created_at || b.investment_date || 0);
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [investments]);

  const sortedRequests = useMemo(() => {
    return [...investmentRequests].sort((a, b) => {
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
  }, [investmentRequests]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="font-medium text-emerald-700">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <p className="font-semibold text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) return null;

  const createdAt = user.created_at
    ? formatDate(user.created_at)
    : "Not available";

  const stats = [
    {
      title: "Total Investments",
      value: summary.totalCount,
      description: "Registered investment records",
      icon: "₹",
    },
    {
      title: "Total Invested",
      value: formatCurrency(summary.totalInvested),
      description: "Total registered amount",
      icon: "▤",
    },
    {
      title: "Active Investments",
      value: summary.activeCount,
      description: "Currently active records",
      icon: "◉",
    },
    {
      title: "Pending Investments",
      value: summary.pendingCount,
      description: "Awaiting completion",
      icon: "◷",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Welcome Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Client Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Welcome, {user.name || "Client"}!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your financial profile and track your investments.
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 px-4 py-3">
          <p className="text-xs text-emerald-700">
            Account Status
          </p>
          <p className="mt-1 font-semibold capitalize text-emerald-800">
            {user.status || "Active"}
          </p>
        </div>
      </div>

      {/* Investment Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl font-bold text-emerald-700">
              {item.icon}
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-2 break-words text-2xl font-bold text-slate-900">
              {item.value}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Investments */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Investments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest registered investment records
            </p>
          </div>

          <button
            onClick={() => navigate("/client/investments")}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            View All
          </button>
        </div>

        {recentInvestments.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-semibold text-slate-700">
              No Investments Yet
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Your investment records will appear here once added by your advisor.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Investment Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentInvestments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {item.product_name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {typeLabels[item.investment_type] ||
                        item.investment_type}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {formatCurrency(item.invested_amount)}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {formatDate(item.investment_date)}
                    </td>

                    <td className="px-6 py-4">
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
          </div>
        )}
      </div>

      {/* My Investment Requests */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              My Investment Requests
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track the review status of your submitted investment requests.
            </p>
          </div>

          <button
            onClick={() => navigate("/investment-request")}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            + New Request
          </button>
        </div>

        {sortedRequests.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-semibold text-slate-700">
              No Investment Requests Yet
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Your submitted requests will appear here.
            </p>
            <button
              onClick={() => navigate("/investment-request")}
              className="mt-5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Submit Investment Request
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Request ID</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Mode</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sortedRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      #{request.id}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {request.product_name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {typeLabels[request.investment_type] ||
                        request.investment_type}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {request.investment_mode === "LUMP_SUM"
                        ? "Lump Sum"
                        : request.investment_mode}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {formatCurrency(request.amount)}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {request.investment_mode === "SIP" &&
                      request.duration_months
                        ? `${request.duration_months} months`
                        : "—"}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {formatDate(request.created_at)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          requestStatusStyles[request.status] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {requestStatusLabels[request.status] ||
                          request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Account Information
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs text-slate-400">Full Name</p>
              <p className="mt-1 font-semibold text-slate-800">
                {user.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Email Address</p>
              <p className="mt-1 break-all font-semibold text-slate-800">
                {user.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Mobile Number</p>
              <p className="mt-1 font-semibold text-slate-800">
                {user.phone || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Account Role</p>
              <p className="mt-1 font-semibold capitalize text-slate-800">
                {user.role || "Client"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Account Created</p>
              <p className="mt-1 font-semibold text-slate-800">
                {createdAt}
              </p>
            </div>
          </div>
        </div>

        {/* Account Welcome */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Welcome to NiveshTrack
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your personal client portal helps you view your registered
            investments and keep track of your financial information.
          </p>

          <div className="mt-6 rounded-xl bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              Your Investment Summary
            </p>

            <p className="mt-1 text-xs leading-5 text-emerald-700">
              You currently have {summary.totalCount} investment record(s),
              including {summary.activeCount} active investment(s).
            </p>
          </div>

          <button
            onClick={() => navigate("/client/investments")}
            className="mt-5 w-full rounded-xl border border-emerald-700 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Explore My Investments
          </button>
        </div>

      </div>
    </div>
  );
}
