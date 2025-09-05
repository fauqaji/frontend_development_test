"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Form = { name: string; email: string; body: string };
const init: Form = { name: "", email: "", body: "" };

export default function CreateCommentPage() {
  const [form, setForm] = useState<Form>(init);
  const [touched, setTouched] = useState<{ [k in keyof Form]?: boolean }>({});
  const router = useRouter();

  const onChange =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, body: true });
    const invalid =
      !form.name.trim() ||
      !form.body.trim() ||
      !form.email.trim() ||
      !isEmail(form.email);
    if (invalid) return;

    // Opsional: POST ke JSONPlaceholder (tidak persist)
    try {
      await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}

    // Simpan ke localStorage agar muncul di tabel
    const newItem = {
      postId: 0,
      id: Date.now(), // id lokal
      ...form,
    };
    const raw = localStorage.getItem("addedComments");
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(newItem);
    localStorage.setItem("addedComments", JSON.stringify(arr));

    router.replace("/dashboard");
  };

  const error = (cond: boolean, msg = "Field is required") =>
    cond ? <p className="text-red-600 text-sm mt-1">{msg}</p> : null;

  const input =
    "form-control w-full rounded-lg border p-2 focus:outline-none focus:ring border-gray-300 focus:border-blue-500";

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl lg:text-2xl font-semibold mb-4">
          Create Comment
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              className={input}
              value={form.name}
              onChange={onChange("name")}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Your name"
            />
            {error(
              touched.name !== undefined && touched.name && !form.name.trim()
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              className={input}
              value={form.email}
              onChange={onChange("email")}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="you@example.com"
            />
            {touched.email && !form.email.trim() && error(true)}
            {touched.email && !!form.email && !isEmail(form.email) && (
              <p className="text-red-600 text-sm mt-1">Email is invalid</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Body</label>
            <textarea
              className={input}
              value={form.body}
              onChange={onChange("body")}
              onBlur={() => setTouched((t) => ({ ...t, body: true }))}
              placeholder="Write your comment..."
              rows={5}
            />
            {error(
              touched.name !== undefined && touched.name && !form.name.trim()
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-success rounded-xl px-4 py-2"
            >
              Submit
            </button>
            <a
              href="/dashboard"
              className="btn btn-outline-secondary rounded-xl px-4 py-2"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
