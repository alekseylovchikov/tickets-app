"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLinks = () => {
  const links = [
    { label: "DASHBOARD", href: "/" },
    { label: "CV", href: "/cv" },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          href={link.href}
          className={`navbar-link uppercase font-bold ${
            currentPath == link.href &&
            "cursor-default text-blue-500 hover:text-primary/80 underline"
          }`}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
