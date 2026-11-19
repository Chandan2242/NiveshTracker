
import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/admin", icon: "▦" },
  { name: "Services", path: "/admin/services", icon: "◇" },
  { name: "Enquiries", path: "/admin/enquiries", icon: "✉" },
  { name: "Users", path: "/admin/users", icon: "♙" },
  { name: "Select Advisor", path: "/admin/select-advisor", icon: "♧" },
  { name: "Manage Investments", path: "/admin/investments", icon: "₹" },
];

function getStoredUser() {
  const savedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  try {
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(getStoredUser);

  useEffect(() => {
    setAdmin(getStoredUser());
  }, [location.pathname]);

  const currentPage =
    links.find(
      (link) =>
        link.path === location.pathname ||
        (link.path !== "/admin" &&
          location.pathname.startsWith(link.path + "/"))
    )?.name || "Dashboard";

  const adminName = admin?.name || "Admin";
  const adminEmail = admin?.email || "";
  const adminInitial = adminName.charAt(0).toUpperCase();
  const adminRole = admin?.role || "admin";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setAdmin(null);
    navigate("/login", { replace: true });
  }

  const logoutButtonClass =
    "inline-flex items-center justify-center rounded-xl bg-[#007A55] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#006344] active:scale-95";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 md:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xl"
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <Link to="/" className="flex flex-col items-center">
          <span className="text-lg font-bold text-[#007A55]">
            NiveshTrack
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-slate-500">
            ADMIN PANEL
          </span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className={logoutButtonClass}
        >
          Logout
        </button>
      </header>

      <div className="md:flex">

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 text-white md:sticky md:top-0 md:block md:h-screen md:w-64 md:shrink-0`}
        >

          {/* Sidebar Branding */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-bold text-white">
                NiveshTrack<span className="text-[#3D7A89">.</span>
              </span>
              <span className="text-xs font-semibold tracking-widest text-slate-400">
                ADMIN PANEL
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-slate-400 md:hidden"
              aria-label="Close navigation"
            >
              ×
            </button>
          </div>

          <div className="px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Workspace
            </p>

            <nav className="space-y-1">

              {/* Home Button */}
              <NavLink
                to="/"
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#007A55] text-white shadow-lg"
                      : "text-slate-300 hover:bg-[#007A55]/20 hover:text-white"
                  }`
                }
              >
                <span className="flex h-6 w-6 items-center justify-center text-lg">
                  ⌂
                </span>
                <span>Home</span>
              </NavLink>

              {/* Admin Menu Items */}
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#007A55] text-white shadow-lg"
                        : "text-slate-300 hover:bg-[#007A55]/20 hover:text-white"
                    }`
                  }
                >
                  <span className="flex h-6 w-6 items-center justify-center text-lg">
                    {link.icon}
                  </span>

                  <span>{link.name}</span>

                  <span className="ml-auto text-xs opacity-60">
                    ›
                  </span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">
                NiveshTrack Admin
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Manage your website content and enquiries from one place.
              </p>
            </div>
          </div>

          {/* Sidebar Logout */}
          <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center rounded-xl bg-[#007A55] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#006344] active:scale-95"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation backdrop"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}

        {/* Main Area */}
        <div className="min-w-0 flex-1">

          {/* Desktop Top Bar */}
          <header className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 md:flex">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Admin Panel / {currentPage}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {currentPage}
              </h2>
            </div>

            {/* Admin Details */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007A55]/10 font-bold uppercase text-[#007A55]">
                  {adminInitial}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {adminName}
                  </p>

                  <p className="text-xs text-slate-500">
                    {adminEmail || adminRole}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className={logoutButtonClass}
              >
                Logout
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>

          <footer className="border-t border-slate-200 px-6 py-5 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} NiveshTrack Admin Panel
          </footer>

        </div>
      </div>
    </div>
  );
}
