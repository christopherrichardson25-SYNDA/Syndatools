// app/tools/page.tsx
import AppCard from "@/components/AppCard";
import { detectLangFromSearch, type SP } from "@/lib/lang";

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const lang = detectLangFromSearch(sp);

  const t = (l: "es" | "en") => ({
    title: l === "es" ? "Catálogo de Herramientas" : "Tools Catalog",
    lead1:
      l === "es"
        ? "Explora las aplicaciones conectadas al Syndaverse. Cada app puede integrarse con SyndaBrain."
        : "Explore the applications connected to the Syndaverse. Each app can integrate with SyndaBrain.",
    vibragroDesc:
      l === "es"
        ? "Cálculo de IAH y analítica para agricultura."
        : "IAH calculation and analytics for agriculture.",
    vibramedDesc:
      l === "es"
        ? "Soporte clínico y protocolos asistidos por IA."
        : "Clinical support and AI-assisted protocols.",
    open: l === "es" ? "Abrir" : "Open",
    soon: l === "es" ? "Pronto" : "Soon",
    online: l === "es" ? "En línea" : "Online",
    offline: l === "es" ? "Fuera de línea" : "Offline",
  });

  const i = t(lang);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{i.title}</h1>
      <p className="text-slate-600">{i.lead1}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AppCard
          name="VIBRAGRO"
          description={i.vibragroDesc}
          icon="/icons/vibragro.png"
          href="https://vibragro.syndaverse.ai"
          online
          soon={false}
          labels={{
            open: i.open,
            soon: i.soon,
            online: i.online,
            offline: i.offline,
          }}
        />
        <AppCard
          name="VIBRAMED"
          description={i.vibramedDesc}
          icon="/icons/vibramed.png"
          href="https://vibramed.syndaverse.ai"
          online={false}
          soon
          labels={{
            open: i.open,
            soon: i.soon,
            online: i.online,
            offline: i.offline,
          }}
        />
      </div>
    </main>
  );
}
