
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import FinancialCalculator from "./pages/FinancialCalculator";
import RelationshipManager from "./pages/RelationshipManager";

import NRIServices from "./pages/NRIServices";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ServiceDetail, { AllServices } from "./pages/ServicePages";

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import AdminPages from "./admin/AdminPages";
import TrustCompliance from "./pages/TrustCompliance";

// Scroll to Top on Every Route Change
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

// Website Layout
function WebsiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />

          <Route path="/about-us" element={<About />} />

          <Route
            path="/financial-calculator"
            element={<FinancialCalculator />}
          />

          {/* Relationship Manager Page */}
          <Route
            path="/relationship-manager"
            element={<RelationshipManager />}
          />

          <Route path="/contact" element={<Contact />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Old Pages - Kept for Compatibility */}
          <Route path="/nri-services" element={<NRIServices />} />
          <Route path="/blog" element={<Blog />} />

          {/* All Services Listing */}
          <Route path="/services" element={<AllServices />} />

          {/* All Individual Service Pages */}
          <Route path="/:slug" element={<ServiceDetail />} />


          <Route path="/trust-compliance" element={<TrustCompliance />} />

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
        </Routes>
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
        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="services"
            element={<AdminPages type="services" />}
          />

          <Route
            path="blogs"
            element={<AdminPages type="blogs" />}
          />

          <Route
            path="enquiries"
            element={<AdminPages type="enquiries" />}
          />

          <Route
            path="users"
            element={<AdminPages type="users" />}
          />
        </Route>

        {/* Main Website */}
        <Route
          path="/*"
          element={<WebsiteLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}
