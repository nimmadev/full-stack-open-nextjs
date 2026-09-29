import Link from "next/link";

type NavLink = {
  href: string;
  children: React.ReactNode;
  className?: React.CSSProperties;
};
export default function NavLink({ href, children, className }: NavLink) {
  return (
    <Link
      href={href}
      className={`border-2 px-5 py-2 rounded-2xl hover:text-gray-400 transition-transform duration-100 active:scale-95 focus:outline-none ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
