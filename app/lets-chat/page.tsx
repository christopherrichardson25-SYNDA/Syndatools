"use client";

import { useState } from "react";

export default function LetsChatPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [app, setApp] = useState("SyndaTools");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BRAIN_API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          context: { app, k: 5 },
        }),
      });

      const data = await res.json();
      setResponse(data.reply || "Sin respuesta del cerebro.");
    } catch (err) {
      setResponse("Error al conectar con SyndaBrain.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">💬 Chat con SyndaBrain</h1>

      <div className="flex gap-3 items-center">
        <label>App actual:</label>
        <select
          value={app}
          onChange={(e) => setApp(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="core">Core</option>
          <option value="SyndaTools">SyndaTools</option>
          <option value="Vibragro">Vibragro</option>
          <option value="Vibramed">Vibramed</option>
        </select>
      </div>

      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <strong>🧠 SyndaBrain:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
