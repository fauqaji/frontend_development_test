import CommentsTable from "../../../components/CommentsTable";

async function getComments() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
    cache: "no-store", // SSR fresh
  });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export default async function DashboardPage() {
  const initialComments = await getComments();
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-4 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl lg:text-2xl font-semibold">Dashboard</h1>
          <div className="flex gap-2">
            <a href="/create" className="btn btn-success rounded-xl px-4 py-2">
              Create Comment
            </a>
            <a
              href="/login"
              onClick={() => {
                // hapus cookie auth (client akan eksekusi)
                document.cookie = "auth=; path=/; max-age=0;";
              }}
              className="btn btn-outline-danger rounded-xl px-4 py-2"
            >
              Logout
            </a>
          </div>
        </div>

        <div className="mt-4">
          <CommentsTable initialData={initialComments} />
        </div>
      </div>
    </div>
  );
}
