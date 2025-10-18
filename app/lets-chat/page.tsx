"use client";
import { useEffect, useMemo, useState } from "react";
import { dict, type Lang } from "@/lib/i18n";

export default function LetsChatPage() {
  const [lang, setLang] = useState<Lang>("es");

  // lee ?lang del cliente de forma segura
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const raw = (sp.get("lang") || "").toLowerCase();
      setLang(raw.startsWith("en") ? "en" : "es");
    } catch {}
  }, []);

  const t = dict[lang];
  const base =
    (process.env.NEXT_PUBLIC_SYNDABRAIN_URL?.replace(/\/$/, "") || "/syndabrain") +
    "/widget";

  const src = useMemo(() => {
    const qs = new URLSearchParams({
      uid: "",
      email: "",
      lang,
      source: "syndatools",
      section: "page",
    }).toString();
    return `${base}?${qs}`;
  }, [base, lang]);

  return (
    <main className="p-6 space-y-3">
      <h1 className="text-xl font-semibold">{t.lets_chat_title}</h1>
      <iframe
        src={src}
        title="Syndabrain"
        className="w-full"
        style={{ height: "75vh", border: 0, borderRadius: 12 }}
        allow="clipboard-write; microphone; camera"
      />
    </main>
  );
}
