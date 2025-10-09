# 🧠 SYNDAtools

Plataforma web (Next.js) para operar **kits de conocimiento** y orquestarlos con **SYNDAbrain** (FastAPI).  
El primer MVP incluye el tool **Vibragro → IAH**, con chat + semáforo y registro en Supabase.

---

## 🎯 Objetivos del MVP

- [ ] Autenticación con **Supabase Auth** (RLS activo).  
- [ ] Vista `/tools` con catálogo (Vibragro, Vibramed...).  
- [x] Chat conectado a **SYNDAbrain** (`/chat`) *(sin stream en v0)*.  
- [x] Ejecución del tool `vibragro.iah` desde la UI con retorno en **semáforo**.  
- [ ] Persistencia: `chat_sessions`, `chat_messages`, `brain_logs`.

---

## 🧩 Tech Stack

**Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui  
**Backend:** FastAPI (SYNDAbrain) + Pydantic + Uvicorn  
**DB/Auth:** Supabase (Postgres / TimescaleDB, Row-Level Security)  
**Infra:** GitHub Codespaces + Vercel (frontend) + Supabase (cloud backend)

---

## ⚙️ Quickstart

### 1️⃣ Requisitos

- Node.js 18+  
- Python 3.11+  
- (Opcional) Cuenta en [Supabase](https://supabase.com) para persistencia de datos  

---

### 2️⃣ Clonar y levantar entorno

```bash
# Clonar el repo
git clone https://github.com/christopherrichardson25-SYNDA/syndatools.git
cd syndatools
