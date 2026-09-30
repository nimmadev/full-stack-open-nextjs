import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { getCurrentUser } from "./session";

export const getBlogs = async (filter: string | undefined) => {
  if (filter?.trim()) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
      orderBy: desc(blogs.likes),
    });
  }
  return db.query.blogs.findMany({ orderBy: desc(blogs.likes) });
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({ where: eq(blogs.id, id) });
};

type Blog = typeof blogs.$inferSelect;
type BlogWitoutId = Omit<Blog, "id" | "userId">;

export const addBlogs = async (data: BlogWitoutId) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const blog = await db
    .insert(blogs)
    .values({ ...data, userId: user.id })
    .returning({ id: blogs.id });
  await db.insert(readingList).values({ userId: user.id, blogId: blog[0].id });
};

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const blog = await db.query.blogs.findFirst({ where: eq(blogs.id, blogId) });
  if (!blog) {
    return null;
  }
  await db.insert(readingList).values({ userId: user.id, blogId: blog.id });
};

export const inReadingList = async (userId: number, blogId: number) => {
  return await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  });
};
export const increaseLike = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};
