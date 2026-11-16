
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "under_review", label: "Under Review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
];

const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusClass = (status) => {
  const classes = {
    pending: "bg-amber-50 text-amber-700",
    under_review: "bg-blue-50 text-blue-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
    completed: "bg-slate-100 text-slate-700",
  };

  return classes[status] || "bg-slate-100 text-slate-600";
};

export default function AdminInvestmentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/admin/investments/requests",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setRequests(response.data.requests || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load investment requests."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const updateStatus = async (requestId, status) => {
    try {
      setUpdatingId(requestId);
      setError("");
      setSuccess("");

      const response = await api.patch(
        `/admin/investments/requests/${requestId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setRequests((previous) =>
        previous.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status,
                reviewed_at: new Date().toISOString(),
              }
            : request
        )
      );

      setSuccess(
        response.data.message ||
          "Investment request status updated successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update request status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      statusFilter === "all" ||
      request.status === statusFilter
  );

  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const reviewCount = requests.filter(
    (request) => request.status === "under_review"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "approved"
  ).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Client Requests
            </p>

            <h2 className="text-lg font-bold text-slate-900">
              Investment Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage investment requests submitted by clients.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchRequests}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Requests"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-b border-slate-100 p-5 sm:grid-cols-3 sm:px-8">
        <div className="rounded-xl bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-700">
            Pending Requests
          </p>
          <p className="mt-2 text-2xl font-bold text-amber-800">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            Under Review
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-800">
            {reviewCount}
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-700">
            Approved Requests
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-800">
            {approvedCount}
          </p>
        </div>
      </div>

      {error && (
        <div className="mx-5 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-8">
          {error}
        </div>
      )}

      {success && (
        <div className="mx-5 mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:mx-8">
          {success}
        </div>
      )}

      <div className="border-b border-slate-100 p-5 sm:px-8">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Filter by Request Status
        </label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 sm:max-w-xs"
        >
          <option value="all">All Requests</option>
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="p-10 text-center text-sm text-slate-500">
          Loading investment requests...
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="p-10 text-center">
          <h3 className="font-semibold text-slate-800">
            No Investment Requests Found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Client investment requests will appear here when submitted.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Investment</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Advisor</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Update Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {request.client_name || "—"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {request.client_email || "—"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {request.product_name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {request.investment_type}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {request.investment_mode === "LUMP_SUM"
                        ? "Lump Sum"
                        : request.investment_mode}
                    </p>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {formatCurrency(request.amount)}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {request.duration_months
                      ? `${request.duration_months} months`
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {request.advisor_name || "Not Assigned"}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {formatDate(request.created_at)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {statuses.find(
                        (item) => item.value === request.status
                      )?.label || request.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={request.status}
                      disabled={updatingId === request.id}
                      onChange={(e) =>
                        updateStatus(request.id, e.target.value)
                      }
                      className="min-w-36 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 disabled:opacity-50"
                    >
                      {statuses.map((status) => (
                        <option
                          key={status.value}
                          value={status.value}
                        >
                          {status.label}
                        </option>
                      ))}
                    </select>

                    {updatingId === request.id && (
                      <p className="mt-1 text-xs text-slate-500">
                        Updating...
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:px-8">
        Showing {filteredRequests.length} of {requests.length} requests.
      </div>
    </section>
  );
}
