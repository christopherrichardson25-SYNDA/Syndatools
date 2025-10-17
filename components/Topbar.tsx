"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SyndabrainModal from "./SyndabrainModal"; // si tu modal está en otro nombre/ruta, ajusta el import

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();

  // BASE del widget desde el env (sin /widget)
  const base = process.env.NEXT_PUBLIC_SYNDABRAIN_URL || "";
  const src = useMemo(() => {
    const url = new URL(`${base.replace(/\/$/, "")}/widget`);
    url.searchParams.set("lang", "es");
    url.searchParams.set("source", "syndatools");
    url.searchParams.set("section", "header");
    return url.toString();
  }, [base]);

  useEffect(() => {
    if (params?.get("chat") === "1") setOpen(true);
  }, [params]);

  return (
    <header className="topbar">
      <div className="container-xl flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold">SyndaTools</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/tools" className="btn btn-ghost">
            Catálogo
          </Link>

          {/* Volver al landing */}
          <a
            href={process.env.NEXT_PUBLIC_LANDING_URL || "/"}
            className="btn btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            Syndaverse
          </a>

          {/* Abrir widget */}
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            LET’S CHAT
          </button>
        </div>
      </div>

      <SyndabrainModal open={open} onClose={() => setOpen(false)} src={src} />
    </header>
  );
}
