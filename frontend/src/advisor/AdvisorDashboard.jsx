
import { useEffect, useState } from "react";
import api from "../services/api";

const AdvisorDashboard = () => {
  const [stats, setStats] = useState({
    total_clients: 0,
    active_clients: 0,
    suspended_clients: 0,
    total_investments: 0,
    total_invested: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/advisor/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data.stats);
      } catch (err) {
        console.error("Advisor Dashboard Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load advisor dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboard();
    } else {
      setError("Please login to access advisor dashboard.");
      setLoading(false);
    }
  }, [token]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const summaryCards = [
    {
      title: "Total Clients",
      value: stats.total_clients,
      icon: "♙",
    },
    {
      title: "Active Clients",
      value: stats.active_clients,
      icon: "✓",
    },
    {
      title: "Suspended Clients",
      value: stats.suspended_clients,
      icon: "⊘",
    },
    {
      title: "Total Investments",
      value: stats.total_investments,
      icon: "₹",
    },
    {
      title: "Total Invested",
      value: formatCurrency(stats.total_invested),
      icon: "↗",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading advisor dashboard...
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

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Advisor Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Overview of your assigned clients and their investments.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl font-bold text-emerald-700">
                  {card.icon}
                </span>
              </div>

              <h2 className="break-words text-2xl font-bold text-gray-900">
                {card.value}
              </h2>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdvisorDashboard;
