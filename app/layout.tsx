import Link from "next/link";
import { AuthSessionProvider } from "./components/SessionProvider";
import { NavBar } from "./components/NavBar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AuthSessionProvider>
          <header>
            <NavBar />
          </header>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
