
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/NiveshTracklogo.webp";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Financial Calculator", path: "/financial-calculator" },
  { name: "Relationship Manager", path: "/relationship-manager" },
  { name: "Trust & Compliance", path: "/trust-compliance" },
  { name: "Contact", path: "/contact" },
];

const services = [
  { name: "Mutual Funds", path: "/mutual-funds" },
  { name: "Tax Consultancy", path: "/tax-consultancy" },
  { name: "Insurance", path: "/insurance" },
  { name: "Loans", path: "/loans" },
  { name: "FD & Bonds", path: "/fd-bonds" },
  { name: "Estate Planning", path: "/estate-planning" },
];

// Get logged-in user from storage
function getAuthUser() {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const savedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  if (!token || !savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

// Dashboard path according to user role
function getDashboardPath(user) {
  if (!user) return null;

  switch (user.role) {
    case "admin":
      return "/admin";

    case "client":
      return "/client/dashboard";

    case "advisor":
      return "/advisor/dashboard";

    default:
      return null;
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [user, setUser] = useState(() => getAuthUser());

  const location = useLocation();
  const navigate = useNavigate();

  const dashboardPath = getDashboardPath(user);

  // Update Navbar after login/logout and route change
  useEffect(() => {
    setUser(getAuthUser());
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `whitespace-nowrap text-sm font-semibold transition-colors ${
      isActive
        ? "text-emerald-700"
        : "text-slate-700 hover:text-emerald-700"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setConnectOpen(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);
    closeMenu();

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <nav
        className="mx-auto flex min-h-[78px] w-full max-w-[1440px] items-center justify-between gap-2 px-3 sm:px-5 lg:min-h-[82px] lg:px-5 xl:px-7"
        aria-label="Main navigation"
      >
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
          aria-label="NiveshTrack Home"
        >
          <img
            src={logo}
            alt="NiveshTrack Logo"
            className="h-auto w-[110px] object-contain sm:w-[135px] lg:w-[130px] xl:w-[150px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden flex-1 items-center justify-center gap-2 lg:flex xl:gap-3 2xl:gap-4">
          {navItems.slice(0, 2).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={linkClass}
            >
              {item.name}
            </NavLink>
          ))}

          {/* SERVICES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className="flex items-center gap-1 whitespace-nowrap text-sm !font-semibold text-slate-700 transition-colors hover:!text-emerald-700"
              style={{
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              <span>Services</span>

              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`shrink-0 transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 w-60 pt-3">
                <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                  {services.map((service) => (
                    <NavLink
                      key={service.path}
                      to={service.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm font-semibold transition hover:bg-emerald-50 hover:text-emerald-700 ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-700"
                        }`
                      }
                    >
                      {service.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navItems.slice(2).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={linkClass}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* DESKTOP CONNECT / DASHBOARD */}
        <div
          className="relative hidden shrink-0 lg:flex lg:items-center lg:gap-2"
          onMouseEnter={() => !user && setConnectOpen(true)}
          onMouseLeave={() => setConnectOpen(false)}
        >
          {user ? (
            <>
              {dashboardPath && (
                <Link
                  to={dashboardPath}
                  className="whitespace-nowrap rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  My Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="whitespace-nowrap rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setConnectOpen((prev) => !prev)}
                aria-expanded={connectOpen}
                className="flex items-center gap-1 whitespace-nowrap rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 xl:px-4"
              >
                Connect

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    connectOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {connectOpen && (
                <div className="absolute right-0 top-full z-50 w-44 pt-3">
                  <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setServicesOpen(false);
            setConnectOpen(false);
          }}
          className="rounded-lg p-2 text-slate-800 hover:bg-slate-100 lg:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-3xl flex-col gap-1">
            {navItems.slice(0, 2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* MOBILE SERVICES */}
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm !font-semibold text-slate-700 hover:bg-slate-50"
              style={{
                fontFamily: "inherit",
                fontWeight: 600,
              }}
              aria-expanded={servicesOpen}
            >
              <span>Services</span>

              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="ml-3 flex flex-col border-l-2 border-emerald-100 pl-3">
                {services.map((service) => (
                  <NavLink
                    key={service.path}
                    to={service.path}
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {service.name}
                  </NavLink>
                ))}
              </div>
            )}

            {/* OTHER NAV LINKS */}
            {navItems.slice(2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* MOBILE DASHBOARD / CONNECT / LOGOUT */}
            <div className="mt-3 border-t border-slate-100 pt-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  {dashboardPath && (
                    <Link
                      to={dashboardPath}
                      onClick={closeMenu}
                      className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      My Dashboard
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Connect with us
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="rounded-lg border border-emerald-700 px-4 py-3 text-center text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
