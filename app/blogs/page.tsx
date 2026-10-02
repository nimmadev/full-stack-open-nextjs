import Link from "next/link";
import { getBlogs } from "../services/Blogs";
import { filterBlogs } from "../actions/blogs";

const Blog = ({
  blog,
}: {
  blog: {
    id: number;
    title: string;
    author: string;
    url: string;
    likes: number;
  };
}) => {
  return (
    <article className="w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/blogs/${blog.id}`}>
        <h3 className="font-semibold truncate text-gray-900 hover:text-blue-600">
          {blog.title}
        </h3>
      </Link>

      <p className="mt-2 truncate text-sm text-gray-600">
        By <strong>{blog.author}</strong>
      </p>

      <p className="mt-2 truncate text-sm text-gray-500">{blog.url}</p>

      <p className="mt-3 text-sm font-medium text-gray-700">
        ❤️ {blog.likes} likes
      </p>
    </article>
  );
};

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter);

  return (
    <div className="p-6">
      <form action={filterBlogs} className="flex items-center gap-2">
        <input
          name="filter"
          type="search"
          placeholder="Search blogs..."
          className="
            w-64
            rounded-xl
            border border-gray-300
            px-4 py-2
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
          "
          data-testid="filter-input"
        />

        <button
          type="submit"
          className="
            rounded-xl
            bg-blue-500
            px-5 py-2
            font-medium
            text-white
            transition
            hover:bg-blue-700
            active:scale-95
          "
          data-testid="search-button"
        >
          Search
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-4" data-testid="blogs-list">
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
