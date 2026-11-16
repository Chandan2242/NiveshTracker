
import { useEffect, useState } from "react";
import api from "../services/api";

function getAdminName() {
  const savedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  try {
    const user = savedUser ? JSON.parse(savedUser) : null;
    return user?.name || "Admin";
  } catch {
    return "Admin";
  }
}

function getAuthConfig() {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export default function Dashboard() {
  const adminName = getAdminName();

  const [stats, setStats] = useState([
    { title: "Total Services", value: "..." },
    { title: "Total Blogs", value: "—" },
    { title: "New Enquiries", value: "..." },
    { title: "Total Users", value: "..." },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError("");

        const config = getAuthConfig();

        const [servicesRes, enquiriesRes, usersRes] =
          await Promise.all([
            api.get("/services", config),
            api.get("/enquiries", config),
            api.get("/auth/users", config),
          ]);

        setStats([
          {
            title: "Total Services",
            value: servicesRes.data.count ??
              servicesRes.data.services?.length ?? 0,
          },
          {
            title: "Total Blogs",
            value: "—",
          },
          {
            title: "New Enquiries",
            value: enquiriesRes.data.count ??
              enquiriesRes.data.enquiries?.length ?? 0,
          },
          {
            title: "Total Users",
            value: usersRes.data.count ??
              usersRes.data.users?.length ?? 0,
          },
        ]);
      } catch (err) {
        console.error("Dashboard Stats Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-500">
        Welcome, {adminName}, to your NiveshTrack administration panel.
      </p>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {loading ? "..." : item.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">
          Quick Overview
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your dashboard statistics are connected to your
          NiveshTrack database.
        </p>

        <p className="mt-3 text-xs text-slate-400">
          Blog statistics will be available after the Blogs
          management API is implemented.
        </p>
      </div>
    </div>
  );
}
