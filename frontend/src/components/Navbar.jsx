
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/NiveshTracklogo.webp";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Financial Calculator", path: "/financial-calculator" },
  { name: "NRI Services", path: "/nri-services" },
  { name: "Blog", path: "/blog" },
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

 const linkClass = ({ isActive }) =>
  `whitespace-nowrap text-sm font-semibold transition-colors xl:text-base ${
    isActive ? "text-emerald-700" : "text-slate-700 hover:text-emerald-700"
  }`;

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <nav
        className="mx-auto flex min-h-[78px] w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:min-h-[88px] lg:px-10"
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
            className="h-auto w-[125px] object-contain sm:w-[155px] lg:w-[165px] 2xl:w-[190px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-5 2xl:gap-7">
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
            className="relative text-sm font-semibold xl:text-base"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold xl:text-base text-slate-700 transition-colors hover:text-emerald-700 xl:text-sm "
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""
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
                      onClick={() => setServicesOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm transition-all duration-200 hover:translate-x-1 hover:bg-emerald-50 hover:text-emerald-700 ${isActive
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

        {/* DESKTOP LOGIN / SIGN UP */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <Link
            to="/login"
            className="whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 text-sm font-semibold xl:text-base"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="whitespace-nowrap rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 xl:px-5"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setServicesOpen(false);
          }}
          className="rounded-lg p-2 text-slate-800 transition hover:bg-slate-100 lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* MOBILE / TABLET MENU */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-3xl flex-col gap-1">
            {navItems.slice(0, 2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* MOBILE SERVICES DROPDOWN */}
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                size={16}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""
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
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2.5 text-sm ${isActive
                        ? "bg-emerald-50 font-medium text-emerald-700"
                        : "text-slate-600 hover:text-emerald-700"
                      }`
                    }
                  >
                    {service.name}
                  </NavLink>
                ))}
              </div>
            )}

            {navItems.slice(2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* MOBILE LOGIN / SIGN UP */}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-lg border border-emerald-700 px-4 py-3 text-center text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}