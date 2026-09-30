import { db } from "@/db";
import { readingList, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getReadingListWithUserId = (userId: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
    with: { readingList: { with: { blog: true } } },
    columns: { passwordHash: false, token: false },
  });
};

export const markAsRead = (blogId: number, userId: number) => {
  return db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.blogId, blogId), eq(readingList.userId, userId)));
};
