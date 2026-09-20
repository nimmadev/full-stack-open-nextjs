"use server";

import { redirect } from "next/navigation";
import { addBlogs, increaseLike } from "../services/Blogs";
import { revalidatePath } from "next/cache";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const likes = Number(formData.get("likes"));

  if (!title || !author || !url || Number.isNaN(likes)) {
    return;
  }

  await addBlogs({ title, author, url, likes });
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const increaseBlogLike = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await increaseLike(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath(`/blogs`);
};

export const filterBlogs = async (formData: FormData) => {
  const filter = formData.get("filter")?.toString().trim();
  if (!filter) redirect("/blogs");
  const params = new URLSearchParams({ filter });

  redirect(`/blogs?${params.toString()}`);
};
