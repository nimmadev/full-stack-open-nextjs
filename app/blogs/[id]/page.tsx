import { increaseBlogLike } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/Blogs";
import { notFound } from "next/navigation";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  if (!blog) {
    return notFound();
  }
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        <strong>{blog.author}</strong>
      </p>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <form action={increaseBlogLike}>
        <input hidden defaultValue={blog.id} name="id" />
        <button type="submit">like</button>
      </form>
    </div>
  );
};

export default BlogPage;
