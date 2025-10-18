"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PageContextValue = string | number | boolean | null | undefined;

type Props = {
  open: boolean;
  onClose: () => void;
  userId?: string | null;
  userEmail?: string | null;
  pageContext?: Record<string, PageContextValue>;
};

export default function SyndabrainModal({
  open,
  onClose,
  userId,
  userEmail,
  pageContext = {},
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // solo cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // abrir/cerrar dialog cuando cambia "open"
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // evitar que ESC cierre sin onClose
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [onClose]);

  // idioma solo en cliente
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

  // normaliza y ORDENA las query params para que sean deterministas
  const entries = Object.entries({
    uid: userId ?? "",
    email: userEmail ?? "",
    lang,
    ...(Object.fromEntries(
      Object.entries(pageContext).map(([k, v]) => [k, v == null ? "" : String(v)])
    ) as Record<string, string>),
  }).sort(([a], [b]) => a.localeCompare(b));

  const src = useMemo(() => {
    const qs = new URLSearchParams(entries).toString();
    return `${base}?${qs}`;
  }, [base, lang, userId, userEmail, JSON.stringify(entries)]);

  // No renderizamos el iframe hasta estar montados y abiertos
  if (!open) return null;

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const d = dialogRef.current!;
    const r = d.getBoundingClientRect();
    const inside =
      e.clientX >= r.left &&
      e.clientX <= r.right &&
      e.clientY >= r.top &&
      e.clientY <= r.bottom;
    if (!inside) onClose();
  };

  return (
    <dialog ref={dialogRef} className="s-modal" onMouseDown={onBackdropClick} aria-labelledby="syndabrain-title">
      <div className="s-card">
        <header className="s-header">
          <h2 id="syndabrain-title" className="s-title">SYNDA Chat</h2>
          <button className="s-close" onClick={onClose} aria-label="Close">✕</button>
        </header>

        {mounted ? (
          <iframe
            src={src}
            title="Syndabrain"
            allow="clipboard-write; microphone; camera"
            className="s-iframe"
          />
        ) : (
          <div className="s-iframe" aria-hidden />
        )}
      </div>

      <style jsx>{`
        .s-modal { padding:0; border:none; background:transparent; }
        .s-modal::backdrop { backdrop-filter: blur(4px); background: rgba(0,0,0,.35); }
        .s-card { width:min(960px,95vw); height:min(80vh,820px); background:#fff; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.15); display:flex; flex-direction:column; overflow:hidden; }
        .s-header { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb; }
        .s-title { margin:0; font-size:1rem; font-weight:600; }
        .s-close { border:1px solid #e5e7eb; border-radius:10px; padding:6px 10px; background:#f9fafb; cursor:pointer; }
        .s-iframe { flex:1; width:100%; border:0; }
        @media (prefers-color-scheme: dark) {
          .s-card { background:#0b0f14; color:#e5e7eb; }
          .s-header { border-color:#1f2937; }
          .s-close { background:#0f141a; border-color:#1f2937; color:#e5e7eb; }
        }
      `}</style>
    </dialog>
  );
}
