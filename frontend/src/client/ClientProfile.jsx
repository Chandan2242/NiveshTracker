
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ClientProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
  });

  const [phoneHistory, setPhoneHistory] = useState([]);

  const [newPhone, setNewPhone] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingPhone, setSavingPhone] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Get authentication token
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token")
    );
  };

  // Update stored user information
  const updateStoredUser = (updatedUser) => {
    if (localStorage.getItem("token")) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedUser = response.data.user;

        setUser({
          name: fetchedUser.name || "",
          email: fetchedUser.email || "",
          phone: fetchedUser.phone || "",
          role: fetchedUser.role || "",
          status: fetchedUser.status || "",
        });

        setPhoneHistory(response.data.phoneHistory || []);

        updateStoredUser(fetchedUser);

      } catch (err) {
        console.error("Profile loading error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");

          window.location.href = "/login";
          return;
        }

        setPhoneError(
          err.response?.data?.message ||
          "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= ADD NEW MOBILE =================
  const handleAddMobile = async (e) => {
    e.preventDefault();

    setPhoneMessage("");
    setPhoneError("");

    const cleanPhone = newPhone.trim();

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      setPhoneError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (cleanPhone === user.phone) {
      setPhoneError("This is already your current mobile number.");
      return;
    }

    try {
      setSavingPhone(true);

      const token = getToken();

      const response = await api.post(
        "/auth/add-mobile",
        {
          phone: cleanPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      setUser({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        role: updatedUser.role || "",
        status: updatedUser.status || "",
      });

      setPhoneHistory(response.data.phoneHistory || []);

      updateStoredUser(updatedUser);

      setNewPhone("");

      setPhoneMessage(
        response.data.message ||
        "Mobile number updated successfully."
      );

    } catch (err) {
      console.error("Add mobile error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        window.location.href = "/login";
        return;
      }

      setPhoneError(
        err.response?.data?.message ||
        "Unable to update mobile number."
      );
    } finally {
      setSavingPhone(false);
    }
  };

  // ================= PASSWORD INPUT =================
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });

    setPasswordMessage("");
    setPasswordError("");
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "New password must be different from current password."
      );
      return;
    }

    try {
      setSavingPassword(true);

      const token = getToken();

      const response = await api.put(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPasswordMessage(
        response.data.message ||
        "Password changed successfully."
      );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.error("Change password error:", err);

      if (err.response?.status === 401) {
        const message = err.response?.data?.message;

        if (message === "Current password is incorrect.") {
          setPasswordError(message);
          return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        window.location.href = "/login";
        return;
      }

      setPasswordError(
        err.response?.data?.message ||
        "Unable to change password. Please try again."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="font-medium text-emerald-700">
          Loading your profile...
        </p>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Client Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View your account information and manage your security details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* PROFILE SUMMARY */}
        <div className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold uppercase text-emerald-700">
            {user.name ? user.name.charAt(0) : "C"}
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            {user.name}
          </h2>

          <p className="mt-1 break-all text-sm text-slate-500">
            {user.email}
          </p>

          <div className="mt-5 border-t border-slate-100 pt-5">

            <p className="text-xs text-slate-400">
              Account Role
            </p>

            <p className="mt-1 font-semibold capitalize text-slate-800">
              {user.role}
            </p>

            <p className="mt-4 text-xs text-slate-400">
              Account Status
            </p>

            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              user.status === "active"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}>
              {user.status}
            </span>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6 lg:col-span-2">

          {/* PERSONAL INFORMATION */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your registered account details.
            </p>

            <div className="mt-6 space-y-5">

              {/* FULL NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 outline-none"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 outline-none"
                />
              </div>

              {/* CURRENT MOBILE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Current Mobile Number
                </label>

                <input
                  type="tel"
                  value={user.phone}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 outline-none"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Your current registered mobile number cannot be edited directly.
                </p>
              </div>

            </div>
          </div>

          {/* ADD NEW MOBILE NUMBER */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-900">
              Add New Mobile Number
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new number to replace your current registered mobile number.
            </p>

            <form onSubmit={handleAddMobile} className="mt-6 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Mobile Number
                </label>

                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => {
                    setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setPhoneMessage("");
                    setPhoneError("");
                  }}
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  required
                  placeholder="Enter new 10-digit mobile number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {phoneMessage && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  {phoneMessage}
                </div>
              )}

              {phoneError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  {phoneError}
                </div>
              )}

              <button
                type="submit"
                disabled={savingPhone}
                className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingPhone ? "Updating..." : "Add New Mobile Number"}
              </button>

            </form>
          </div>

          {/* OLD MOBILE NUMBER HISTORY */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-900">
              Previous Mobile Numbers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your previously registered mobile numbers are saved here.
            </p>

            <div className="mt-5">

              {phoneHistory.length > 0 ? (
                <div className="space-y-3">

                  {phoneHistory.map((item, index) => (
                    <div
                      key={`${item.phone}-${index}`}
                      className="flex flex-col justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.phone}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Previous mobile number
                        </p>
                      </div>

                      <p className="text-xs text-slate-500">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString("en-IN")
                          : ""}
                      </p>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-sm text-slate-500">
                  No previous mobile numbers available.
                </div>
              )}

            </div>
          </div>

          {/* CHANGE PASSWORD */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-900">
              Change Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your account password to keep your account secure.
            </p>

            <form onSubmit={handleChangePassword} className="mt-6 space-y-5">

              {/* CURRENT PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {passwordMessage && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  {passwordMessage}
                </div>
              )}

              {passwordError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                disabled={savingPassword}
                className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingPassword ? "Updating..." : "Update Password"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
