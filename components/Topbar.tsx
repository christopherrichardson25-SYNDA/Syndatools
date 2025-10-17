"use client";
import { useState } from "react";
import Link from "next/link";
import SyndabrainModal from "./SyndabrainModal";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const landing =
    process.env.NEXT_PUBLIC_LANDING_URL || "https://syndaverse-dashboard.vercel.app";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sv-border bg-white/80 backdrop-blur">
        <div className="container-xl flex h-14 items-center px-3">
          <div className="flex items-center gap-2">
            <span className="size-6 rounded-md bg-sv-primary" />
            <span className="font-semibold">SyndaTools</span>
          </div>

          <nav className="ml-auto flex items-center gap-2">
            {/* ← SIN “Catálogo” */}
            <Link
              href={landing}
              target="_blank"
              className="hidden sm:inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-sv-bg"
            >
              Syndaverse
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition
                         bg-blue-600 hover:bg-blue-700 active:translate-y-[1px]"
              aria-haspopup="dialog"
            >
              LET’S CHAT
            </button>
          </nav>
        </div>
      </header>

      <SyndabrainModal
        open={open}
        onClose={() => setOpen(false)}
        pageContext={{ source: "syndatools", section: "header" }}
      />
    </>
  );
}
