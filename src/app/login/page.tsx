"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{ u?: boolean; p?: boolean }>({});
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uEmpty = username.trim() === "";
    const pEmpty = password.trim() === "";
    setTouched({ u: true, p: true });
    if (uEmpty || pEmpty) return;

    // Set cookie auth via client – Next 13 client side
    document.cookie = `auth=true; path=/; max-age=${60 * 60 * 6};`; // 6 jam
    router.replace("/dashboard");
  };

  const errorClass = "!text-red-600 text-sm mt-1";
  const inputClass =
    "form-control w-full rounded-lg border p-2 focus:outline-none focus:ring " +
    "border-gray-300 focus:border-blue-500"; // bootstrap + tailwind

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, u: true }))}
              placeholder="Masukkan username"
            />
            {touched.u && username.trim() === "" && (
              <p className={errorClass}>Field is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, p: true }))}
              placeholder="Masukkan password"
            />
            {touched.p && password.trim() === "" && (
              <p className={errorClass}>Field is required</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl py-2 mt-2"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
