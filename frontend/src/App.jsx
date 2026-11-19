
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import { LanguageProvider, useLanguage } from "./context/LanguageContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Website Pages
import Home from "./pages/Home";
import About from "./pages/About";
import FinancialCalculator from "./pages/FinancialCalculator";
import RelationshipManager from "./pages/RelationshipManager";
import NRIServices from "./pages/NRIServices";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ServiceDetail, { AllServices } from "./pages/ServicePages";
import TrustCompliance from "./pages/TrustCompliance";
import InvestmentRequest from "./pages/InvestmentRequest";

// Admin Components
import AdminLayout from "./admin/AdminLayout.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import AdminPages from "./admin/AdminPages.jsx";
import AdminInvestments from "./admin/AdminInvestments.jsx";
import AdminSelectAdvisor from "./admin/AdminSelectAdvisor.jsx";

// Client Components
import ClientLayout from "./client/ClientLayout";
import ClientDashboard from "./client/ClientDashboard";
import ClientSection from "./client/ClientSection";
import ClientProfile from "./client/ClientProfile";
import ClientInvestments from "./client/ClientInvestments";

// ============================================
// GOOGLE TRANSLATE HELPERS
// ============================================

function clearGoogleTranslateCookie() {
  const expired =
    "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  document.cookie = `googtrans=; ${expired}`;

  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  document.cookie =
    `googtrans=; ${expired}; domain=${hostname}`;

  if (parts.length > 2) {
    const parentDomain = parts.slice(-2).join(".");

    document.cookie =
      `googtrans=; ${expired}; domain=.${parentDomain}`;

    document.cookie =
      `googtrans=; ${expired}; domain=${parentDomain}`;
  }
}

function applyGoogleLanguage(language) {
  const select = document.querySelector(".goog-te-combo");

  if (!select) return false;

  const targetLanguage = language === "HI" ? "hi" : "";

  if (language === "EN") {
    clearGoogleTranslateCookie();
  }

  if (select.value !== targetLanguage) {
    select.value = targetLanguage;

    select.dispatchEvent(
      new Event("change", { bubbles: true })
    );
  }

  return true;
}

// ============================================
// GOOGLE TRANSLATE MANAGER
// ============================================

function GoogleTranslateManager() {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  useEffect(() => {
    if (isAdminRoute) return;

    let attempts = 0;

    const initializeGoogleTranslate = () => {
      if (!window.google?.translate?.TranslateElement) {
        return false;
      }

      const widget = document.getElementById(
        "google_translate_element"
      );

      if (!widget) return false;

      if (widget.dataset.initialized !== "true") {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        widget.dataset.initialized = "true";
      }

      return true;
    };

    window.googleTranslateElementInit =
      initializeGoogleTranslate;

    let script = document.getElementById(
      "google-translate-script"
    );

    if (!script) {
      script = document.createElement("script");

      script.id = "google-translate-script";

      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      script.async = true;

      document.body.appendChild(script);
    }

    const retryInterval = window.setInterval(() => {
      attempts++;

      if (initializeGoogleTranslate()) {
        const savedLanguage =
          localStorage.getItem("nivesh-language") === "HI"
            ? "HI"
            : "EN";

        if (applyGoogleLanguage(savedLanguage)) {
          window.clearInterval(retryInterval);
        }
      }

      if (attempts >= 50) {
        window.clearInterval(retryInterval);
      }
    }, 300);

    return () => {
      window.clearInterval(retryInterval);
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) return;

    let attempts = 0;

    const retryInterval = window.setInterval(() => {
      attempts++;

      if (
        applyGoogleLanguage(language) ||
        attempts >= 50
      ) {
        window.clearInterval(retryInterval);
      }
    }, 300);

    return () => {
      window.clearInterval(retryInterval);
    };
  }, [language, isAdminRoute]);

  if (isAdminRoute) return null;

  return (
    <>
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />

      <style>
        {`
          .goog-te-banner-frame,
          .goog-te-banner-frame.skiptranslate {
            display: none !important;
          }

          html,
          body {
            top: 0 !important;
          }

          #goog-gt-tt,
          .goog-tooltip,
          .goog-tooltip:hover {
            display: none !important;
          }

          .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </>
  );
}

// ============================================
// SCROLL TO TOP
// ============================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

// ============================================
// AUTHENTICATION DATA
// ============================================

function getAuthData() {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const savedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    user = null;
  }

  return { token, user };
}

// ============================================
// ADMIN PROTECTION
// ============================================

function AdminRoute() {
  const { token, user } = getAuthData();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

// ============================================
// CLIENT PROTECTION
// ============================================

function ClientRoute() {
  const { token, user } = getAuthData();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "client") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

// ============================================
// INVESTMENT REQUEST PROTECTION
// ============================================

function InvestmentRequestRoute() {
  const { token, user } = getAuthData();

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: "/investment-request" }}
      />
    );
  }

  if (user.role !== "client") {
    return <Navigate to="/" replace />;
  }

  return <InvestmentRequest />;
}

// ============================================
// WEBSITE LAYOUT
// ============================================

function WebsiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <GoogleTranslateManager />

        <ScrollToTop />

        <Routes>
          {/* ADMIN PANEL */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />

              <Route
                path="services"
                element={<AdminPages type="services" />}
              />

              <Route
                path="enquiries"
                element={<AdminPages type="enquiries" />}
              />

              <Route
                path="users"
                element={<AdminPages type="users" />}
              />

              <Route
                path="select-advisor"
                element={<AdminSelectAdvisor />}
              />

              <Route
                path="investments"
                element={<AdminInvestments />}
              />
            </Route>
          </Route>

          {/* CLIENT PANEL */}
          <Route path="/client" element={<ClientRoute />}>
            <Route element={<ClientLayout />}>
              <Route
                index
                element={<Navigate to="dashboard" replace />}
              />

              <Route
                path="dashboard"
                element={<ClientDashboard />}
              />

              <Route
                path="profile"
                element={<ClientProfile />}
              />

              <Route
                path="investments"
                element={<ClientInvestments />}
              />

              <Route
                path="portfolio"
                element={<ClientSection title="My Portfolio" />}
              />

              <Route
                path="advisor"
                element={<ClientSection title="My Advisor" />}
              />
            </Route>
          </Route>

          {/* MAIN WEBSITE */}
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<Home />} />

            <Route path="about-us" element={<About />} />

            <Route
              path="financial-calculator"
              element={<FinancialCalculator />}
            />

            <Route
              path="relationship-manager"
              element={<RelationshipManager />}
            />

            <Route path="contact" element={<Contact />} />

            <Route path="login" element={<Login />} />

            <Route path="signup" element={<Signup />} />

            <Route
              path="forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="register"
              element={<Navigate to="/signup" replace />}
            />

            <Route
              path="investment-request"
              element={<InvestmentRequestRoute />}
            />

            <Route
              path="nri-services"
              element={<NRIServices />}
            />

            <Route path="blog" element={<Blog />} />

            <Route path="services" element={<AllServices />} />

            <Route
              path="trust-compliance"
              element={<TrustCompliance />}
            />

            <Route path=":slug" element={<ServiceDetail />} />

            <Route
              path="*"
              element={
                <div className="p-10 text-center">
                  <h1 className="text-2xl font-bold">
                    Page Not Found
                  </h1>

                  <p className="mt-2 text-slate-600">
                    The page you are looking for does not exist.
                  </p>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
