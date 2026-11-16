
import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  Link,
} from "react-router-dom";

const AdvisorLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/advisor/dashboard",
      icon: "▦",
    },
    {
      name: "My Clients",
      path: "/advisor/clients",
      icon: "♙",
    },
    {
      name: "Client Portfolio",
      path: "/advisor/portfolio",
      icon: "◫",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#f3faf6]">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-emerald-100 bg-white transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Clickable Logo */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">

          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-[#007A55]"
              aria-label="Go to NiveshTrack website"
            >
              NiveshTrack
            </Link>

            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Advisor Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">

          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          {/* Home Button */}
          <NavLink
            to="/"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#007A55] text-white shadow-sm"
                  : "text-gray-600 hover:bg-[#007A55]/10 hover:text-[#007A55]"
              }`
            }
          >
            <span className="text-lg">⌂</span>
            Home
          </NavLink>

          {/* Advisor Menu Items */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#007A55] text-white shadow-sm"
                    : "text-gray-600 hover:bg-[#007A55]/10 hover:text-[#007A55]"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-xl bg-[#007A55] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#006344] active:scale-95"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 flex-1">

        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-emerald-100 bg-white px-4 py-3 md:hidden">

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-emerald-100 px-3 py-2 text-xl text-emerald-800"
            aria-label="Open menu"
          >
            ☰
          </button>

          <div>
            <Link
              to="/"
              className="font-bold text-[#007A55]"
              aria-label="Go to NiveshTrack website"
            >
              NiveshTrack
            </Link>

            <p className="text-xs text-gray-500">
              Advisor Panel
            </p>
          </div>
        </header>

        <main className="min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdvisorLayout;
