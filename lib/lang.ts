export type Lang = "es" | "en";
export type SP = Record<string, string | string[] | undefined>;

/** Detecta idioma desde searchParams (default en) */
export function detectLangFromSearch(sp: SP): Lang {
  const src = sp?.lang;
  const raw =
    typeof src === "string" ? src : Array.isArray(src) ? src[0] : "";
  return raw.toLowerCase().startsWith("es") ? "es" : "en";
}

/** Textos básicos compartidos por Header, Sidebar y Home/Tools */
export const t = (lang: Lang) => {
  const es = {
    nav: { home: "Inicio", tools: "Herramientas", letsChat: "Let’s Chat" },
    home: {
      heroTitle: "SyndaTools",
      heroLead:
        "Suite de herramientas conectadas al Syndaverse y SyndaBrain.",
      ctaTools: "Ver catálogo",
    },
    tools: {
      title: "Catálogo de Herramientas",
      lead1:
        "Explora las aplicaciones conectadas al Syndaverse. Cada app puede integrarse con SyndaBrain.",
    },
    labels: { open: "Abrir", soon: "Pronto", online: "En línea", offline: "Fuera de línea" },
  };

  const en = {
    nav: { home: "Home", tools: "Tools", letsChat: "Let’s Chat" },
    home: {
      heroTitle: "SyndaTools",
      heroLead:
        "Suite of tools connected to Syndaverse and SyndaBrain.",
      ctaTools: "Browse catalog",
    },
    tools: {
      title: "Tools Catalog",
      lead1:
        "Explore the applications connected to Syndaverse. Each app can integrate with SyndaBrain.",
    },
    labels: { open: "Open", soon: "Soon", online: "Online", offline: "Offline" },
  };

  return lang === "es" ? es : en;
};
