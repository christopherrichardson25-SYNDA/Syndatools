"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { t, type Lang } from "@/lib/lang";

export default function Sidebar() {
  const sp = useSearchParams();
  const lang: Lang = (sp?.get("lang")?.toLowerCase().startsWith("en") ? "en" : "es");
  const dict = t(lang);

  const landing =
    process.env.NEXT_PUBLIC_LANDING_URL ||
    "https://syndaverse-dashboard.vercel.app";

  const withLang = (href: string) => {
    const p = new URLSearchParams(sp?.toString() || "");
    return `${href}?${p.toString()}`;
  };

  const items = [
    { href: "/", label: dict.nav.home },
    { href: "/tools", label: dict.nav.tools },
  ];

  return (
    <aside className="hidden md:block w-64 border-r border-sv-border bg-white">
      <nav className="p-4 space-y-1">
        {items.map((it) => (
          <Link
            key={it.href}
            href={withLang(it.href)}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-sv-bg"
          >
            {it.label}
          </Link>
        ))}
        <a
          href={landing}
          target="_blank"
          rel="noopener"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-sv-bg"
        >
          {dict.nav.syndaverse}
        </a>
      </nav>
    </aside>
  );
}
