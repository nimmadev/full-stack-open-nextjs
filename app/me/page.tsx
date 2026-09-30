import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { genrateUserToken } from "../actions/users";

export default async function Me() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account and API access.
          </p>
        </div>

        {/* Profile Card */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Account Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1 text-base text-gray-900">{user.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Username</p>
              <p className="mt-1 text-base text-gray-900">{user.username}</p>
            </div>
          </div>
        </section>

        {/* API Token Card */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">API Token</h2>
            <p className="mt-1 text-sm text-gray-500">
              Use this token to authenticate requests to your API.
            </p>
          </div>

          {/* Token */}
          <div className="rounded-lg bg-gray-100 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
              Current Token
            </p>

            <code className="block break-all rounded-md bg-gray-900 p-3 text-sm text-green-400">
              {user.token}
            </code>
          </div>

          {/* Generate Token */}
          <form action={genrateUserToken} className="mt-5">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate New Token
            </button>
          </form>

          <p className="mt-3 text-xs text-gray-500">
            Generating a new token may invalidate your current token.
          </p>
        </section>
      </div>
    </main>
  );
}
