const stats = [
  { title: "Total Services", value: "—" },
  { title: "Total Blogs", value: "—" },
  { title: "New Enquiries", value: "—" },
  { title: "Total Users", value: "—" },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-500">
        Welcome to your NiveshTrack administration panel.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{item.title}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Quick Overview</h2>
        <p className="mt-2 text-sm text-slate-500">
          Connect your MySQL database to display real services,
          blogs, enquiries and user counts here.
        </p>
      </div>
    </div>
  );
}