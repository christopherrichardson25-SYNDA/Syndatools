# SYNDAtools

Plataforma web (Next.js) para operar **kits de conocimiento** y orquestarlos con **SYNDAbrain** (FastAPI). Primer MVP incluye el tool **Vibragro → IAH** con chat + semáforo y registro en Supabase.

---

## ✨ Objetivos del MVP

* [ ] Autenticación con Supabase Auth (RLS activo).
* [ ] Vista **/tools** con catálogo (Vibragro, Vibramed…)
* [ ] Chat conectado a **SYNDAbrain /chat** (sin stream en v0).
* [ ] Ejecución del tool `vibragro.iah` desde UI y retorno con **semáforo**.
* [ ] Persistencia: `chat_sessions`, `chat_messages`, `brain_logs`.

---

## 🏗️ Tech Stack

* **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui.
* **Auth/DB**: Supabase (Postgres/Timescale, RLS).
* **Backend externo**: SYNDAbrain (FastAPI) con `/chat` y `/tools/*/run`.

---

## 🚀 Quickstart

### 1) Requisitos

* Node 20+, pnpm
* Cuenta Supabase + proyecto
* URL del backend **SYNDAbrain** (FastAPI)

### 2) Variables de entorno

Crea **.env.local** desde este ejemplo:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_BRAIN_URL=            # ej: https://api.syndabrain.dev
NEXT_PUBLIC_BRAIN_WS=             # ej: wss://api.syndabrain.dev
```

### 3) Instalar dependencias

```bash
pnpm i
pnpm dev
```

---

## 🧩 Estructura propuesta

```
syndatools-app/
  app/
    layout.tsx
    page.tsx                # Home con CTA a /tools
    tools/page.tsx          # Catálogo de tools
    chat/[sessionId]/page.tsx
    api/token/route.ts      # Devuelve JWT de Supabase (server-side)
  components/
    ChatBox.tsx             # UI simple de chat
    StatusBadge.tsx         # Badge HARMONIC/score
  lib/
    supabase.ts             # Cliente Supabase
    brain.ts                # Cliente SYNDAbrain
  public/
  styles/
  README.md
```

---

## 🔌 Integración con SYNDAbrain (v0)

```ts
// lib/brain.ts
export async function brainChat(sessionId: string, message: string, context: any = {}) {
  const r = await fetch(process.env.NEXT_PUBLIC_BRAIN_URL + "/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message, context })
  });
  if (!r.ok) throw new Error("Chat failed");
  return r.json();
}
```

> En v0 no se envía Authorization para simplificar localmente. En prod, proteger con JWT de Supabase.

---

## 🗄️ SQL base (Supabase)

Ejecuta en el SQL editor de Supabase (o `supabase/migrations/*.sql`):

```sql
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  tool_id text not null,
  title text,
  created_at timestamptz default now()
);

create table if not exists public.chat_messages (
  id bigserial primary key,
  session_id uuid references public.chat_sessions(id) on delete cascade,
  role text check (role in ('user','assistant','system')),
  content text,
  created_at timestamptz default now()
);

create table if not exists public.brain_logs (
  id bigserial primary key,
  user_id uuid,
  session_id uuid,
  level text check (level in ('info','warn','error')),
  event jsonb,
  created_at timestamptz default now()
);

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.brain_logs enable row level security;

create policy "own sessions" on public.chat_sessions for all using (user_id = auth.uid());
create policy "own messages" on public.chat_messages for all using (
  session_id in (select id from public.chat_sessions where user_id = auth.uid())
);
create policy "own logs" on public.brain_logs for all using (user_id = auth.uid());
```

---

## 🧱 Componentes mínimos

```tsx
// components/StatusBadge.tsx
export default function StatusBadge({ state = 'HARMONIC', score = 0.78 }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs border">
      {state} • {Math.round(score * 100) / 100}
    </span>
  );
}
```

```tsx
// components/ChatBox.tsx
'use client'
import { useState } from 'react'
import { brainChat } from '@/lib/brain'
import StatusBadge from './StatusBadge'

export default function ChatBox({ sessionId }: { sessionId: string }) {
  const [msg, setMsg] = useState('hola synda')
  const [log, setLog] = useState<any[]>([])
  const [ethics, setEthics] = useState<any>(null)

  async function send() {
    const res = await brainChat(sessionId, msg)
    setLog((l) => [...l, { role: 'user', content: msg }, { role: 'assistant', content: res.reply }])
    setEthics(res.ethics)
    setMsg('')
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Chat</h3>
        {ethics && <StatusBadge state={ethics.state} score={ethics.score} />}
      </div>
      <div className="border rounded p-3 h-64 overflow-auto">
        {log.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
            <span className="text-xs opacity-70 mr-2">{m.role}</span>
            <span>{m.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2 flex-1" value={msg} onChange={e=>setMsg(e.target.value)} />
        <button onClick={send} className="border rounded px-3">Enviar</button>
      </div>
    </div>
  )
}
```

```tsx
// app/chat/[sessionId]/page.tsx
import ChatBox from '@/components/ChatBox'
export default function Page({ params }: { params: { sessionId: string } }) {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <ChatBox sessionId={params.sessionId} />
    </main>
  )
}
```

---

## 🧪 Comandos útiles

```bash
# Desarrollo
pnpm dev

# Lint & typecheck
pnpm lint && pnpm tsc --noEmit

# Build
pnpm build && pnpm start
```

---

## 🔒 Seguridad (MVP)

* En desarrollo local, `/chat` puede funcionar sin JWT.
* En producción, agrega `Authorization: Bearer <jwt>` emitido por **/api/token** (server-side) y verifica en **SYNDAbrain**.

---

## 📦 Roadmap corto

* v0: Chat → `/chat` (sin stream) + IAH (botón run) + semáforo.
* v1: WebSocket tokens + logs y sesiones persistentes.
* v2: Roles mentor/admin + auditoría + webhooks de tool_run.

---

## 🤝 Contribuir

* Convención de ramas: `feat/*`, `fix/*`, `chore/*`.
* Commits: Conventional Commits.

---

## 📝 Licencia

© 2025 SYNDAverse. Todos los derechos reservados.

