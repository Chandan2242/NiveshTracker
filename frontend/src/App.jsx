
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import FinancialCalculator from "./pages/FinancialCalculator";
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
import MutualFunds from "./pages/MutualFunds";
import TaxConsultancy from "./pages/TaxConsultancy";
import Insurance from "./pages/Insurance";
import Loans from "./pages/Loans";
import FDBonds from "./pages/FDBonds";
import EstatePlanning from "./pages/EstatePlanning";

function WebsiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Main Website Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route
            path="/financial-calculator"
            element={<FinancialCalculator />}
          />
          <Route path="/nri-services" element={<NRIServices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Services */}
          {/* Individual Service Pages */}
          <Route path="/mutual-funds" element={<MutualFunds />} />
          <Route path="/tax-consultancy" element={<TaxConsultancy />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/fd-bonds" element={<FDBonds />} />
          <Route path="/estate-planning" element={<EstatePlanning />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/:slug" element={<ServiceDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/*" element={<WebsiteLayout />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

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
      </Routes>
    </BrowserRouter>
  );
}
