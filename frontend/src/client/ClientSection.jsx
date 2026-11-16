
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));

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

const colors = [
  "#059669",
  "#0D9488",
  "#0F766E",
  "#34D399",
  "#64748B",
  "#F59E0B",
  "#6366F1",
  "#A78BFA",
];

export default function ClientSection({ title }) {
  const navigate = useNavigate();

  const isPortfolio = title === "My Portfolio";
  const isAdvisor = title === "My Advisor";

  const [investments, setInvestments] = useState([]);
  const [advisor, setAdvisor] = useState(null);
  const [assigned, setAssigned] = useState(false);

  const [loading, setLoading] = useState(
    isPortfolio || isAdvisor
  );

  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (!isPortfolio && !isAdvisor) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        if (isPortfolio) {
          const response = await api.get(
            "/investments/my-investments",
            getAuthConfig()
          );

          setInvestments(
            response.data.investments || []
          );
        }

        if (isAdvisor) {
          const response = await api.get(
            "/investments/my-advisor",
            getAuthConfig()
          );

          setAssigned(response.data.assigned || false);
          setAdvisor(response.data.advisor || null);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          handleUnauthorized();
          return;
        }

        setError(
          err.response?.data?.message ||
          "Unable to load information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isPortfolio, isAdvisor, navigate]);

  const portfolio = useMemo(() => {
    const grouped = {};

    investments.forEach((item) => {
      const type = item.investment_type || "other";

      if (!grouped[type]) {
        grouped[type] = {
          type,
          count: 0,
          amount: 0,
        };
      }

      grouped[type].count += 1;
      grouped[type].amount += Number(
        item.invested_amount || 0
      );
    });

    const total = investments.reduce(
      (sum, item) =>
        sum + Number(item.invested_amount || 0),
      0
    );

    const categories = Object.values(grouped)
      .sort((a, b) => b.amount - a.amount)
      .map((item, index) => ({
        ...item,
        percentage:
          total > 0 ? (item.amount / total) * 100 : 0,
        color: colors[index % colors.length],
      }));

    return {
      total,
      count: investments.length,
      active: investments.filter(
        (item) => item.status === "active"
      ).length,
      redeemed: investments.filter(
        (item) => item.status === "redeemed"
      ).length,
      pending: investments.filter(
        (item) => item.status === "pending"
      ).length,
      categories,
    };
  }, [investments]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="font-medium text-emerald-700">
          Loading your information...
        </p>
      </div>
    );
  }

  // ================= MY ADVISOR =================

  if (isAdvisor) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Client Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Advisor
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your assigned relationship manager and contact details.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {assigned && advisor ? (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-8 text-white">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
                  {advisor.name?.charAt(0)?.toUpperCase() || "A"}
                </div>

                <div>
                  <p className="text-sm font-medium text-emerald-100">
                    Your Assigned Advisor
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    {advisor.name}
                  </h2>

                  <span className="mt-2 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                    Active Advisor
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <span>✉</span>
                  Email Address
                </div>

                {advisor.email ? (
                  <a
                    href={`mailto:${advisor.email}`}
                    className="mt-3 block break-all font-semibold text-emerald-700 hover:underline"
                  >
                    {advisor.email}
                  </a>
                ) : (
                  <p className="mt-3 font-semibold text-slate-700">
                    Not available
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <span>☎</span>
                  Phone Number
                </div>

                {advisor.phone ? (
                  <a
                    href={`tel:${advisor.phone}`}
                    className="mt-3 block font-semibold text-emerald-700 hover:underline"
                  >
                    {advisor.phone}
                  </a>
                ) : (
                  <p className="mt-3 font-semibold text-slate-700">
                    Not available
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 p-5 sm:col-span-2">
                <p className="text-sm font-medium text-slate-500">
                  Advisor ID
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  #{advisor.id}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-800">
                Your Relationship Manager
              </p>

              <p className="mt-1 text-sm leading-6 text-emerald-700">
                Your advisor is assigned to your account as your
                primary contact for assistance and account-related
                queries.
              </p>
            </div>
          </div>
        ) : !error ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-2xl">
              👤
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No Advisor Assigned Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              An advisor has not been assigned to your account yet.
              Please contact the administration team for assistance.
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  // ================= OTHER PLACEHOLDER PAGES =================

  if (!isPortfolio) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Client Portal
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            This section is being set up. Your account information
            will appear here once the required backend functionality
            is connected.
          </p>
        </div>
      </div>
    );
  }

  // ================= MY PORTFOLIO =================

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Client Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          My Portfolio
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Overview of your registered investment portfolio.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Invested",
            value: formatCurrency(portfolio.total),
          },
          {
            label: "Investment Records",
            value: portfolio.count,
          },
          {
            label: "Active Investments",
            value: portfolio.active,
          },
          {
            label: "Redeemed Investments",
            value: portfolio.redeemed,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {item.label}
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Portfolio Distribution */}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Portfolio Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Investment amount by category
          </p>

          {portfolio.total === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">
              No investment data available.
            </p>
          ) : (
            <>
              <div className="mt-8 flex h-5 overflow-hidden rounded-full bg-slate-100">
                {portfolio.categories.map((item) => (
                  <div
                    key={item.type}
                    title={`${typeLabels[item.type] || item.type}: ${item.percentage.toFixed(1)}%`}
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {portfolio.categories.map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />

                        <span className="text-sm font-medium text-slate-700">
                          {typeLabels[item.type] || item.type}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-slate-900">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>

                    <div className="mt-1 flex justify-between text-xs text-slate-500">
                      <span>
                        {formatCurrency(item.amount)}
                      </span>
                      <span>{item.count} record(s)</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Portfolio Summary */}

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Portfolio Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current investment record status
          </p>

          <div className="mt-7 space-y-5">
            {[
              {
                label: "Active",
                count: portfolio.active,
                color: "bg-emerald-500",
              },
              {
                label: "Pending",
                count: portfolio.pending,
                color: "bg-amber-500",
              },
              {
                label: "Redeemed",
                count: portfolio.redeemed,
                color: "bg-slate-400",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {item.label}
                  </span>

                  <span className="font-semibold text-slate-900">
                    {item.count}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{
                      width: `${
                        portfolio.count
                          ? (item.count / portfolio.count) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              Portfolio Information
            </p>

            <p className="mt-1 text-xs leading-5 text-emerald-700">
              Values are based on investment amounts registered by your advisor.
              Current market value and returns are not calculated.
            </p>
          </div>
        </div>
      </div>

      {/* Category Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Investment Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Category-wise registered investment details
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Investment Type</th>
                <th className="px-6 py-4">Records</th>
                <th className="px-6 py-4">Invested Amount</th>
                <th className="px-6 py-4">Allocation</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {portfolio.categories.map((item) => (
                <tr key={item.type}>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {typeLabels[item.type] || item.type}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {item.count}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {formatCurrency(item.amount)}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {item.percentage.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {portfolio.categories.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-slate-500">
              No portfolio records available yet.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/client/investments")}
          className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          View All Investments
        </button>
      </div>
    </div>
  );
}
