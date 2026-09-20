import { getBlogWithUserUsername } from "@/app/services/users";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getBlogWithUserUsername(username);
  if (!user) {
    notFound();
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        username: <strong>{user.username}</strong>
      </p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
