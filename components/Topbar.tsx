"use client";
import { useMemo, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SyndabrainModal from "./SyndabrainModal";

function LangSwitch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const curr = (searchParams.get("lang") ?? "en").toLowerCase().startsWith("es") ? "es" : "en";
  const setLang = (next: "es" | "en") => {
    const sp = new URLSearchParams(searchParams);
    sp.set("lang", next);
    router.replace(`${pathname}?${sp.toString()}`);
  };
  const base = "h-8 px-3 text-sm rounded-full border transition-colors";
  const active = "bg-neutral-900 text-white border-neutral-900";
  const idle   = "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100";
  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={() => setLang("es")} className={`${base} ${curr==="es"?active:idle}`}>ES</button>
      <button type="button" onClick={() => setLang("en")} className={`${base} ${curr==="en"?active:idle}`}>EN</button>
    </div>
  );
}

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const pageContext = useMemo(() => ({ source: "syndatools", section: "header" }), []);
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container-xl mx-auto h-14 flex items-center gap-3 px-3">
        <div className="text-lg font-semibold">SYNDATools</div>
        <div className="ml-auto flex items-center gap-2">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="h-9 px-4 rounded-full text-sm font-medium text-white shadow
                       bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_60%,#312e81_100%)]
                       hover:opacity-95 active:opacity-90"
            aria-haspopup="dialog"
          >
            Let’s Chat
          </button>
        </div>
      </div>
      <SyndabrainModal open={open} onClose={() => setOpen(false)} pageContext={pageContext}/>
    </header>
  );
}
