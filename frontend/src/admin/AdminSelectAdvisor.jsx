


import { useEffect, useState } from "react";
import api from "../services/api";

function getToken() {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
}

function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong. Please try again."
  );
}

export default function AdminSelectAdvisor() {
  const [advisors, setAdvisors] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [email, setEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [loadingAdvisors, setLoadingAdvisors] = useState(true);
  const [searching, setSearching] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  // Fetch Existing Advisors
  const fetchAdvisors = async () => {
    try {
      setLoadingAdvisors(true);
      setError("");

      const response = await api.get(
        "/auth/advisors",
        requestConfig
      );

      const data = response.data;

      setAdvisors(
        Array.isArray(data)
          ? data
          : data.advisors || data.users || data.data || []
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingAdvisors(false);
    }
  };

  useEffect(() => {
    fetchAdvisors();
  }, []);

  // Search Registered Users By Email
  const handleSearch = async (e) => {
    e.preventDefault();

    const searchEmail = email.trim();

    if (!searchEmail) {
      setError("Please enter a registered user's email address.");
      return;
    }

    setSearching(true);
    setError("");
    setSuccess("");
    setSelectedUser(null);
    setCandidates([]);

    try {
      const response = await api.get(
        "/auth/advisor-candidates",
        {
          ...requestConfig,
          params: {
            email: searchEmail,
          },
        }
      );

      const data = response.data;

      const users = Array.isArray(data)
        ? data
        : data.users || data.candidates || data.data || [];

      setCandidates(users);

      if (users.length === 0) {
        setError(
          "No eligible registered client found with this email."
        );
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSearching(false);
    }
  };

  // Promote Existing Client To Advisor
  const handlePromote = async () => {
    if (!selectedUser) {
      setError("Please select a user first.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to make ${selectedUser.name} an Advisor?`
    );

    if (!confirmed) return;

    setPromoting(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.put(
        `/auth/users/${selectedUser.id}/promote-advisor`,
        {},
        requestConfig
      );

      setSuccess(
        response.data?.message ||
          `${selectedUser.name} has been promoted to Advisor successfully.`
      );

      setSelectedUser(null);
      setCandidates([]);
      setEmail("");

      await fetchAdvisors();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setPromoting(false);
    }
  };

  // Remove Advisor Privilege (Do Not Delete Account)
  const handleRemoveAdvisor = async (advisor) => {
    const confirmed = window.confirm(
      `Remove Advisor privilege from ${advisor.name}?\n\nTheir account and login credentials will remain. Their role will change back to Client.`
    );

    if (!confirmed) return;

    setRemovingId(advisor.id);
    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/auth/advisors/${advisor.id}`,
        requestConfig
      );

      setSuccess(
        response.data?.message ||
          `${advisor.name} is now a Client. The account has not been deleted.`
      );

      await fetchAdvisors();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Select Advisor
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Promote an existing registered client to Advisor or
          remove Advisor privileges without deleting their account.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Search Registered User */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Promote Registered User
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search using the email address of an existing registered client.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter registered user's email address"
            className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#007A55] focus:ring-2 focus:ring-[#007A55]/10"
          />

          <button
            type="submit"
            disabled={searching}
            className="rounded-xl bg-[#007A55] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#006344] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {searching ? "Searching..." : "Search User"}
          </button>
        </form>

        {/* Search Results */}
        {candidates.length > 0 && (
          <div className="mt-7">
            <h3 className="mb-3 text-sm font-bold text-slate-800">
              Registered User Results
            </h3>

            <div className="space-y-3">
              {candidates.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    setSelectedUser(user);
                    setError("");
                  }}
                  className={`flex w-full flex-col gap-3 rounded-xl border p-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${
                    selectedUser?.id === user.id
                      ? "border-[#007A55] bg-emerald-50"
                      : "border-slate-200 hover:border-[#007A55]"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.email}
                    </p>

                    {user.phone && (
                      <p className="mt-1 text-xs text-slate-500">
                        {user.phone}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Client
                    </span>

                    <span className="text-sm font-semibold text-[#007A55]">
                      {selectedUser?.id === user.id
                        ? "Selected ✓"
                        : "Select"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected User */}
        {selectedUser && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-bold text-emerald-900">
              Selected User
            </h3>

            <p className="mt-2 text-sm text-emerald-800">
              {selectedUser.name} ({selectedUser.email})
            </p>

            <p className="mt-2 text-xs text-emerald-700">
              This user's existing account and password will remain unchanged.
              Only their role will change from Client to Advisor.
            </p>

            <button
              type="button"
              onClick={handlePromote}
              disabled={promoting}
              className="mt-5 rounded-xl bg-[#007A55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#006344] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {promoting
                ? "Promoting..."
                : "Confirm & Promote to Advisor"}
            </button>
          </div>
        )}
      </section>

      {/* Existing Advisors */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Existing Advisors
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your currently active Advisor accounts.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchAdvisors}
            disabled={loadingAdvisors}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            {loadingAdvisors ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loadingAdvisors ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Loading advisors...
          </div>
        ) : advisors.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-semibold text-slate-700">
              No Advisors Found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Search a registered client above to promote them to Advisor.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Advisor</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Assigned Clients</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {advisors.map((advisor) => (
                    <tr key={advisor.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {advisor.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {advisor.email}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {advisor.phone || "—"}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {advisor.assigned_clients ?? 0}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {advisor.status || "active"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleRemoveAdvisor(advisor)}
                          disabled={removingId === advisor.id}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {removingId === advisor.id
                            ? "Removing..."
                            : "Remove Advisor"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 p-4 md:hidden">
              {advisors.map((advisor) => (
                <div
                  key={advisor.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {advisor.name}
                      </h3>

                      <p className="mt-1 break-all text-sm text-slate-500">
                        {advisor.email}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {advisor.phone || "Phone not available"}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {advisor.status || "active"}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    Assigned Clients:{" "}
                    <strong>
                      {advisor.assigned_clients ?? 0}
                    </strong>
                  </p>

                  <button
                    type="button"
                    onClick={() => handleRemoveAdvisor(advisor)}
                    disabled={removingId === advisor.id}
                    className="mt-4 w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {removingId === advisor.id
                      ? "Removing..."
                      : "Remove Advisor"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
