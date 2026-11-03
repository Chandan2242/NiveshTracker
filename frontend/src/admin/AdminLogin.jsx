import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert(
      "Login UI ready hai. Ab ise backend ke secure admin login API se connect karna hai."
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-slate-900">
          NiveshTrack Admin
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to manage your website.
        </p>

        <label className="mt-6 block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#3D7A89]"
        />

        <label className="mt-5 block text-sm font-medium">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#3D7A89]"
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-[#3D7A89] py-3 font-semibold text-white hover:opacity-90"
        >
          Sign In
        </button>

        <Link
          to="/"
          className="mt-5 block text-center text-sm text-slate-500 hover:text-[#3D7A89]"
        >
          ← Back to website
        </Link>
      </form>
    </div>
  );
}