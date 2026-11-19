
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/NiveshTracklogo.webp";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  EN: {
    otherServices: "Other services",
    theApp: "The app",
    calculators: "Calculators",
    resources: "Resources",
    riskProfile: "Risk Profile",
    riskDescription: "A 2-minute self-assessment",
    awareness: "Awareness Session",
    awarenessDescription: "For your organization",
    relationshipManager: "Relationship Manager",
    trustCompliance: "Trust & Compliance",
    logout: "Logout",
    dashboard: "Dashboard",
    loginSignup: "Login / Signup",
    login: "Login",
    signup: "Sign Up",
    getApp: "Get the app",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    home: "NiveshTrack Home",
    services: {
      PMS: "PMS",
      AIF: "AIF",
      SIF: "SIF",
      Insurance: "Insurance",
      "Tax Planning": "Tax Planning",
      "Estate Planning": "Estate Planning",
      "GIFT City Investing": "GIFT City Investing",
    },
  },

  HI: {
    otherServices: "अन्य सेवाएँ",
    theApp: "ऐप",
    calculators: "कैलकुलेटर",
    resources: "संसाधन",
    riskProfile: "जोखिम प्रोफाइल",
    riskDescription: "2 मिनट का स्वयं मूल्यांकन",
    awareness: "जागरूकता सत्र",
    awarenessDescription: "आपके संगठन के लिए",
    relationshipManager: "रिलेशनशिप मैनेजर",
    trustCompliance: "विश्वास और अनुपालन",
    logout: "लॉग आउट",
    dashboard: "Dashboard",
    loginSignup: "लॉगिन / साइनअप",
    login: "लॉगिन",
    signup: "साइन अप",
    getApp: "ऐप डाउनलोड करें",
    closeMenu: "मेन्यू बंद करें",
    openMenu: "मेन्यू खोलें",
    home: "NiveshTrack होम",
    services: {
      PMS: "PMS",
      AIF: "AIF",
      SIF: "SIF",
      Insurance: "बीमा",
      "Tax Planning": "टैक्स प्लानिंग",
      "Estate Planning": "एस्टेट प्लानिंग",
      "GIFT City Investing": "GIFT City निवेश",
    },
  },
};

const services = [
  { name: "PMS", path: "/pms" },
  { name: "AIF", path: "/aif" },
  { name: "SIF", path: "/sif" },
  { name: "Insurance", path: "/insurance" },
  { name: "Tax Planning", path: "/tax-planning" },
  { name: "Estate Planning", path: "/estate-planning" },
  { name: "GIFT City Investing", path: "/gift-city-investing" },
];

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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [user, setUser] = useState(() => getAuthUser());

  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.EN;

  const location = useLocation();
  const navigate = useNavigate();

  const resources = [
    {
      name: t.riskProfile,
      description: t.riskDescription,
      section: "risk-profile",
    },
    {
      name: t.awareness,
      description: t.awarenessDescription,
      section: "awareness",
    },
    {
      name: t.relationshipManager,
      path: "/relationship-manager",
    },
    {
      name: t.trustCompliance,
      path: "/trust-compliance",
    },
  ];

  useEffect(() => {
    setUser(getAuthUser());
  }, [location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
    setConnectOpen(false);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Navigate to Home App section instead of opening Play Store
  const goToSection = (id) => {
    closeMenu();

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  // THE APP and GET THE APP buttons
  const openPlayStore = () => {
    goToSection("app");
  };

  // Handle scrolling after navigation from another page
  useEffect(() => {
    const target = location.state?.scrollTo;

    if (location.pathname === "/" && target) {
      const timer = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        navigate("/", {
          replace: true,
          state: {},
        });
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.state, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);
    closeMenu();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `whitespace-nowrap text-[14px] font-bold transition-colors ${
      isActive
        ? "text-emerald-700"
        : "text-slate-800 hover:text-emerald-700"
    }`;

  const dropdownClass =
    "absolute left-0 top-full z-50 w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-xl";

  const dropdownLinkClass =
    "block w-full cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-700";

  const dropdownButtonClass =
    "flex items-center gap-1 whitespace-nowrap text-[14px] font-bold text-slate-800 transition hover:text-emerald-700";

  const handleResourceClick = (item) => {
    if (item.section) {
      goToSection(item.section);
    } else if (item.path) {
      closeMenu();
      navigate(item.path);
    }
  };

  const LanguageButtons = () => (
    <div className="flex shrink-0 items-center rounded-full border border-slate-200 p-1">
      <button
        type="button"
        onClick={() => changeLanguage("EN")}
        className={`rounded-full px-3 py-2 text-sm font-bold ${
          language === "EN"
            ? "bg-emerald-700 text-white"
            : "text-slate-700 hover:text-emerald-700"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("HI")}
        className={`rounded-full px-3 py-2 text-sm font-bold ${
          language === "HI"
            ? "bg-emerald-700 text-white"
            : "text-slate-700 hover:text-emerald-700"
        }`}
      >
        हिंदी
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <nav
        className="navbar-inner mx-auto flex min-h-[80px] w-full items-center justify-between gap-5 px-4 sm:px-6 lg:min-h-[82px] lg:px-8"
        aria-label="Main navigation"
      >
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
          aria-label={t.home}
        >
          <img
            src={logo}
            alt="NiveshTrack Logo"
            className="h-auto w-[115px] object-contain sm:w-[135px] lg:w-[145px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-6">

          {/* OTHER SERVICES */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className={dropdownButtonClass}
            >
              {t.otherServices}
              <ChevronDown
                size={15}
                strokeWidth={2.5}
                className={`transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {servicesOpen && (
              <div className={dropdownClass}>
                {services.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${dropdownLinkClass} ${
                        isActive ? "bg-emerald-50 text-emerald-700" : ""
                      }`
                    }
                  >
                    {t.services[item.name]}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* THE APP */}
          <button
            type="button"
            onClick={openPlayStore}
            className="shrink-0 whitespace-nowrap text-sm font-bold text-slate-800 transition hover:text-emerald-700"
          >
            {t.theApp}
          </button>

          {/* CALCULATORS */}
          <NavLink
            to="/financial-calculator"
            className={linkClass}
          >
            {t.calculators}
          </NavLink>

          {/* RESOURCES */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setResourcesOpen((prev) => !prev)}
              aria-expanded={resourcesOpen}
              className={dropdownButtonClass}
            >
              {t.resources}
              <ChevronDown
                size={15}
                strokeWidth={2.5}
                className={`transition-transform ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {resourcesOpen && (
              <div className={dropdownClass}>
                {resources.map((item) => (
                  <button
                    key={item.section || item.path}
                    type="button"
                    onClick={() => handleResourceClick(item)}
                    className={dropdownLinkClass}
                  >
                    <span className="block">{item.name}</span>

                    {item.description && (
                      <span className="mt-1 block text-xs font-bold text-slate-500">
                        {item.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <LanguageButtons />

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="whitespace-nowrap rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  {t.dashboard}
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="whitespace-nowrap rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                {t.logout}
              </button>
            </>
          ) : (
            <div
              className="relative shrink-0"
              onMouseEnter={() => setConnectOpen(true)}
              onMouseLeave={() => setConnectOpen(false)}
            >
              <button
                type="button"
                onClick={() => setConnectOpen((prev) => !prev)}
                aria-expanded={connectOpen}
                className="flex items-center gap-1 whitespace-nowrap rounded-lg border border-emerald-700 px-3 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                {t.loginSignup}
                <ChevronDown size={15} strokeWidth={2.5} />
              </button>

              {connectOpen && (
                <div className={`${dropdownClass} right-0 left-auto`}>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={dropdownLinkClass}
                  >
                    {t.login}
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className={dropdownLinkClass}
                  >
                    {t.signup}
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* GET THE APP */}
          <button
            type="button"
            onClick={openPlayStore}
            className="flex min-h-[64px] w-[112px] shrink-0 items-center justify-center rounded-full bg-[#5FA88D] px-4 text-center text-sm font-bold leading-5 text-white transition hover:bg-emerald-700"
          >
            {t.getApp}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setServicesOpen(false);
            setResourcesOpen(false);
            setConnectOpen(false);
          }}
          className="rounded-lg p-2 text-slate-800 hover:bg-slate-100 xl:hidden"
          aria-label={menuOpen ? t.closeMenu : t.openMenu}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* MOBILE / TABLET MENU */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg xl:hidden">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-1">

            {/* OTHER SERVICES */}
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              {t.otherServices}
              <ChevronDown
                size={16}
                className={servicesOpen ? "rotate-180" : ""}
              />
            </button>

            {servicesOpen && (
              <div className="ml-3 flex flex-col border-l-2 border-emerald-100 pl-3">
                {services.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={dropdownLinkClass}
                  >
                    {t.services[item.name]}
                  </NavLink>
                ))}
              </div>
            )}

            {/* THE APP */}
            <button
              type="button"
              onClick={openPlayStore}
              className={`${dropdownLinkClass} text-left`}
            >
              {t.theApp}
            </button>

            {/* CALCULATORS */}
            <NavLink
              to="/financial-calculator"
              onClick={closeMenu}
              className={dropdownLinkClass}
            >
              {t.calculators}
            </NavLink>

            {/* RESOURCES */}
            <button
              type="button"
              onClick={() => setResourcesOpen((prev) => !prev)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              {t.resources}
              <ChevronDown
                size={16}
                className={resourcesOpen ? "rotate-180" : ""}
              />
            </button>

            {resourcesOpen && (
              <div className="ml-3 flex flex-col border-l-2 border-emerald-100 pl-3">
                {resources.map((item) => (
                  <button
                    key={item.section || item.path}
                    type="button"
                    onClick={() => handleResourceClick(item)}
                    className={dropdownLinkClass}
                  >
                    <span className="block">{item.name}</span>

                    {item.description && (
                      <span className="mt-1 block text-xs font-bold text-slate-500">
                        {item.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* LANGUAGE */}
            <div className="flex items-center gap-2 border-t border-slate-100 px-3 pt-4">
              <LanguageButtons />
            </div>

            {/* LOGIN / DASHBOARD / LOGOUT */}
            <div className="mt-2 border-t border-slate-100 pt-4">
              {user ? (
                <div className="flex flex-col gap-2">
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-bold text-white"
                    >
                      {t.dashboard}
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-lg border border-emerald-700 px-4 py-3 text-center text-sm font-bold text-emerald-800"
                  >
                    {t.login}
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    {t.signup}
                  </Link>
                </div>
              )}
            </div>

            {/* GET THE APP */}
            <button
              type="button"
              onClick={openPlayStore}
              className="mt-3 rounded-full bg-[#5FA88D] px-4 py-3 text-center text-sm font-bold text-white"
            >
              {t.getApp}
            </button>

          </div>
        </div>
      )}
    </header>
  );
}
