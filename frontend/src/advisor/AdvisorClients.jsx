
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const AdvisorClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/advisor/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClients(response.data.clients || []);
      } catch (err) {
        console.error("Advisor Clients Error:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load clients."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchClients();
    } else {
      setError("Please login to access your clients.");
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#f3faf6] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-emerald-700">
            NiveshTrack / Advisor Panel
          </p>

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            My Clients
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage clients assigned to your advisor account.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-gray-600 shadow-sm">
            Loading clients...
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white p-10 text-center shadow-sm">
            <h2 className="font-semibold text-gray-800">
              No clients assigned yet.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Your assigned clients will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5 md:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Assigned Clients ({clients.length})
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Client details and account status.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-gray-50">
                  <tr>
                    {["Client", "Email", "Phone", "Status", "Client ID", "Action"].map((heading) => (
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
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {client.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {client.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {client.phone || "Not provided"}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          client.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {client.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                        #{client.id}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          to={`/advisor/clients/${client.id}`}
                          className="inline-flex whitespace-nowrap rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvisorClients;
