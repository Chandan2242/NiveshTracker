
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ArrowLeft,
  Wallet,
  TrendingUp,
  Layers,
} from "lucide-react";
import api from "../services/api";

const AdvisorClientDetails = () => {
  const { clientId } = useParams();

  const [client, setClient] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [clientResponse, investmentResponse] =
          await Promise.all([
            api.get(`/advisor/clients/${clientId}`, config),
            api.get(
              `/advisor/clients/${clientId}/investments`,
              config
            ),
          ]);

        setClient(clientResponse.data.client);
        setInvestments(investmentResponse.data.investments || []);
        setTotalInvested(
          Number(investmentResponse.data.total_invested || 0)
        );
      } catch (err) {
        console.error("Client Details Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load client details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const datePart = String(date).split("T")[0];
    const [year, month, day] = datePart.split("-");

    return `${day}/${month}/${year}`;
  };

  const phone = client?.phone || "";
  const whatsappNumber = phone.replace(/\D/g, "");

  const formattedWhatsappNumber =
    whatsappNumber.length === 10
      ? `91${whatsappNumber}`
      : whatsappNumber;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3faf6] p-8 text-center text-gray-600">
        Loading client details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3faf6] p-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/advisor/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3faf6] p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          to="/advisor/dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-emerald-700">
            NiveshTrack / Advisor Panel / Client Details
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Client Details
          </h1>

          <p className="mt-2 text-gray-500">
            View client information and investment portfolio.
          </p>
        </div>

        {/* Client Information */}
        {client && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">

            <div className="border-b border-gray-100 bg-emerald-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {client.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Client ID: #{client.id}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    client.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {client.status}
                </span>
              </div>

              {/* Contact Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {phone ? (
                  <>
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                      <Phone size={18} />
                      Call Now
                    </a>

                    <a
                      href={`https://wa.me/${formattedWhatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      <MessageCircle size={18} />
                      WhatsApp Message
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    Phone number is not available.
                  </p>
                )}
              </div>
            </div>

            {/* Client Information Cards */}
            <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="mt-2 font-semibold text-gray-900">
                  {client.name}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="mt-2 break-all font-semibold text-gray-900">
                  {client.email}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="mt-2 font-semibold text-gray-900">
                  {client.phone || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="mt-2 font-semibold capitalize text-gray-900">
                  {client.status}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">Client ID</p>
                <p className="mt-2 font-semibold text-gray-900">
                  #{client.id}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-500">
                  Registration Date
                </p>
                <p className="mt-2 font-semibold text-gray-900">
                  {formatDate(client.created_at)}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Investment Summary */}
        <div className="mb-6">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Client Investment Overview
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Total Invested
                </p>
                <Wallet className="text-emerald-700" size={25} />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {formatCurrency(totalInvested)}
              </h3>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Total Investments
                </p>
                <Layers className="text-emerald-700" size={25} />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {investments.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Active Investments
                </p>
                <TrendingUp className="text-emerald-700" size={25} />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {
                  investments.filter(
                    (item) => item.status === "active"
                  ).length
                }
              </h3>
            </div>

          </div>
        </div>

        {/* Investments Table */}
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">

          <div className="border-b border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Client Investments
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              All investments registered under this client.
            </p>
          </div>

          {investments.length === 0 ? (
            <div className="p-10 text-center">
              <Wallet
                size={40}
                className="mx-auto mb-3 text-gray-300"
              />

              <h3 className="font-semibold text-gray-700">
                No Investments Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                This client has not added any investments yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">

                <thead className="bg-emerald-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-5 py-4">Product Name</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Invested Amount</th>
                    <th className="px-5 py-4">Units</th>
                    <th className="px-5 py-4">Purchase NAV</th>
                    <th className="px-5 py-4">Investment Date</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {investments.map((investment) => (
                    <tr
                      key={investment.id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {investment.product_name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Folio: {investment.folio_number || "N/A"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                          {investment.investment_type.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {formatCurrency(investment.invested_amount)}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {investment.units ?? "N/A"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {investment.purchase_nav ?? "N/A"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {formatDate(investment.investment_date)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            investment.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : investment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {investment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdvisorClientDetails;
