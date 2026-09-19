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
    <div>
      <Link href={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
      </Link>
      <p>
        <strong>{blog.author}</strong>
      </p>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
    </div>
  );
};

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = getBlogs();
  const blogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
      )
    : allBlogs;
  const orderedBlog = blogs.toSorted((a, b) => b.likes - a.likes);
  return (
    <div>
      <form action={filterBlogs}>
        <input name="filter" type="search" />
        <button type="submit">Search</button>
      </form>
      {orderedBlog.map((blog) => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </div>
  );
};

export default Blogs;
