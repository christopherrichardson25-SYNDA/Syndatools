// components/Topbar.tsx
"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SyndabrainModal from "./SyndabrainModal";
import { t, type Lang } from "@/lib/lang";

export default function Topbar({ lang }: { lang: Lang }) {
  const dict = t(lang);
  const [open, setOpen] = useState(false);
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setLang = (next: Lang) => {
    const params = new URLSearchParams(sp?.toString() || "");
    params.set("lang", next);
    router.push(`${pathname}?${params.toString()}`);
  };

  const landing =
    process.env.NEXT_PUBLIC_LANDING_URL ||
    "https://syndaverse-dashboard.vercel.app";

  // params constantes para iframe
  const pageContext = useMemo(
    () => ({ source: "syndatools", section: "header" }),
    []
  );

  return (
    <header className="sticky top-0 z-40 border-b border-sv-border bg-white/80 backdrop-blur">
      <div className="container-xl flex h-14 items-center gap-3">
        <span className="size-6 rounded-md bg-sv-primary" />
        <span className="font-semibold">SYNDATools</span>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={landing}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            {dict.hdrCatalog}
          </a>

          {/* Selector ES/EN */}
          <div className="inline-flex rounded-lg border">
            <button
              className={`px-3 py-1 text-sm ${lang === "es" ? "bg-sv-bg" : ""}`}
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <button
              className={`px-3 py-1 text-sm ${lang === "en" ? "bg-sv-bg" : ""}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="btn btn-primary"
            aria-haspopup="dialog"
          >
            {dict.hdrLetsChat}
          </button>
        </div>
      </div>

      <SyndabrainModal
        open={open}
        onClose={() => setOpen(false)}
        pageContext={pageContext}
      />
    </header>
  );
}

