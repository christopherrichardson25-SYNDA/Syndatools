"use client";
import { useState } from "react";
import SyndabrainModal from "./SyndabrainModal";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sv-border bg-white/80 backdrop-blur">
        <div className="container-xl flex h-14 items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-sv-primary" />
            <span className="font-semibold">SyndaTools</span>
          </div>

          <div className="ml-auto">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold
                         bg-blue-600 text-white shadow-sm hover:shadow-md active:translate-y-[1px] transition"
            >
              LET’S CHAT
            </button>
          </div>
        </div>
      </header>

      <SyndabrainModal open={open} onClose={() => setOpen(false)} pageContext={{ source: "syndatools", section: "header" }} />
    </>
  );
}
