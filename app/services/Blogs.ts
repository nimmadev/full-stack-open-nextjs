import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";

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
type BlogWitoutId = Omit<Blog, "id">;

export const addBlogs = async (data: BlogWitoutId) => {
  await db.insert(blogs).values(data);
};

export const increaseLike = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};
