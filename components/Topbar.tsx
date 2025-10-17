"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SyndabrainModal from "@/components/SyndabrainModal";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();

  // BASE en .env: NEXT_PUBLIC_SYNDABRAIN_URL = https://syndaverse-dashboard.vercel.app/syndabrain
  const base = process.env.NEXT_PUBLIC_SYNDABRAIN_URL || "";
  const src = useMemo(() => {
    const u = new URL(`${base.replace(/\/$/, "")}/widget`);
    u.searchParams.set("lang", "es");
    u.searchParams.set("source", "syndatools");
    u.searchParams.set("section", "header");
    return u.toString();
  }, [base]);

  // auto-abrir si viene ?chat=1
  useEffect(() => {
    if (params?.get("chat") === "1") setOpen(true);
  }, [params]);

  return (
    <header className="border-b">
      <div className="container-xl flex items-center gap-3 h-14">
        <span className="font-semibold">SyndaTools</span>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/tools" className="btn btn-ghost">Catálogo</Link>
          <a
            href={process.env.NEXT_PUBLIC_LANDING_URL || "/"}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Syndaverse
          </a>
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            LET’S CHAT
          </button>
        </div>
      </div>

      <SyndabrainModal open={open} onClose={() => setOpen(false)} src={src} />
    </header>
  );
}
