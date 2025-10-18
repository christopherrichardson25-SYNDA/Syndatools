import AppCard from "@/components/AppCard";

type SP = Record<string, string | string[] | undefined>;

const t = (lang: "es" | "en") => ({
  title: lang === "es" ? "Catálogo de Herramientas" : "Tools Catalog",
  lead1:
    lang === "es"
      ? "Explora las aplicaciones conectadas al Syndaverse. Cada app puede integrarse con "
      : "Explore the applications connected to the Syndaverse. Each app can integrate with ",
  lead2: "SyndaBrain.",
  vibragroDesc:
    lang === "es"
      ? "Sistema de monitoreo ambiental y diagnóstico del estado de salud vegetal."
      : "Environmental monitoring and plant health assessment system.",
  vibramedDesc:
    lang === "es"
      ? "Calidad vibracional, estado armónico y desajuste resonante en estructuras biológicas."
      : "Vibrational quality, harmonic state and resonant mismatch in biological structures.",
  labels: {
    open: lang === "es" ? "Abrir" : "Open",
    soon: lang === "es" ? "Próximamente" : "Coming soon",
    online: lang === "es" ? "Online" : "Online",
    offline: lang === "es" ? "Offline" : "Offline",
  },
});

function pickLang(sp: SP): "es" | "en" {
  const v =
    typeof sp.lang === "string"
      ? sp.lang
      : Array.isArray(sp.lang)
      ? sp.lang[0]
      : "";
  return String(v).toLowerCase().startsWith("es") ? "es" : "en";
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const lang = pickLang(searchParams);
  const i = t(lang);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{i.title}</h1>
        <p className="text-sv-muted mt-2">
          {i.lead1}
          <strong>{i.lead2}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        <AppCard
          name="VIBRAGRO"
          description={i.vibragroDesc}
          icon="/icons/vibragro.png"
          href="#"
          online
          labels={i.labels}
        />

        <AppCard
          name="VIBRAMED"
          description={i.vibramedDesc}
          icon="/icons/vibramed.png"
          href="#"
          soon
          labels={i.labels}
        />
      </div>
    </div>
  );
}
