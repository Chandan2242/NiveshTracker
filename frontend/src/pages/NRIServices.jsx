
import { useState } from "react";

const funds = [
  [1, "Aditya Birla Sunlife Mutual Fund", "Yes", "Yes", "Yes~1", "Yes"],
  [2, "AngelOne Mutual Fund", "No", "No", "No", "NA"],
  [3, "360 One Mutual Fund", "Yes", "Yes~5", "No", "Yes"],
  [4, "Axis Mutual Fund", "Yes", "Yes", "No", "Yes"],
  [5, "Bajaj Finserv Mutual Fund", "Yes/No ~3", "Yes", "Yes", "Yes"],
  [6, "Bandhan Mutual Fund", "Yes~3", "Yes", "Yes", "Yes~11"],
  [7, "Baroda BNP Paribas Mutual Fund", "No", "No", "No", "NA"],
  [8, "BOI AXA Mutual Fund", "No", "No", "No", "No"],
  [9, "Canara Robeco Mutual Fund", "No", "No", "No", "NA"],
  [10, "DSP Mutual Fund", "Yes~3", "Yes~2", "No", "Yes"],
  [11, "Edelweiss Mutual Fund", "Yes/No~3", "Yes~6", "No", "Yes"],
  [12, "Groww Mutual Fund", "No", "No", "No", "NA"],
  [13, "Franklin Templeton Mutual Fund", "No", "No", "No", "Yes"],
  [14, "HDFC Mutual Fund", "Yes/No~3", "Yes", "No", "Yes"],
  [15, "Helios Mutual Fund", "No", "No", "No", "No"],
  [16, "HSBC Mutual Fund", "No", "No", "No", "NA"],
  [17, "ICICI Prudential Mutual Fund", "Yes/No~3", "Yes~7", "No", "Yes"],
  [18, "IDBI Mutual Fund", "No", "No", "No", "No"],
  [19, "Invesco Mutual Fund", "No", "No", "No", "NA"],
  [20, "ITI Mutual Fund", "Yes~2", "Yes", "Yes", "Yes"],
  [21, "J M Financial", "No", "No", "No", "No"],
  [22, "Kotak Mahindra Mutual Fund", "Yes", "Yes~8", "No", "NA"],
  [23, "LIC Mutual Fund", "No", "No", "No", "No"],
  [24, "Mahindra Manulife Mutual Fund", "Yes/No~3", "Yes~9", "No", "Yes"],
  [25, "Mirae Mutual Fund", "No", "No", "No", "NA"],
  [26, "Motilal Oswal Mutual Fund", "Yes/No~3", "Yes~4", "No", "Yes"],
  [27, "NAVI Mutual Fund", "No", "No", "Yes~1", "No"],
  [28, "Nippon India Mutual Fund", "Yes", "Yes", "Yes~1", "Yes"],
  [29, "NJ Mutual Fund", "Yes", "Yes", "No", "Yes~7"],
  [30, "Old Bridge Mutual Fund", "No", "No", "No", "No"],
  [31, "PGIM Mutual Fund", "No", "No", "No", "No"],
  [32, "PPFAS Mutual Fund", "Yes", "Yes~5", "No", "Yes"],
  [33, "Quantum Mutual Fund", "No", "No", "No", "NA"],
  [34, "Quant Mutual Fund", "Yes", "Yes", "Yes", "No"],
  [35, "Samco Mutual Fund", "Yes~10", "Yes", "No", "Yes"],
  [36, "SBI Mutual Fund", "Yes", "Yes", "No", "Yes"],
  [37, "Shriram Mutual Fund", "No", "No", "No", "NA"],
  [38, "Sundaram Mutual Fund", "Yes", "Yes", "Yes~1", "Yes"],
  [39, "Tata Mutual Fund", "No", "No", "No", "NA"],
  [40, "Taurus Mutual Fund", "Yes~5", "Yes", "No", "Yes"],
  [41, "Trust Mutual Fund", "Yes", "Yes", "No", "Yes"],
  [42, "Union Mutual Fund", "No", "No", "No", "No"],
  [43, "UTI Mutual Fund", "Yes~10", "Yes", "Yes", "NA"],
  [44, "WhiteOak Capital Mutual Fund", "Yes", "Yes", "Yes", "Yes"],
  [45, "Zerodha Mutual Fund", "No", "No", "No", "No"],
];

const footnotes = [
  "Online transactions permitted only through AMC website.",
  "Only physical lumpsum transactions.",
  "Yes for USA resident; No for Canada Residents.",
  "Only lumpsum purchase allowed if investor is present in India. A visa copy needs to be accompanied with it.",
  "Allowed if investor is present in India. A visa copy needs to be accompanied with transaction.",
  "Only lumpsum purchase allowed if investor is present in India. Investor has to submit US declaration, copy of Indian Passport or OCI Card, Visa along with immigration IN stamp (If immigration IN stamp is older than 45 days then IPV has to be done by AMC employee).",
  "Allowed if investor is present in India. Declaration to be submitted at AMC Branch only.",
  "Allowed if investor is present in India and visa copy is not mandatory.",
  "Only lumpsum purchase allowed if investor is present in India and visa copy is not mandatory.",
  "Folio shall have: Indian mailing address and registered bank account in India. US or Canada address as may be with KRA will not be consumed under folio.",
  "Allowed if investor is present in India. Declaration must be mailed on declaration_g@camsonline.com with subject line containing US declaration - user transaction number.",
];

export default function NRIServices() {
  const [search, setSearch] = useState("");

  const filteredFunds = funds.filter((fund) =>
    fund[1].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="bg-emerald-950 px-6 py-16 text-white md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold md:text-5xl">
            Requirements for investing in Mutual Funds in India by
            Residents of USA / CANADA
          </h1>

          <p className="mt-6 text-lg">
            If you are a resident of USA or Canada, please note:
          </p>

          <ul className="mt-5 space-y-4 leading-7 text-emerald-50">
            <li>
              ✓ Make sure that you upload a duly filled and signed
              USA/Canada declaration in the format as required by the
              respective Mutual Funds within three days of placing
              the order.
            </li>
            <li>
              ✓ The Mutual Funds shall reserve the right to
              accept/reject the transaction subject to availability
              of the evidence within the time.
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <h2 className="mb-6 text-2xl font-bold">Mutual Fund</h2>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Mutual Fund"
          className="mb-6 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700"
        />

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-emerald-950 text-white">
              <tr>
                {[
                  "S No.",
                  "Mutual Fund",
                  "Whether allowed (YES/NO)",
                  "Physical mode",
                  "Online mode",
                  "If YES, based on declaration",
                ].map((heading) => (
                  <th key={heading} className="px-4 py-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredFunds.map((fund) => (
                <tr key={fund[0]} className="border-t hover:bg-emerald-50">
                  {fund.map((value, index) => (
                    <td key={index} className="px-4 py-4">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}

              {filteredFunds.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center">
                    No Mutual Fund found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <h2 className="mb-6 text-2xl font-bold">Notes</h2>

        <ol className="list-decimal space-y-4 pl-6 leading-7 text-slate-700">
          {footnotes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ol>
      </section>

      <section className="bg-emerald-950 px-6 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">
          Let's Start Investing Now
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-6 text-sm font-medium text-slate-600">
          <a href="/">HOME</a>
          <a href="/contact">CONTACT</a>
          <a href="/careers">CAREERS</a>
          <a href="/faq">FAQ</a>
          <a href="/documents">DOCUMENTS</a>
        </div>
      </footer>
    </main>
  );
}
