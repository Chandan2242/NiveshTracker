import { useState } from "react";

const pageData = {
  services: {
    title: "Services",
    description: "Manage your financial advisory services.",
    columns: ["Service Name", "Description", "Status"],
  },
  blogs: {
    title: "Blogs",
    description: "Manage website articles and blog posts.",
    columns: ["Blog Title", "Author", "Status"],
  },
  enquiries: {
    title: "Enquiries",
    description: "Review enquiries submitted by website visitors.",
    columns: ["Name", "Email", "Message"],
  },
  users: {
    title: "Users",
    description: "Manage registered website users.",
    columns: ["Name", "Email", "Role"],
  },
};

export default function AdminPages({ type }) {
  const [search, setSearch] = useState("");
  const page = pageData[type];

  if (!page) return <p>Page not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        {page.title}
      </h1>

      <p className="mt-2 text-slate-500">{page.description}</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row">
          <input
            type="search"
            placeholder={`Search ${page.title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#3D7A89] sm:max-w-sm"
          />

          {["services", "blogs"].includes(type) && (
            <button
              onClick={() =>
                alert("Add form ko next step mein backend se connect karenge.")
              }
              className="rounded-lg bg-[#3D7A89] px-5 py-3 text-white"
            >
              + Add {type === "blogs" ? "Blog" : "Service"}
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {page.columns.map((column) => (
                  <th key={column} className="px-4 py-4 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan={page.columns.length}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  No data available yet. Connect the backend to load records.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}