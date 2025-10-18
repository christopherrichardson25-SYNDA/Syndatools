// app/tools/page.tsx
import AppCard from "@/components/AppCard";
import { detectLangFromSearch, type SP } from "@/lib/lang";

/** i18n simple */
const t = (lang: "es" | "en") => ({
  title:
    lang === "es" ? "Catálogo de Herramientas" : "Tools Catalog",
  lead1:
    lang === "es"
      ? "Explora las aplicaciones conectadas al Syndaverse. Cada app puede integrarse con"
      : "Explore the applications connected to the Syndaverse. Each app can integrate with",
  lead2:
    lang === "es"
      ? "SyndaBrain para in-context reasoning y conocimientos específicos."
      : "SyndaBrain for in-context reasoning and domain knowledge.",
  vibragroDesc:
    lang === "es"
      ? "Gestión agrícola con IAH y recomendaciones."
      : "Agri management with IAH and recommendations.",
  vibramedDesc:
    lang === "es"
      ? "Herramientas de salud y seguimiento inteligente."
      : "Health tools and smart tracking.",
  labels: {
    open: lang === "es" ? "Abrir" : "Open",
    soon: lang === "es" ? "Pronto" : "Soon",
    online: lang === "es" ? "En línea" : "Online",
    offline: lang === "es" ? "Fuera de línea" : "Offline",
  },
});

/** Página (Next 15: searchParams es Promise) */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const lang = detectLangFromSearch(sp);
  const i = t(lang);

  const apps = [
    {
      name: "VIBRAGRO",
      description: i.vibragroDesc,
      icon: "/icons/vibragro.png",
      href: "#", // pon la URL real cuando esté lista
      online: true,
      soon: false,
      labels: i.labels,
    },
    {
      name: "VIBRAMED",
      description: i.vibramedDesc,
      icon: "/icons/vibramed.png",
      href: "#", // pon la URL real cuando esté lista
      online: false,
      soon: true,
      labels: i.labels,
    },
  ];

  return (
    <main className="p-6 space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">{i.title}</h1>
        <p className="text-gray-600">
          {i.lead1} <b>SyndaBrain</b>. {i.lead2}
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {apps.map((a) => (
          <AppCard
            key={a.name}
            name={a.name}
            description={a.description}
            icon={a.icon}
            href={a.href}
            online={a.online}
            soon={a.soon}
            labels={a.labels}
          />
        ))}
      </section>
    </main>
  );
}

