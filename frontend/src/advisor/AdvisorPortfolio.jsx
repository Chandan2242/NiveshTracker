
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const investmentLabels = {
  mutual_fund: "Mutual Funds",
  pms: "PMS",
  aif: "AIF",
  sif: "SIF",
  insurance: "Insurance",
  fd: "Fixed Deposits",
  bonds: "Bonds",
  other: "Other",
};

const AdvisorPortfolio = () => {
  const [clients, setClients] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError("");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const clientsResponse = await api.get(
          "/advisor/clients",
          config
        );

        const assignedClients = clientsResponse.data.clients || [];
        setClients(assignedClients);

        const portfolioResponses = await Promise.all(
          assignedClients.map(async (client) => {
            try {
              const response = await api.get(
                `/advisor/clients/${client.id}/investments`,
                config
              );

              return {
                client,
                investments: response.data.investments || [],
                totalInvested: Number(
                  response.data.total_invested || 0
                ),
              };
            } catch (err) {
              console.error(
                `Portfolio error for client ${client.id}:`,
                err
              );

              return {
                client,
                investments: [],
                totalInvested: 0,
              };
            }
          })
        );

        setPortfolio(portfolioResponses);
      } catch (err) {
        console.error("Advisor Portfolio Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load portfolio."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPortfolio();
    } else {
      setError("Please login to access advisor portfolio.");
      setLoading(false);
    }
  }, [token]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));

  const totalInvested = portfolio.reduce(
    (sum, item) => sum + item.totalInvested,
    0
  );

  const totalInvestments = portfolio.reduce(
    (sum, item) => sum + item.investments.length,
    0
  );

  const allocationMap = {};

  portfolio.forEach((item) => {
    item.investments.forEach((investment) => {
      const type = investment.investment_type || "other";
      const amount = Number(investment.invested_amount || 0);

      allocationMap[type] = (allocationMap[type] || 0) + amount;
    });
  });

  const allocations = Object.entries(allocationMap)
    .map(([type, amount]) => ({
      type,
      label: investmentLabels[type] || type,
      amount,
      percentage:
        totalInvested > 0
          ? (amount / totalInvested) * 100
          : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3faf6] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-emerald-700">
            NiveshTrack / Advisor Panel
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Client Portfolio
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                View investment allocation across your assigned clients.
              </p>
            </div>

            <Link
              to="/advisor/dashboard"
              className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Clients
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {clients.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Investments
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {totalInvestments}
            </h2>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Invested
            </p>
            <h2 className="mt-3 break-words text-2xl font-bold text-emerald-700">
              {formatCurrency(totalInvested)}
            </h2>
          </div>
        </div>

        {/* Allocation */}
        <div className="mb-8 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Investment Allocation
          </h2>

          <p className="mb-6 mt-1 text-sm text-gray-500">
            Breakdown by investment type, based on recorded invested amounts.
          </p>

          {allocations.length === 0 ? (
            <div className="rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
              No investment records available.
            </div>
          ) : (
            <div className="space-y-5">
              {allocations.map((item) => (
                <div key={item.type}>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {item.label}
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(item.amount)} (
                      {item.percentage.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-all"
                      style={{
                        width: `${Math.min(item.percentage, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client Portfolio Table */}
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5 md:p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Client-wise Portfolio
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Investment summary of each assigned client.
            </p>
          </div>

          {portfolio.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              No assigned clients found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Client",
                      "Email",
                      "Investments",
                      "Total Invested",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {portfolio.map((item) => (
                    <tr
                      key={item.client.id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {item.client.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.client.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.investments.length}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-emerald-700">
                        {formatCurrency(item.totalInvested)}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          to={`/advisor/clients/${item.client.id}`}
                          className="whitespace-nowrap rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                        >
                          View Portfolio
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Note: Figures are based on recorded invested amounts, not live market values.
        </p>

      </div>
    </div>
  );
};

export default AdvisorPortfolio;
