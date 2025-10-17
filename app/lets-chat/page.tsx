"use client";
import { useEffect, useMemo, useState } from "react";

export default function LetsChatPage() {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    try {
      const raw = typeof navigator !== "undefined" ? navigator.language : "";
      setLang(raw.toLowerCase().startsWith("es") ? "es" : "en");
    } catch {}
  }, []);

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
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-3">SYNDA Chat</h1>
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
