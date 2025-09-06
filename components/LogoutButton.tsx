"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    document.cookie = "auth=; path=/; max-age=0;";
    window.location.href = "/login"; // redirect manual
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-outline-danger rounded-xl px-4 py-2"
    >
      Logout
    </button>
  );
}
