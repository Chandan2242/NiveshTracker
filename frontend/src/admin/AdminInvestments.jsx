
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import AdminInvestmentRequests from "./AdminInvestmentRequests";

const initialForm = {
  user_id: "",
  investment_type: "mutual_fund",
  product_name: "",
  folio_number: "",
  invested_amount: "",
  units: "",
  purchase_nav: "",
  investment_date: "",
  status: "active",
  notes: "",
};

const investmentTypes = [
  { value: "mutual_fund", label: "Mutual Fund" },
  { value: "pms", label: "PMS" },
  { value: "aif", label: "AIF" },
  { value: "sif", label: "SIF" },
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

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getTypeLabel = (type) =>
  investmentTypes.find((item) => item.value === type)?.label || type;

function ClientSearchSelect({
  clients,
  value,
  onChange,
  loading = false,
}) {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const selectedClient = clients.find(
    (client) => String(client.id) === String(value)
  );

  const filteredClients = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) return clients;

    return clients.filter(
      (client) =>
        client.name?.toLowerCase().includes(query) ||
        client.email?.toLowerCase().includes(query)
    );
  }, [clients, searchText]);

  return (
    <div className="relative">
      <label className={labelClass}>
        Search Client by Name or Email{" "}
        <span className="text-red-500">*</span>
      </label>

      <input
        type="search"
        value={searchText}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearchText(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        placeholder={
          loading
            ? "Loading clients..."
            : "Enter client name or email..."
        }
        className={inputClass}
        disabled={loading}
        autoComplete="off"
      />

      {selectedClient && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-emerald-800">
              {selectedClient.name}
            </p>
            <p className="text-xs text-emerald-700">
              {selectedClient.email}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onChange("");
              setSearchText("");
              setOpen(true);
            }}
            className="text-xs font-semibold text-red-600 hover:text-red-700"
          >
            Change Client
          </button>
        </div>
      )}

      {open && (
        <>
          <button
            type="button"
            aria-label="Close client search results"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
            {loading ? (
              <p className="p-4 text-sm text-slate-500">
                Loading clients...
              </p>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => {
                    onChange(String(client.id));
                    setSearchText("");
                    setOpen(false);
                  }}
                  className={`block w-full border-b border-slate-100 px-4 py-3 text-left transition last:border-0 hover:bg-emerald-50 ${
                    String(value) === String(client.id)
                      ? "bg-emerald-50"
                      : ""
                  }`}
                >
                  <span className="block text-sm font-semibold text-slate-800">
                    {client.name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {client.email}
                  </span>
                </button>
              ))
            ) : (
              <p className="p-4 text-sm text-red-500">
                No client found. Please check the name or email.
              </p>
            )}
          </div>
        </>
      )}

      {!loading && clients.length === 0 && (
        <p className="mt-2 text-sm text-amber-600">
          No active clients found.
        </p>
      )}
    </div>
  );
}

export default function AdminInvestments() {
  const [clients, setClients] = useState([]);
  const [investments, setInvestments] = useState([]);

  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingInvestments, setLoadingInvestments] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editingInvestment, setEditingInvestment] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  // Fetch Active Clients
  const fetchClients = useCallback(async () => {
    try {
      setLoadingClients(true);

      const response = await api.get(
        "/admin/investments/clients",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setClients(response.data.clients || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load clients."
      );
    } finally {
      setLoadingClients(false);
    }
  }, []);

  // Fetch All Investments
  const fetchInvestments = useCallback(async () => {
    try {
      setLoadingInvestments(true);
      setError("");

      const response = await api.get(
        "/admin/investments/all",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setInvestments(response.data.investments || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load investments."
      );
    } finally {
      setLoadingInvestments(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
    fetchInvestments();
  }, [fetchClients, fetchInvestments]);

  // Handle Add Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Add Investment
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.user_id) {
      setError("Please select a client.");
      return;
    }

    if (!form.product_name.trim()) {
      setError("Please enter the product name.");
      return;
    }

    if (
      form.invested_amount === "" ||
      !Number.isFinite(Number(form.invested_amount)) ||
      Number(form.invested_amount) < 0
    ) {
      setError("Please enter a valid invested amount.");
      return;
    }

    if (
      form.units !== "" &&
      (!Number.isFinite(Number(form.units)) ||
        Number(form.units) < 0)
    ) {
      setError("Please enter valid units.");
      return;
    }

    if (
      form.purchase_nav !== "" &&
      (!Number.isFinite(Number(form.purchase_nav)) ||
        Number(form.purchase_nav) < 0)
    ) {
      setError("Please enter a valid purchase NAV.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        user_id: Number(form.user_id),
        product_name: form.product_name.trim(),
        invested_amount: Number(form.invested_amount),
        units:
          form.units === "" ? null : Number(form.units),
        purchase_nav:
          form.purchase_nav === ""
            ? null
            : Number(form.purchase_nav),
        folio_number: form.folio_number.trim(),
        notes: form.notes.trim(),
      };

      const response = await api.post(
        "/admin/investments/add-investment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setForm(initialForm);

      await fetchInvestments();

      setSuccess(
        response.data.message ||
          "Investment added successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to add investment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    const investmentDate = item.investment_date
      ? (() => {
          const date = new Date(item.investment_date);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        })()
      : "";

    setEditingInvestment(item);

    setEditForm({
      user_id: String(item.user_id),
      investment_type: item.investment_type || "mutual_fund",
      product_name: item.product_name || "",
      folio_number: item.folio_number || "",
      invested_amount: item.invested_amount ?? "",
      units: item.units ?? "",
      purchase_nav: item.purchase_nav ?? "",
      investment_date: investmentDate,
      status: item.status || "active",
      notes: item.notes || "",
    });

    setError("");
    setSuccess("");
  };

  // Handle Edit Form Changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Update Investment
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingInvestment) return;

    setError("");
    setSuccess("");

    if (!editForm.user_id || !editForm.product_name.trim()) {
      setError("Please select a client and enter the product name.");
      return;
    }

    if (
      editForm.invested_amount === "" ||
      !Number.isFinite(Number(editForm.invested_amount)) ||
      Number(editForm.invested_amount) < 0
    ) {
      setError("Please enter a valid invested amount.");
      return;
    }

    try {
      setUpdating(true);

      const payload = {
        ...editForm,
        user_id: Number(editForm.user_id),
        product_name: editForm.product_name.trim(),
        invested_amount: Number(editForm.invested_amount),
        units:
          editForm.units === ""
            ? null
            : Number(editForm.units),
        purchase_nav:
          editForm.purchase_nav === ""
            ? null
            : Number(editForm.purchase_nav),
        folio_number: editForm.folio_number.trim(),
        notes: editForm.notes.trim(),
      };

      const response = await api.put(
        `/admin/investments/${editingInvestment.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setEditingInvestment(null);

      await fetchInvestments();

      setSuccess(
        response.data.message ||
          "Investment updated successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update investment."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Delete Investment
  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.product_name}" for ${item.client_name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      setDeletingId(item.id);

      const response = await api.delete(
        `/admin/investments/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      await fetchInvestments();

      setSuccess(
        response.data.message ||
          "Investment deleted successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete investment."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Search and Status Filter
  const filteredInvestments = investments.filter((item) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      item.client_name?.toLowerCase().includes(searchText) ||
      item.client_email?.toLowerCase().includes(searchText) ||
      item.product_name?.toLowerCase().includes(searchText) ||
      item.folio_number?.toLowerCase().includes(searchText) ||
      getTypeLabel(item.investment_type)
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalInvested = investments.reduce(
    (total, item) =>
      total + Number(item.invested_amount || 0),
    0
  );

  const activeCount = investments.filter(
    (item) => item.status === "active"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Heading */}
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Admin Management
          </p>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Manage Investments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage client investments from one place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Investments
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {investments.length}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Registered records
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Invested Amount
            </p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-700">
              {formatCurrency(totalInvested)}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Across all clients
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Investments
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {activeCount}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Currently active records
            </p>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* Client Investment Requests */}
        <AdminInvestmentRequests />

        {/* Add Investment Form */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
            <h2 className="text-lg font-bold text-slate-900">
              Add New Investment
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add an investment to a client's account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7 p-5 sm:p-8"
          >
            {/* Client Information */}
            <div>
              <h3 className="mb-4 text-base font-bold text-slate-800">
                Client Information
              </h3>

              <ClientSearchSelect
                clients={clients}
                value={form.user_id}
                loading={loadingClients}
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    user_id: value,
                  }));
                  setError("");
                  setSuccess("");
                }}
              />
            </div>

            {/* Investment Details */}
            <div>
              <h3 className="mb-4 border-t border-slate-100 pt-6 text-base font-bold text-slate-800">
                Investment Details
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                <div>
                  <label className={labelClass}>
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    value={form.product_name}
                    onChange={handleChange}
                    placeholder="e.g. HDFC Flexi Cap Fund"
                    className={inputClass}
                    maxLength={200}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Folio Number</label>
                  <input
                    type="text"
                    name="folio_number"
                    value={form.folio_number}
                    onChange={handleChange}
                    placeholder="Enter folio number"
                    className={inputClass}
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Invested Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="invested_amount"
                    value={form.invested_amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className={inputClass}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Units</label>
                  <input
                    type="number"
                    name="units"
                    value={form.units}
                    onChange={handleChange}
                    placeholder="Enter units"
                    className={inputClass}
                    min="0"
                    step="0.0001"
                  />
                </div>

                <div>
                  <label className={labelClass}>Purchase NAV (₹)</label>
                  <input
                    type="number"
                    name="purchase_nav"
                    value={form.purchase_nav}
                    onChange={handleChange}
                    placeholder="Enter purchase NAV"
                    className={inputClass}
                    min="0"
                    step="0.0001"
                  />
                </div>

                <div>
                  <label className={labelClass}>Investment Date</label>
                  <input
                    type="date"
                    name="investment_date"
                    value={form.investment_date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Investment Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="redeemed">Redeemed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className={labelClass}>Additional Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Enter additional information..."
                rows={4}
                className={inputClass}
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Fields marked with * are required.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setError("");
                    setSuccess("");
                  }}
                  disabled={submitting}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Reset Form
                </button>

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    loadingClients ||
                    clients.length === 0
                  }
                  className="rounded-xl bg-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Saving Investment..." : "Add Investment"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* All Investments Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All Investments
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View investments registered for all clients.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchInvestments}
                disabled={loadingInvestments}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                {loadingInvestments ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-5 sm:grid-cols-2 sm:px-8">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search client, email, product or folio..."
              className={inputClass}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={inputClass}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="redeemed">Redeemed</option>
            </select>
          </div>

          {/* Investment Records */}
          {loadingInvestments ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading investments...
            </div>
          ) : filteredInvestments.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="font-semibold text-slate-800">
                No Investments Found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                No records match your search or filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Client</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Units</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredInvestments.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {item.client_name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.client_email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {item.product_name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Folio: {item.folio_number || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {getTypeLabel(item.investment_type)}
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {formatCurrency(item.invested_amount)}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {item.units ?? "—"}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(item.investment_date)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            item.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : item.status === "pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={deletingId === item.id}
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === item.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:px-8">
            Showing {filteredInvestments.length} of {investments.length} investment records.
          </div>
        </div>

        {/* Edit Investment Modal */}
        {editingInvestment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
            <div className="my-8 w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Edit Investment
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Update the selected client's investment details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingInvestment(null)}
                  disabled={updating}
                  aria-label="Close edit modal"
                  className="rounded-lg px-3 py-1 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                >
                  &times;
                </button>
              </div>

              <form
                onSubmit={handleUpdate}
                className="space-y-5 p-5 sm:p-7"
              >
                <ClientSearchSelect
                  clients={clients}
                  value={editForm.user_id}
                  loading={loadingClients}
                  onChange={(value) => {
                    setEditForm((prev) => ({
                      ...prev,
                      user_id: value,
                    }));
                    setError("");
                    setSuccess("");
                  }}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Investment Type *
                    </label>
                    <select
                      name="investment_type"
                      value={editForm.investment_type}
                      onChange={handleEditChange}
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

                  <div>
                    <label className={labelClass}>Product Name *</label>
                    <input
                      type="text"
                      name="product_name"
                      value={editForm.product_name}
                      onChange={handleEditChange}
                      className={inputClass}
                      maxLength={200}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Folio Number</label>
                    <input
                      type="text"
                      name="folio_number"
                      value={editForm.folio_number}
                      onChange={handleEditChange}
                      className={inputClass}
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Invested Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="invested_amount"
                      value={editForm.invested_amount}
                      onChange={handleEditChange}
                      className={inputClass}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Units</label>
                    <input
                      type="number"
                      name="units"
                      value={editForm.units}
                      onChange={handleEditChange}
                      className={inputClass}
                      min="0"
                      step="0.0001"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Purchase NAV (₹)</label>
                    <input
                      type="number"
                      name="purchase_nav"
                      value={editForm.purchase_nav}
                      onChange={handleEditChange}
                      className={inputClass}
                      min="0"
                      step="0.0001"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Investment Date</label>
                    <input
                      type="date"
                      name="investment_date"
                      value={editForm.investment_date}
                      onChange={handleEditChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Status</label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className={inputClass}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="redeemed">Redeemed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={editForm.notes}
                    onChange={handleEditChange}
                    rows={3}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingInvestment(null)}
                    disabled={updating}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updating || clients.length === 0}
                    className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
