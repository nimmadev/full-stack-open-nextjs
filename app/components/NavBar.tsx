"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const NavBar = () => {
  const { data: session } = useSession();
  return (
    <nav>
      <Link href={"/"}>Home</Link>
      {" | "}
      <Link href={"/users"}>Users</Link>
      {" | "}
      <Link href={"/blogs"}>Blogs</Link>
      {" | "}
      {session ? (
        <>
          <Link href={"/blogs/new"}>Create blog</Link>
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {" | "}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  );
};
