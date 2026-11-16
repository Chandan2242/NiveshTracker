
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

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

// Client Components
import ClientLayout from "./client/ClientLayout";
import ClientDashboard from "./client/ClientDashboard";
import ClientSection from "./client/ClientSection";
import ClientProfile from "./client/ClientProfile";
import ClientInvestments from "./client/ClientInvestments";

// Advisor Components
import AdvisorLayout from "./advisor/AdvisorLayout";
import AdvisorDashboard from "./advisor/AdvisorDashboard";
import AdvisorClients from "./advisor/AdvisorClients";
import AdvisorClientDetails from "./advisor/AdvisorClientDetails";
import AdvisorPortfolio from "./advisor/AdvisorPortfolio";

// Scroll to Top
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

// Get Authentication Data
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

// Admin Protection
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

// Client Protection
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

// Advisor Protection
function AdvisorRoute() {
  const { token, user } = getAuthData();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "advisor") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

// Investment Request Protection
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

// Website Layout
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

// Main App
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Admin Panel */}
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
              path="investments"
              element={<AdminInvestments />}
            />
          </Route>
        </Route>

        {/* Client Panel */}
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

        {/* Advisor Panel */}
        <Route path="/advisor" element={<AdvisorRoute />}>
          <Route element={<AdvisorLayout />}>
            <Route
              index
              element={<Navigate to="dashboard" replace />}
            />

            <Route
              path="dashboard"
              element={<AdvisorDashboard />}
            />

            <Route
              path="clients"
              element={<AdvisorClients />}
            />

            <Route
              path="portfolio"
              element={<AdvisorPortfolio />}
            />

            <Route
              path="clients/:clientId"
              element={<AdvisorClientDetails />}
            />
          </Route>
        </Route>

        {/* Main Website */}
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

          {/* Authentication Pages */}
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

          {/* Client Investment Request */}
          <Route
            path="investment-request"
            element={<InvestmentRequestRoute />}
          />

          {/* Old Pages */}
          <Route path="nri-services" element={<NRIServices />} />
          <Route path="blog" element={<Blog />} />

          {/* Services */}
          <Route path="services" element={<AllServices />} />

          <Route
            path="trust-compliance"
            element={<TrustCompliance />}
          />

          {/* Individual Service Pages */}
          <Route path=":slug" element={<ServiceDetail />} />

          {/* Unknown Routes */}
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
  );
}
