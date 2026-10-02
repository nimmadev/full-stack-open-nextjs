import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  const body = await req.json();
  const { username, name, password } = body;
  if (!username || !name || !password) {
    return new NextResponse(null, { status: 400 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });
  return NextResponse.json({ username, name }, { status: 201 });
};
