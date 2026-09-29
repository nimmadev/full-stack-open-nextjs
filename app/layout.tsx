import "@/app/globals.css";
import { AuthSessionProvider } from "./components/SessionProvider";
import { NavBar } from "./components/NavBar";
import { NotificationProvider } from "./components/NotificationProvider";
import Notification from "./components/Notification";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AuthSessionProvider>
          <NotificationProvider>
            <header>
              <NavBar />
            </header>
            <Notification />
            <div className="px-8 py-2">{children}</div>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
