"use client";
import { useMemo, useRef, useEffect } from "react";

export default function SyndabrainModal({
  open, onClose, pageContext,
}: { open: boolean; onClose: () => void; pageContext?: { source?: string; section?: string; lang?: string; uid?: string; email?: string }}) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  const src = useMemo(() => {
    const base = (process.env.NEXT_PUBLIC_SYNDABRAIN_URL || "/syndabrain").replace(/\/$/, "");
    const params = new URLSearchParams({
      uid: pageContext?.uid ?? "",
      email: pageContext?.email ?? "",
      lang: pageContext?.lang ?? "es",
      source: pageContext?.source ?? "syndatools",
      section: pageContext?.section ?? "header",
    });
    return `${base}/widget?${params.toString()}`;
  }, [pageContext]);

  return (
    <dialog ref={ref} className="s-modal" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <div className="s-content">
        <header className="s-header">
          <span className="s-title">SyndaBrain</span>
          <button className="s-close" onClick={onClose}>✕</button>
        </header>
        <iframe title="SyndaBrain" src={src} allow="clipboard-write; microphone; camera" className="s-iframe" />
      </div>
      <style jsx>{`
        .s-modal{padding:0;border:none;width:min(960px,96vw)}
        .s-content{display:flex;flex-direction:column;height:min(80vh,720px);background:#fff;border-radius:12px;overflow:hidden}
        .s-header{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #eee}
        .s-title{font-weight:600}.s-close{border:0;background:transparent;font-size:18px;cursor:pointer}
        .s-iframe{width:100%;height:100%;border:0}
      `}</style>
    </dialog>
  );
}
