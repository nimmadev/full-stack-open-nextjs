"use server";

import { redirect } from "next/navigation";
import { addBlogs, addToReadingList, increaseLike } from "../services/Blogs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

type BlogFormState = {
  error: string;
  values: {
    title: string;
    author: string;
    url: string;
    likes: number;
  };
  success: boolean;
};

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
) => {
  const title = formData.get("title")?.toString().trim() ?? "";
  const author = formData.get("author")?.toString().trim() ?? "";
  const url = formData.get("url")?.toString().trim() ?? "";
  const likesValue = formData.get("likes")?.toString().trim() ?? "";

  const likes = Number(likesValue);

  const values = {
    title,
    author,
    url,
    likes: likesValue === "" ? 0 : likes,
  };

  const user = await auth();

  if (!user) {
    return {
      error: "You must be logged in to create a blog.",
      values,
      success: false,
    };
  }

  if (
    title.length < 5 ||
    author.length < 5 ||
    url.length < 5 ||
    Number.isNaN(likes) ||
    likes < 0
  ) {
    return {
      error: "Title, author and URL must be at least 5 characters.",
      values,
      success: false,
    };
  }

  await addBlogs({
    title,
    author,
    url,
    likes,
  });

  revalidatePath("/blogs");
  // redirect("/blogs");
  return { error: "", values, success: true };
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

export const addBlogToReadinglist = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await addToReadingList(Number(id));
  revalidatePath(`/blogs/${id}`);
};
