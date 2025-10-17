"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string; // URL completa al widget
};

export default function SyndabrainModal({ open, onClose, src }: Props) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  // cerrar por backdrop
  const onBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = (e.target as HTMLDialogElement).getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) onClose();
  };

  return (
    <dialog
      ref={ref}
      onMouseDown={onBackdrop}
      className="rounded-xl p-0 w-[min(980px,90vw)] h-[min(720px,85vh)]"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold">SyndaBrain</h3>
        <button onClick={onClose} aria-label="Close" className="px-2 py-1">
          ✕
        </button>
      </div>
      <iframe
        src={src}
        title="Syndabrain"
        allow="clipboard-write; microphone; camera"
        className="w-full h-[calc(100%-3rem)]"
      />
    </dialog>
  );
}

