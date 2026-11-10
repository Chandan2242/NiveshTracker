
const partnerDetails = [
  {
    service: "Mutual Fund",
    regulator: "AMFI",
    status: "ARN-165724 — confirmed",
  },
  {
    service: "PMS",
    regulator: "APMI",
    status: "APRN & providers needed",
  },
  {
    service: "AIF",
    regulator: "Per fund manager",
    status: "Empanelment list needed",
  },
  {
    service: "SIF",
    regulator: "SEBI (SIF framework)",
    status: "Certification needs confirming",
  },
  {
    service: "Insurance",
    regulator: "IRDAI",
    status: "Reg. type, number & panel needed",
  },
  {
    service: "Tax Planning",
    regulator: "— (CA-delivered)",
    status: "Delivery model needs confirming",
  },
  {
    service: "Estate Planning",
    regulator: "— (legal partner)",
    status: "Partner name needed",
  },
  {
    service: "GIFT City Investing",
    regulator: "IFSCA",
    status: "Partner entity needed",
  },
];

export default function TrustCompliance() {
  return (
    <main className="relative isolate overflow-hidden bg-[#f3faf6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

      {/* Background Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* TRUST & COMPLIANCE HERO */}
        <section className="grid items-center gap-12 rounded-3xl border border-emerald-100/80 bg-white/75 px-6 py-12 shadow-sm backdrop-blur-sm sm:px-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16 lg:px-16 lg:py-16">

          {/* Left - Nivesh Track Badge */}
          <div className="flex justify-center">
            <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full border border-dashed border-[#007A55] bg-gradient-to-br from-[#E8F4EF] to-white text-center shadow-sm sm:h-52 sm:w-52">

              <h2 className="font-serif text-xl font-bold text-slate-900">
                Nivesh Track
              </h2>

              <div className="mt-3 space-y-1 font-mono text-xs tracking-wide text-slate-700">
                <p>Est. 2019</p>
                <p>AMFI-Regd. MFD</p>
                <p>ARN-165724</p>
              </div>

            </div>
          </div>

          {/* Right - Main Content */}
          <div>

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-12 bg-[#007A55]" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#007A55]">
                Trust & Compliance
              </p>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Nivesh Track distributes.
              <span className="block text-[#007A55]">
                It does not advise.
              </span>
            </h1>

            <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
              Nivesh Track, a brand of Cadence Finserve Private Limited,
              has been an AMFI-registered Mutual Fund Distributor since
              2019 — ARN-165724. Today we serve over 1,900 investor
              families, with approximately ₹500 crore tracked across
              client portfolios. We are purely a distributor of mutual
              funds and earn our commission as a product distributor
              from Asset Management Companies; we are not a SEBI-registered
              Investment Adviser. For PMS, AIF, SIF, insurance, tax
              planning, estate planning and GIFT City investing, we
              connect you with specifically registered partners and do
              not charge any separate fee for making that connection.
            </p>

            {/* Mutual Fund Disclaimer */}
            <div className="mt-7 rounded-2xl border border-[#007A55]/15 bg-[#E8F4EF]/70 p-5">

              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-white p-2 text-[#007A55]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <h3 className="font-bold text-slate-900">
                  Mutual Fund Risk Disclaimer
                </h3>
              </div>

              <p className="text-sm leading-7 text-slate-600">
                Mutual fund investments are subject to market risks. The
                NAVs of the schemes may go up or down depending on the
                factors and forces affecting the securities market,
                including fluctuations in interest rates. Please read all
                scheme-related documents carefully before investing,
                including the Scheme Information Document and Key
                Information Memorandum. Past performance is not indicative
                of future returns.
              </p>

            </div>
          </div>
        </section>

        {/* SERVICES AND REGULATORY DETAILS */}
        <section className="mt-16 sm:mt-20">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#007A55]">
              Regulatory Framework
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Services & Partner Details
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Understand the regulatory framework and partner details
              associated with our different financial services.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-100 bg-white/85 shadow-sm backdrop-blur-sm">

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">

                <thead>
                  <tr className="bg-[#007A55] text-white">
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">
                      Service / Partner
                    </th>

                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">
                      Regulator
                    </th>

                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {partnerDetails.map((item, index) => (
                    <tr
                      key={item.service}
                      className={`border-b border-emerald-100/80 transition-colors hover:bg-emerald-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-[#f3faf6]"
                      }`}
                    >
                      <td className="px-6 py-5 text-sm font-bold text-slate-800">
                        {item.service}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#007A55]">
                        {item.regulator}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
