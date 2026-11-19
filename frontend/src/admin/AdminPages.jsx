
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const pageData = {
  services: {
    title: "Services",
    description: "Manage your financial advisory services.",
    columns: ["Service Name", "Description", "Status", "Actions"],
  },
  blogs: {
    title: "Blogs",
    description: "Manage website articles and blog posts.",
    columns: ["Blog Title", "Author", "Status"],
  },
  enquiries: {
    title: "Enquiries",
    description: "Review enquiries submitted by website visitors.",
  },
  users: {
    title: "Users",
    description: "Manage registered website users.",
    columns: ["Name", "Email", "Role"],
  },
};

const initialServiceForm = {
  service_name: "",
  description: "",
  status: "active",
};

export default function AdminPages({ type }) {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [services, setServices] = useState([]);

  const [selectedService, setSelectedService] = useState(null);

  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const page = pageData[type];

  const getAuthConfig = () => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // FETCH USERS
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/auth/users",
        getAuthConfig()
      );

      setUsers(response.data.users || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // FETCH CONTACT ENQUIRIES
  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/enquiries",
        getAuthConfig()
      );

      setEnquiries(response.data.enquiries || []);
    } catch (err) {
      console.error("Fetch Enquiries Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load contact enquiries."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // FETCH SERVICES
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/services",
        getAuthConfig()
      );

      setServices(response.data.services || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load services."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // LOAD PAGE DATA
  useEffect(() => {
    setSearch("");
    setSuccess("");
    setError("");

    if (type === "users") {
      fetchUsers();
    } else if (type === "enquiries") {
      fetchEnquiries();
    } else if (type === "services") {
      fetchServices();
    }
  }, [type, fetchUsers, fetchEnquiries, fetchServices]);

  if (!page) return <p>Page not found.</p>;

  // FILTER USERS
  const filteredUsers = users.filter((user) => {
    const query = search.trim().toLowerCase();

    return (
      !query ||
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  });

  // FILTER CONTACT ENQUIRIES
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const query = search.trim().toLowerCase();

    return (
      !query ||
      enquiry.name?.toLowerCase().includes(query) ||
      enquiry.email?.toLowerCase().includes(query) ||
      enquiry.phone?.toLowerCase().includes(query) ||
      enquiry.message?.toLowerCase().includes(query) ||
      enquiry.service?.toLowerCase().includes(query)
    );
  });

  // FILTER SERVICES
  const filteredServices = services.filter((service) => {
    const query = search.trim().toLowerCase();

    return (
      !query ||
      service.service_name?.toLowerCase().includes(query) ||
      service.description?.toLowerCase().includes(query) ||
      service.status?.toLowerCase().includes(query)
    );
  });

  // ADD SERVICE
  const handleAddService = () => {
    setSelectedService(null);
    setServiceForm(initialServiceForm);
    setError("");
    setSuccess("");
    setShowServiceForm(true);
  };

  // EDIT SERVICE
  const handleEditService = (service) => {
    setSelectedService(service);

    setServiceForm({
      service_name: service.service_name || "",
      description: service.description || "",
      status: service.status || "active",
    });

    setError("");
    setSuccess("");
    setShowServiceForm(true);
  };

  // SAVE SERVICE
  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        service_name: serviceForm.service_name.trim(),
        description: serviceForm.description.trim(),
        status: serviceForm.status,
      };

      let response;

      if (selectedService) {
        response = await api.put(
          `/services/${selectedService.id}`,
          payload,
          getAuthConfig()
        );
      } else {
        response = await api.post(
          "/services",
          payload,
          getAuthConfig()
        );
      }

      setShowServiceForm(false);
      setSelectedService(null);
      setServiceForm(initialServiceForm);

      setSuccess(
        response.data.message ||
          (selectedService
            ? "Service updated successfully."
            : "Service added successfully.")
      );

      await fetchServices();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE SERVICE
  const handleDeleteService = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this service?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await api.delete(
        `/services/${id}`,
        getAuthConfig()
      );

      setServices((previous) =>
        previous.filter((service) => service.id !== id)
      );

      setSuccess(
        response.data.message || "Service deleted successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to delete service."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const refreshData =
    type === "users"
      ? fetchUsers
      : type === "enquiries"
      ? fetchEnquiries
      : fetchServices;

  return (
    <div>
      {/* PAGE HEADING */}
      <h1 className="text-3xl font-bold text-slate-900">
        {page.title}
      </h1>

      <p className="mt-2 text-slate-500">
        {page.description}
      </p>

      {/* MAIN CONTENT */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">

        {/* TOP SEARCH AND BUTTONS */}
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row">
          <input
            type="search"
            placeholder={`Search ${page.title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#3D7A89] sm:max-w-sm"
          />

          {(type === "users" ||
            type === "enquiries" ||
            type === "services") && (
            <button
              type="button"
              onClick={refreshData}
              disabled={loading}
              className="rounded-lg bg-[#3D7A89] px-5 py-3 text-white disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          )}

          {type === "services" && (
            <button
              type="button"
              onClick={handleAddService}
              className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              + Add Service
            </button>
          )}

          {type === "blogs" && (
            <button
              type="button"
              onClick={() =>
                alert("Blog management is not connected yet.")
              }
              className="rounded-lg bg-[#3D7A89] px-5 py-3 text-white"
            >
              + Add Blog
            </button>
          )}
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SERVICES TABLE */}
        {type === "services" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {page.columns.map((column) => (
                    <th key={column} className="px-4 py-4 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                      Loading services...
                    </td>
                  </tr>
                ) : filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 font-medium text-slate-800">
                        {service.service_name}
                      </td>

                      <td className="max-w-sm px-4 py-4 text-slate-600">
                        <p className="whitespace-pre-wrap break-words">
                          {service.description}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                          {service.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditService(service)}
                            className="rounded-lg bg-[#3D7A89] px-3 py-2 text-xs font-semibold text-white"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteService(service.id)}
                            disabled={deletingId === service.id}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            {deletingId === service.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                      No services found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              Showing {filteredServices.length} of {services.length} services.
            </div>
          </div>
        )}

        {/* USERS TABLE */}
        {type === "users" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {page.columns.map((column) => (
                    <th key={column} className="px-4 py-4 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-12 text-center text-slate-500">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 font-medium text-slate-800">
                        {user.name}
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-12 text-center text-slate-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              Showing {filteredUsers.length} of {users.length} users.
            </div>
          </div>
        )}

        {/* CONTACT ENQUIRIES TABLE */}
        {type === "enquiries" && (
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Contact Enquiries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                All enquiries submitted through the website contact form.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[950px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Name</th>
                    <th className="px-4 py-4 font-semibold">Email</th>
                    <th className="px-4 py-4 font-semibold">Phone</th>
                    <th className="px-4 py-4 font-semibold">Service</th>
                    <th className="px-4 py-4 font-semibold">Monthly Amount</th>
                    <th className="px-4 py-4 font-semibold">Message</th>
                    <th className="px-4 py-4 font-semibold">Submitted Date</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                        Loading contact enquiries...
                      </td>
                    </tr>
                  ) : filteredEnquiries.length > 0 ? (
                    filteredEnquiries.map((enquiry) => (
                      <tr
                        key={enquiry.id}
                        className="border-t border-slate-100 align-top hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 font-medium text-slate-800">
                          {enquiry.name}
                        </td>

                        <td className="px-4 py-4 text-slate-600">
                          {enquiry.email}
                        </td>

                        <td className="px-4 py-4 text-slate-600">
                          {enquiry.phone || "Not provided"}
                        </td>

                        <td className="px-4 py-4 text-slate-600">
                          {enquiry.service || "Not specified"}
                        </td>

                        <td className="px-4 py-4 text-slate-600">
                          {enquiry.monthly_amount !== null &&
                          enquiry.monthly_amount !== undefined &&
                          enquiry.monthly_amount !== ""
                            ? `₹${Number(enquiry.monthly_amount).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`
                            : "Not provided"}
                        </td>

                        <td className="max-w-xs px-4 py-4 text-slate-600">
                          <p className="whitespace-pre-wrap break-words">
                            {enquiry.message || "No message"}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                          {enquiry.created_at
                            ? new Date(enquiry.created_at).toLocaleString("en-IN")
                            : "Not available"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                        No contact enquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              Showing {filteredEnquiries.length} contact enquiries.
            </div>
          </section>
        )}
      </div>

      {/* ADD / EDIT SERVICE MODAL */}
      {showServiceForm && type === "services" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!saving) setShowServiceForm(false);
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedService ? "Edit Service" : "Add New Service"}
              </h2>

              <button
                type="button"
                disabled={saving}
                onClick={() => setShowServiceForm(false)}
                className="rounded-lg px-3 py-1 text-2xl text-slate-500 hover:bg-slate-100 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Service Name *
                </label>

                <input
                  type="text"
                  value={serviceForm.service_name}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      service_name: e.target.value,
                    })
                  }
                  placeholder="Enter service name"
                  maxLength={150}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#3D7A89]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description *
                </label>

                <textarea
                  rows={5}
                  value={serviceForm.description}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter service description"
                  required
                  className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#3D7A89]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={serviceForm.status}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#3D7A89]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-wrap justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setShowServiceForm(false)}
                  className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : selectedService
                    ? "Update Service"
                    : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
