
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";

const menuItems = [
  { name: "Overview", path: "/client/dashboard", icon: "▦" },
  { name: "My Profile", path: "/client/profile", icon: "◉" },
  { name: "My Investments", path: "/client/investments", icon: "₹" },
  { name: "Portfolio", path: "/client/portfolio", icon: "▤" },
  { name: "My Advisor", path: "/client/advisor", icon: "♙" },
];

export default function ClientLayout() {
  const navigate = useNavigate();

  let user = {};

  try {
    const savedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    user = savedUser ? JSON.parse(savedUser) : {};
  } catch {
    user = {};
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  const logoutButtonClass =
    "w-full rounded-xl bg-[#007A55] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#006344] active:scale-95";

  return (
    <div className="min-h-screen bg-slate-50 md:flex">

      {/* Sidebar */}
      <aside className="flex w-full flex-col bg-emerald-950 text-white md:fixed md:inset-y-0 md:w-64">

        {/* Clickable Logo */}
        <div className="border-b border-white/10 px-6 py-6">
          <Link
            to="/"
            className="inline-block text-2xl font-bold"
            aria-label="Go to NiveshTrack website"
          >
            NiveshTrack
            <span className="text-emerald-400">.</span>
          </Link>

          <p className="mt-1 text-xs text-emerald-200">
            Client Portal
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-2 overflow-x-auto p-4 md:flex-1 md:flex-col md:overflow-visible">

          {/* Home Button */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#007A55] text-white shadow-lg"
                  : "text-emerald-100 hover:bg-[#007A55]/20 hover:text-white"
              }`
            }
          >
            <span className="text-lg">⌂</span>
            Home
          </NavLink>

          {/* Client Menu Items */}
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/client/dashboard"}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#007A55] text-white shadow-lg"
                    : "text-emerald-100 hover:bg-[#007A55]/20 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop User Details and Logout */}
        <div className="hidden border-t border-white/10 p-5 md:block">

          <p className="truncate text-sm font-semibold">
            {user.name || "Client"}
          </p>

          <p className="mt-1 truncate text-xs text-emerald-200">
            {user.email || ""}
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className={`${logoutButtonClass} mt-5`}
          >
            Logout
          </button>
        </div>

        {/* Mobile Logout */}
        <div className="border-t border-white/10 p-4 md:hidden">
          <button
            type="button"
            onClick={handleLogout}
            className={logoutButtonClass}
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 md:ml-64 md:p-8">
        <Outlet />
      </main>

    </div>
  );
}
