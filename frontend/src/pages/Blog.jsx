
import { useState } from "react";

const articles = [
  {
    date: "June 18, 2026",
    category: "Mutual Funds",
    title: "SIP vs Lumpsum: Which is Better for You?",
    description:
      "Learn how SIP investments can reduce market timing risk and build wealth consistently over time.",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "June 15, 2026",
    category: "Education",
    title: "How to Read a Company's Balance Sheet",
    description:
      "Understand assets, liabilities and shareholder equity before investing your hard-earned money.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "June 10, 2026",
    category: "Personal Finance",
    title: "The 50/30/20 Rule of Budgeting Explained",
    description:
      "A simple budgeting strategy to manage needs, wants and savings effectively every month.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
];

const topics = [
  { name: "Stock Market", icon: "📈", color: "bg-emerald-50" },
  { name: "Mutual Funds", icon: "🪙", color: "bg-blue-50" },
  { name: "IPO Analysis", icon: "🚀", color: "bg-violet-50" },
  { name: "Personal Finance", icon: "💰", color: "bg-orange-50" },
];

const tags = [
  "#Nifty50",
  "#MutualFunds",
  "#IPO",
  "#Investing",
  "#FinancialFreedom",
  "#TaxSaving",
  "#Sensex",
];

export default function Blog() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");

  const filteredArticles =
    activeTopic === "All"
      ? articles
      : articles.filter((article) => article.category === activeTopic);

  function handleSubscribe(e) {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage(
      "Subscription form is ready. Connect your newsletter service to receive emails."
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-white to-teal-50">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20">
          <div className="relative z-10">
            <p className="mb-3 font-semibold text-emerald-700">
              Welcome to
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Nivesh Track{" "}
              <span className="text-emerald-700">Blog</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Your trusted destination for stock market insights, mutual
              funds, wealth creation, tax planning and smart investment
              strategies.
            </p>

            <a
              href="#recent-articles"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Explore Articles <span>→</span>
            </a>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=85"
              alt="Stock market charts and investment growth"
              className="h-64 w-full rounded-2xl object-cover shadow-xl sm:h-80"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 p-4 shadow-lg">
              <p className="text-sm text-slate-500">Invest in your future</p>
              <p className="font-bold text-emerald-700">
                Knowledge. Strategy. Growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {/* Featured Insight */}
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-2">
              <span className="text-xl">🌟</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Featured Insight
              </h2>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm md:grid-cols-2">
              <div className="relative min-h-64">
                <img
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=85"
                  alt="Stock market charts"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                  📈 Stock Market
                </span>
              </div>

              <div className="flex flex-col items-start justify-center p-6 sm:p-8">
                <span className="mb-3 text-sm font-semibold text-emerald-700">
                  FEATURED ARTICLE
                </span>

                <h3 className="text-2xl font-bold leading-snug text-slate-900">
                  Top 10 Bluechip Stocks to Hold for the Next Decade
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Discover fundamentally strong companies with sustainable
                  growth, healthy balance sheets and consistent returns for
                  long-term wealth creation.
                </p>

                <a
                  href="#recent-articles"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
                >
                  Read Full Article →
                </a>
              </div>
            </div>
          </section>

          {/* Browse by Topic */}
          <section className="mb-12">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              📂 Browse by Topic
            </h2>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {topics.map((topic) => (
                <button
                  key={topic.name}
                  onClick={() =>
                    setActiveTopic(
                      activeTopic === topic.name ? "All" : topic.name
                    )
                  }
                  className={`${topic.color} rounded-xl border p-5 text-center transition hover:-translate-y-1 hover:shadow-md ${
                    activeTopic === topic.name
                      ? "border-emerald-500 ring-2 ring-emerald-100"
                      : "border-transparent"
                  }`}
                >
                  <span className="text-3xl">{topic.icon}</span>
                  <span className="mt-3 block text-sm font-bold text-slate-800">
                    {topic.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Recent Articles */}
          <section id="recent-articles">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">
                📰 Recent Articles
              </h2>

              {activeTopic !== "All" && (
                <button
                  onClick={() => setActiveTopic("All")}
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Show all articles ✕
                </button>
              )}
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredArticles.map((article) => (
                  <article
                    key={article.title}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-medium leading-5 text-slate-500">
                        {article.date} <span className="mx-1">•</span>{" "}
                        <span className="text-emerald-700">
                          {article.category}
                        </span>
                      </p>

                      <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {article.description}
                      </p>

                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
                      >
                        Read More →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 p-8 text-center">
                <p className="font-semibold text-slate-800">
                  No articles available in this category yet.
                </p>
                <button
                  onClick={() => setActiveTopic("All")}
                  className="mt-3 font-semibold text-emerald-700 hover:underline"
                >
                  View all articles
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              🏷️ Popular Tags
            </h2>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTopic("All")}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-700 hover:text-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
            <h2 className="text-lg font-bold text-slate-900">
              📩 Stay Ahead of the Market 📊
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Join 10,000+ investors and get weekly market insights, stock
              ideas and financial tips directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter your email address"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                Subscribe Free
              </button>

              {message && (
                <p aria-live="polite" className="text-xs leading-5 text-slate-600">
                  {message}
                </p>
              )}
            </form>
          </section>

          <section className="rounded-2xl bg-slate-900 p-5 text-white">
            <span className="text-3xl">💡</span>
            <h2 className="mt-3 text-xl font-bold">Invest Smarter</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Build your financial knowledge and make informed investment
              decisions.
            </p>
            <a
              href="#recent-articles"
              className="mt-5 inline-block font-semibold text-emerald-300 hover:text-white"
            >
              Explore insights →
            </a>
          </section>
        </aside>
      </section>

      {/* Broker promotional banner */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="relative grid overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-800 p-7 text-white sm:p-10 md:grid-cols-2 md:items-center md:gap-8">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
              Best Broker
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Trading Platform
            </h2>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-5 inline-flex rounded-lg bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-400"
            >
              Join Now →
            </a>
          </div>

          <div className="relative z-10 mt-8 md:mt-0">
            <h3 className="text-2xl font-bold">
              Start building a dollarized portfolio today!
            </h3>
            <p className="mt-3 leading-7 text-emerald-100">
              Explore investment opportunities and learn more about building
              your financial future.
            </p>
            <a
              href="#recent-articles"
              className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 font-bold text-emerald-900 transition hover:bg-emerald-50"
            >
              Learn More →
            </a>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full border-[35px] border-emerald-400/10" />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-emerald-950 px-5 py-12 text-center text-white">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Let's Start{" "}
          <span className="text-emerald-400">Investing Now</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-emerald-100">
          Learn, plan and take informed steps toward your financial goals.
        </p>
        <a
          href="#recent-articles"
          className="mt-6 inline-flex rounded-lg bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-400"
        >
          Explore Our Blog →
        </a>
      </section>
    </main>
  );
}
