"use client";

import { signOut, useSession } from "next-auth/react";
import NavLink from "./NavLink";

export const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex items-center gap-3">
      <div className="flex items-center gap-3">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/users">Users</NavLink>
        <NavLink href="/blogs">Blogs</NavLink>

        {session && <NavLink href="/blogs/new">Create Blog</NavLink>}
      </div>

      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm text-gray-300">{session.user?.name}</span>

            <button
              onClick={() => signOut()}
              className="rounded-xl border border-red-500 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white active:scale-95"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
