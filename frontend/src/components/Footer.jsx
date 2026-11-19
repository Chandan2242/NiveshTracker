
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

import logo from "../assets/NiveshTracklogo.webp";

const mapLink =
  "https://www.google.com/maps/dir//Wealth+Bees,+Janki+Vallabh+Complex,+Veer+Vinay+achowk,+near+Union+Bank,+Mohalla+Chikni,+Alijanpurva,+Balrampur,+Uttar+Pradesh+271201/@26.8951005,80.9336832,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3999d95a5505dbc7:0x6e8a991c5710a5ac!2m2!1d82.1799882!2d27.4301134?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D";

const columns = [
  {
    title: "SERVICES",
    links: [
      ["Mutual Fund & SIP", "/mutual-funds"],
      ["PMS", "/pms"],
      ["AIF", "/aif"],
      ["SIF", "/sif"],
      ["Insurance", "/insurance"],
      ["Tax & Estate Planning", "/tax-planning"],
      ["GIFT City Investing", "/gift-city-investing"],
    ],
  },
  {
    title: "CALCULATORS",
    links: [
      ["Goal SIP Calculator", "/financial-calculator"],
      ["Retirement Calculator", "/financial-calculator"],
      ["Step-up SIP Calculator", "/financial-calculator"],
      ["SWP Calculator", "/financial-calculator"],
    ],
  },
  {
    title: "RESOURCES",
    links: [
      ["Risk Profile", "/about-us"],
      ["Awareness Sessions", "/contact"],
      ["Relationship Manager", "/relationship-manager"],
      ["Financial Calculator", "/financial-calculator"],
    ],
  },
  {
    title: "COMPANY",
    links: [
      ["About Us", "/about-us"],
      ["Trust & Compliance", "/trust-compliance"],
      ["Contact Us", "/contact"],
    ],
  },
];

function FooterLink({ name, path }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isCalculator = path === "/financial-calculator";

  const handleClick = (event) => {
    if (!isCalculator) return;

    event.preventDefault();

    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate(path);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <li>
      <Link
        to={path}
        onClick={handleClick}
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

      {/* Callback CTA */}
      <div className="border-b border-slate-800">
        <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-5 px-5 py-8 sm:px-8 md:flex-row lg:px-12">
          <div>
            <h3 className="text-xl font-bold text-white">
              Let's plan your financial future together.
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Connect with our team for assistance with your financial goals.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Request a Callback
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-[1920px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">

          {/* Brand and Contact */}
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
              Nivesh Track is a brand of Cadence Finserve Private Limited,
              an AMFI-registered Mutual Fund Distributor since 2019.
            </p>

            <div className="mt-6 space-y-4">
              <a
                href="tel:+917800450600"
                className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-emerald-300"
              >
                <Phone size={17} className="shrink-0 text-emerald-400" />
                +91 78004 50600
              </a>

              <a
                href="mailto:niveshtrack@gmail.com"
                className="flex items-center gap-3 break-all text-sm text-slate-300 transition hover:text-emerald-300"
              >
                <Mail size={17} className="shrink-0 text-emerald-400" />
                niveshtrack@gmail.com
              </a>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-sm leading-6 text-slate-300 transition hover:text-emerald-300"
              >
                <MapPin
                  size={17}
                  className="mt-1 shrink-0 text-emerald-400"
                />
                <span>
                  Wealth Bees, Janki Vallabh Complex,
                  Veer Vinayak Chowk, Near Union Bank,
                  Balrampur, Uttar Pradesh - 271201
                  <ExternalLink
                    size={12}
                    className="ml-1 inline opacity-70"
                  />
                </span>
              </a>
            </div>

            <p className="mt-6 text-xs font-semibold tracking-wider text-emerald-400">
              AMFI-REGISTERED MFD · ARN-165724
            </p>
          </div>

          {/* Footer Link Columns */}
          {columns.map((column) => (
            <div key={column.title} className="min-w-0">
              <h3 className="mb-5 text-sm font-bold tracking-[0.12em] text-white">
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

        {/* Regulatory Disclaimer */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <h3 className="mb-3 text-sm font-bold text-white">
            Important Disclaimer
          </h3>

          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            Nivesh Track, a brand of Cadence Finserve Private Limited, is an
            AMFI-registered Mutual Fund Distributor (ARN-165724) and is not a
            SEBI-registered Investment Adviser. We are purely a distributor
            of mutual funds and earn our commission as a product distributor
            from Asset Management Companies; we do not charge investors any
            additional fee for this. Mutual fund investments are subject to
            market risks. The NAVs of schemes may go up or down depending on
            factors and forces affecting the securities market, including
            fluctuations in interest rates. Please read all scheme-related
            documents carefully before investing, including the Scheme
            Information Document and Key Information Memorandum. Past
            performance is not indicative of future performance. PMS, AIF,
            SIF, insurance, tax planning, estate planning and GIFT City
            investing are each governed by their own regulator, separate
            from our AMFI registration, and are offered only once the
            relevant registration or partner arrangement is confirmed and
            on file. Please visit our Trust & Compliance page for current
            status. While all efforts have been made to keep this website
            accurate, please refer to official scheme documents and
            regulatory notifications as the authentic source before acting
            on anything shown here. Nothing on this website constitutes
            investment advice, a recommendation, or an offer to buy or sell
            any security or scheme. For any clarification, write to
            niveshtrack@gmail.com.
          </p>
        </div>

        {/* Brand Identity */}
        <div className="mt-8 border-t border-slate-800 pt-7 text-center">
          <p className="text-xs font-bold tracking-[0.16em] text-emerald-400">
            NIVESH TRACK — A BRAND OF CADENCE FINSERVE PRIVATE LIMITED
          </p>
          <p className="mt-2 text-xs tracking-wider text-slate-400">
            AMFI-REGISTERED MFD · ARN-165724
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-black/30">
        <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-slate-400 sm:px-8 md:flex-row md:text-left lg:px-12">
          <p>
            © {new Date().getFullYear()} NiveshTrack. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link
              to="/trust-compliance"
              className="transition hover:text-emerald-300"
            >
              Trust & Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
