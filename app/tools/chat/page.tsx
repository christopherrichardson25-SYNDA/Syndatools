"use client";
import { useState } from "react";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string };

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setErr("");
    setLoading(true);
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ message: text, context: { app: "SyndaTools", k: 5 } }),
      });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply ?? "Sin respuesta" }]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Chat con SyndaBrain</h1>

      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje…"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={send}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {!!err && <div className="p-3 bg-red-50 text-red-700 rounded border">Error: {err}</div>}

      <div className="space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className={`p-3 rounded border ${m.role === "user" ? "bg-white" : "bg-gray-50"}`}>
            <strong>{m.role === "user" ? "Tú" : "SyndaBrain"}:</strong> {m.content}
          </div>
        ))}
      </div>
    </div>
  );
}
