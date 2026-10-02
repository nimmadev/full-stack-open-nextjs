import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { genrateUserToken } from "../actions/users";
import { getReadingListWithUserId } from "../services/readingList";
import Link from "next/link";
import { markReadingList } from "../actions/readingList";

export default async function Me() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const readingList = await getReadingListWithUserId(user.id);
  const read = readingList!.readingList
    .filter((curr) => curr.read)
    .map((curr) => curr.blog);
  const unread = readingList!.readingList
    .filter((curr) => !curr.read)
    .map((curr) => curr.blog);
  return (
    <main
      className="min-h-screen bg-gray-50 px-4 py-10"
      data-testid="user-profile"
    >
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
              <p
                className="mt-1 text-base text-gray-900"
                data-testid="user-name"
              >
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Username</p>
              <p
                data-testid="user-username"
                className="mt-1 text-base text-gray-900"
              >
                {user.username}
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-5 text-3xl font-semibold text-gray-900">
            Reading list
          </h2>
          <section className=" scroll-auto" data-testid="reading-list-section">
            <h2 className="ml-5 mb-5 text-2xl font-semibold text-gray-900">
              Unread {`(${unread.length})`}
            </h2>

            <div className="ml-8 max-h-3/6" data-testid="unread-section">
              {unread.map((blog) => {
                return (
                  <div
                    key={blog.id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="text-blue-500 hover:text-blue-900"
                    >
                      {blog.title}
                    </Link>

                    <form action={markReadingList}>
                      <input type="hidden" name="blogId" value={blog.id} />
                      <button
                        type="submit"
                        className="
        rounded-lg
        bg-green-500
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-green-700
        active:scale-95
      "
                        data-testid="mark-read-"
                      >
                        Mark as read
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
            {unread.length == 0 && (
              <p data-testid="no-unread-blogs">no unread</p>
            )}
          </section>
          <section className=" scroll-auto" data-testid="empty-reading-list">
            <h2 className="ml-5 mb-5 text-2xl font-semibold text-gray-900">
              Read {`(${read.length})`}
            </h2>

            <div className="ml-8 max-h-3/6">
              {read.map((blog) => {
                return (
                  <div
                    key={blog.id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="text-blue-500 hover:text-blue-900"
                    >
                      {blog.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        </section>

        {/* API Token Card */}
        <section
          className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          data-testid="api-token-section"
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">API Token</h2>
            <p className="mt-1 text-sm text-gray-500">
              Use this token to authenticate requests to your API.
            </p>
          </div>

          {/* Token */}
          <div
            className="rounded-lg bg-gray-100 p-4"
            data-testid="token-display"
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
              Current Token
            </p>

            <code
              className="block break-all rounded-md bg-gray-900 p-3 text-sm text-green-400"
              data-testid="api-token"
            >
              {user.token}
            </code>
            {!user.token && <p data-testid="no-token-message">no token</p>}
          </div>

          {/* Generate Token */}
          <form action={genrateUserToken} className="mt-5">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              data-testid="generate-token-button"
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
