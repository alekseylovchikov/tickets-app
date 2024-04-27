"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLinks = ({ hasAccess }: { hasAccess: boolean }) => {
  const links = [
    { label: "DASHBOARD", href: "/" },
    { label: "CV", href: "/cv" },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      <span className="underline uppercase font-bold">aleksey lovchikov</span>
      {hasAccess &&
        links.map((link) => (
          <Link
            href={link.href}
            className={`navbar-link uppercase font-bold ${
              currentPath == link.href &&
              "cursor-default text-primary hover:text-primary/80"
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
