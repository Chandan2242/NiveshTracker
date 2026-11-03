
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import logo from "../assets/NiveshTracklogo.webp";

const columns = [
  {
    title: "PRODUCT",
    links: [
      ["Features", "/features"],
      ["Pricing", "/pricing"],
      ["Create a free account", "/register"],
      ["Privacy Policy & GDPR", "/privacy-policy"],
      ["Terms of Service", "/terms"],
    ],
  },
  {
    title: "COMPANY",
    links: [
      ["About Us", "/about-us"],
      ["Contact & Support", "/contact"],
      ["Success History", "/success-history"],
      ["Setting & Privacy", "/settings"],
      ["Contact Us", "/contact"],
    ],
  },
  {
    title: "SUPPORT",
    links: [
      ["Support", "/support"],
      ["Knowledge Base", "/knowledge-base"],
      ["Webinars", "/webinars"],
      ["API Documentation", "/api-docs"],
      ["Log In", "/login"],
    ],
  },
  {
    title: "RESOURCES",
    links: [
      ["API Reference", "/api-reference"],
      ["Status", "/status"],
      ["Get Help", "/support"],
      ["Brand Assets", "/brand-assets"],
      ["Fintech Services", "/services"],
    ],
  },
];

function FooterLink({ name, path }) {
  return (
    <li>
      <Link
        to={path}
        className="group inline-flex items-center gap-1 text-sm leading-6 text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-emerald-300"
      >
        {name}
        <ArrowUpRight
          size={13}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-[1920px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="inline-block rounded-lg bg-white p-2 transition duration-300 hover:scale-[1.03]"
            >
              <img
                src={logo}
                alt="NiveshTrack Logo"
                className="w-[190px] object-contain sm:w-[220px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Plan your finances, track your goals and make more informed
              financial decisions with NiveshTrack.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="tel:+021854021"
                className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-emerald-300"
              >
                <Phone size={17} className="shrink-0 text-emerald-400" />
                +021-854-021
              </a>

              <a
                href="mailto:info@niveshtrack.com"
                className="flex items-center gap-3 break-all text-sm text-slate-300 transition hover:text-emerald-300"
              >
                <Mail size={17} className="shrink-0 text-emerald-400" />
                info@niveshtrack.com
              </a>

              <p className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin size={17} className="shrink-0 text-emerald-400" />
                Lucknow, Uttar Pradesh
              </p>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.title} className="min-w-0">
              <h3 className="mb-5 text-sm font-bold tracking-[0.15em] text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map(([name, path], index) => (
                  <FooterLink
                    key={`${column.title}-${name}-${index}`}
                    name={name}
                    path={path}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <h3 className="mb-3 text-sm font-bold text-white">
            Important Disclaimer
          </h3>
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            Mutual fund investments are subject to market risks. Please read
            the scheme information and other related documents carefully
            before investing. Past performance is not indicative of future
            returns. Please consider your specific investment requirements
            before choosing a fund or designing a portfolio that suits your
            needs. NiveshTrack makes no warranties or representations, express
            or implied, on products offered through its platform. It accepts
            no liability for damages or losses in connection with the use of,
            or reliance on, its products or related services. Website terms
            and conditions apply. Investments in securities markets are
            subject to market risks; read all related documents carefully
            before investing.
          </p>
        </div>

        {/* Regulatory / awareness logos */}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-slate-800 pt-7">
          <img
            src="https://nivesh.lentislegalis.com/wp-content/uploads/2026/05/amfi-removebg-preview.png"
            alt="AMFI"
            loading="lazy"
            className="h-12 max-w-[145px] object-contain transition duration-300 hover:scale-105"
          />
          <img
            src="https://nivesh.lentislegalis.com/wp-content/uploads/2026/05/mutualfund.png"
            alt="Mutual fund risk awareness"
            loading="lazy"
            className="h-12 max-w-[160px] object-contain transition duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 bg-black/30">
        <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-slate-400 sm:px-8 md:flex-row md:text-left lg:px-12">
          <p>
            © {new Date().getFullYear()} NiveshTrack. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-emerald-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-emerald-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
