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

  // Abrir/cerrar dialog controlado
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Cerrar con Esc
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

  // Evitar hydration: idioma estable en el primer render
  const [lang, setLang] = useState<"en" | "es">("en");
  useEffect(() => {
    try {
      const raw = typeof navigator !== "undefined" ? navigator.language : "";
      setLang(raw.toLowerCase().startsWith("es") ? "es" : "en");
    } catch {
      /* noop */
    }
  }, []);

  // Normaliza pageContext -> string
  const normalizedEntries: [string, string][] = Object.entries(pageContext).map(
    ([k, v]) => [k, v == null ? "" : String(v)]
  );

  const base =
    (process.env.NEXT_PUBLIC_SYNDABRAIN_URL?.replace(/\/$/, "") || "/syndabrain") +
    "/widget";

  const src = useMemo(() => {
    const qs = new URLSearchParams({
      uid: userId ?? "",
      email: userEmail ?? "",
      lang,
      ...Object.fromEntries(normalizedEntries),
    }).toString();
    return `${base}?${qs}`;
  }, [base, userId, userEmail, lang, normalizedEntries]);

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
    <dialog
      ref={dialogRef}
      className="s-modal"
      onMouseDown={onBackdropClick}
      aria-labelledby="syndabrain-title"
    >
      <div className="s-card">
        <header className="s-header">
          <h2 id="syndabrain-title" className="s-title">
            SYNDA Chat
          </h2>
          <button className="s-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <iframe
          src={src}
          title="Syndabrain"
          allow="clipboard-write; microphone; camera"
          className="s-iframe"
        />
      </div>

      <style jsx>{`
        .s-modal {
          padding: 0;
          border: none;
          background: transparent;
        }
        .s-modal::backdrop {
          backdrop-filter: blur(4px);
          background: rgba(0, 0, 0, 0.35);
        }
        .s-card {
          width: min(960px, 95vw);
          height: min(80vh, 820px);
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .s-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .s-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .s-close {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 6px 10px;
          background: #f9fafb;
          cursor: pointer;
        }
        .s-iframe {
          flex: 1;
          width: 100%;
          border: 0;
        }
        @media (prefers-color-scheme: dark) {
          .s-card {
            background: #0b0f14;
            color: #e5e7eb;
          }
          .s-header {
            border-color: #1f2937;
          }
          .s-close {
            background: #0f141a;
            border-color: #1f2937;
            color: #e5e7eb;
          }
        }
      `}</style>
    </dialog>
  );
}
