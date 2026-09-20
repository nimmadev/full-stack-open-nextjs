import Link from "next/link";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <header>
          <nav>
            <Link href={"/"}>Home</Link>
            {" | "}
            <Link href={"/users"}>Users</Link>
            {" | "}
            <Link href={"/blogs"}>Blogs</Link>
            {" | "}
            <Link href={"/blogs/new"}>Create blog</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
