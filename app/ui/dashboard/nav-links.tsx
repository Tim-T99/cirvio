"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Chat", href: "/dashboard" },
  {
    name: "Documents",
    href: "/dashboard/documents",
  },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-12 grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-50 hover:text-blue-500 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-200 text-blue-600": pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
