"use client";
import Link from "next/link";

export default function Sidebar() {
  const landing = process.env.NEXT_PUBLIC_LANDING_URL;

  return (
    <aside className="hidden md:block w-64 border-r border-sv-border bg-white">
      <nav className="p-4 space-y-1">
        <Link href="/" className="block rounded-lg px-3 py-2 text-sm hover:bg-sv-bg">Inicio</Link>
        <Link href="/tools" className="block rounded-lg px-3 py-2 text-sm hover:bg-sv-bg">Tools</Link>

        {landing && (
          <a
            href={landing}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-sv-bg"
            target="_self"       // abre en la misma pestaña
            rel="noopener"
          >
            Syndaverse
          </a>
        )}
      </nav>
    </aside>
  );
}
