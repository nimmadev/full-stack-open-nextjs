"use server";
import { revalidatePath } from "next/cache";
import { markAsRead } from "../services/readingList";
import { getCurrentUser } from "../services/session";

export const markReadingList = async (formData: FormData) => {
  const blogId = formData.get("blogId") as string;
  const user = await getCurrentUser();
  if (!user) {
    return;
  }
  await markAsRead(Number(blogId), user.id);
  revalidatePath("/me");
};
