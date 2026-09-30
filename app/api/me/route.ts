import { getBlogWithUserUsername } from "@/app/services/users";
import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const tokenExtractor = (req: NextRequest) => {
  const authorization = req.headers.get("Authorization");

  if (!authorization) return null;

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) return null;

  return token;
};

export const GET = async (req: NextRequest) => {
  const token = tokenExtractor(req);
  if (!token) {
    return new NextResponse(null, { status: 401 });
  }
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    columns: { passwordHash: false, token: false },
    with: { blogs: { columns: { userId: false } } },
  });
  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }
  const userblogs = user
    ? (({ blogs, ...user }) => ({
        ...user,
        createdBlogs: blogs,
      }))(user)
    : undefined;
  return NextResponse.json(userblogs);
};
