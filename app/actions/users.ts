"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type RegisterUserState = {
  values: {
    username: string;
    name: string;
  };
  error: string;
};

export const registerUser = async (
  prevState: RegisterUserState,
  formData: FormData,
): Promise<RegisterUserState> => {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  const errorMessage: RegisterUserState = {
    error: "",
    values: {
      username,
      name,
    },
  };

  if (username.length < 4 || name.length < 4) {
    errorMessage.error = "Username and name must be at least 4 characters";

    return errorMessage;
  }

  if (!password || !passwordConfirm) {
    errorMessage.error = "Password fields cannot be empty";

    return errorMessage;
  }

  if (password !== passwordConfirm) {
    errorMessage.error = "Passwords do not match";

    return errorMessage;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (user) {
    errorMessage.error = "Username is already taken";

    return errorMessage;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  redirect("/login");
};
