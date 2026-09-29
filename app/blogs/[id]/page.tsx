import { increaseBlogLike } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/Blogs";
import { notFound } from "next/navigation";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const blogId = Number(id);

  if (!Number.isInteger(blogId) || blogId <= 0) {
    notFound();
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">{blog.title}</h1>

        <p className="mt-3 text-gray-600">
          By <strong>{blog.author}</strong>
        </p>

        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block truncate text-blue-600 hover:underline"
        >
          {blog.url}
        </a>

        <p className="mt-4 font-medium text-gray-700">❤️ {blog.likes} likes</p>

        <form action={increaseBlogLike} className="mt-5">
          <input type="hidden" name="id" value={blog.id} />

          <button
            type="submit"
            className="
              rounded-xl
              bg-blue-500
              px-5 py-2
              font-medium
              text-white
              transition
              hover:bg-blue-600
              active:scale-95
            "
          >
            ❤️ Like
          </button>
        </form>
      </article>
    </main>
  );
};

export default BlogPage;
