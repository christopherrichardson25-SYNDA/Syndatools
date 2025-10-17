// app/page.tsx (Server Component)
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const h = await headers();
  const accept = h.get("accept-language") || "";
  const lang: "es" | "en" = accept.toLowerCase().startsWith("es") ? "es" : "en";

  // Render estático, sin navigator / Date.now / etc.
  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h1 className="text-2xl font-bold">
          {lang === "es" ? "Bienvenido a SYNDATools" : "Welcome to SYNDATools"}
        </h1>
        <p className="text-sv-muted mt-2">
          {lang === "es"
            ? "Launcher de aplicaciones del ecosistema Syndaverse. Cada app se conecta con SyndaBrain."
            : "Launcher for Syndaverse apps. Each app connects to SyndaBrain."}
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/tools" className="btn btn-primary">
            {lang === "es" ? "Ir al catálogo" : "Open catalog"}
          </Link>
        </div>
      </div>
    </div>
  );
}
