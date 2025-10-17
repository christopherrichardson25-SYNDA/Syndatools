"use client";

import { useState } from "react";

export default function LetsChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, context: { app: "SyndaTools", k: 5 } }),
    });
    const data = await res.json();
    setResponse(data.reply ?? "(sin respuesta)");
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">💬 SyndaTools Chat</h1>
      <textarea
        className="w-full p-3 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Hazle una pregunta a SyndaBrain..."
      />
      <button
        onClick={send}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Pensando..." : "Enviar"}
      </button>

      {response && (
        <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <strong>🧠:</strong> {response}
        </div>
      )}
    </main>
  );
}
