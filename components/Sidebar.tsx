// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { t, type Lang, detectLangFromSearch } from "@/lib/lang";

export default function Sidebar({ lang }: { lang: Lang }) {
  const dict = t(lang);
  const sp = useSearchParams();

  // mantiene el ?lang= al navegar
  const withLang = (href: string) => {
    const p = new URLSearchParams(sp?.toString() || "");
    return `${href}?${p.toString()}`;
  };

  const landing =
    process.env.NEXT_PUBLIC_LANDING_URL ||
    "https://syndaverse-dashboard.vercel.app";

  const items = [
    { href: "/", label: dict.navHome },
    { href: "/tools", label: dict.navTools },
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
          {dict.navSyndaverse}
        </a>
      </nav>
    </aside>
  );
}
