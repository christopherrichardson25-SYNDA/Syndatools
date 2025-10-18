// lib/lang.ts
export type Lang = "es" | "en";
export type SP = Record<string, string | string[] | undefined>;

/** Detección robusta de idioma desde searchParams */
export function detectLangFromSearch(sp?: SP): Lang {
  const raw =
    typeof sp?.lang === "string"
      ? sp!.lang
      : Array.isArray(sp?.lang)
      ? sp!.lang[0]
      : "";
  return raw?.toLowerCase().startsWith("es") ? "es" : "en";
}

/** Diccionario i18n + aliases de compatibilidad */
export const t = (lang: Lang) => {
  const es = {
    nav: {
      home: "Inicio",
      tools: "Herramientas",
      letsChat: "Let’s Chat",
      syndaverse: "Syndaverse",
    },
    home: {
      heroTitle: "SyndaTools",
      heroLead: "Suite de herramientas conectadas al Syndaverse y SyndaBrain.",
      ctaTools: "Ver catálogo",
    },
    // Aliases de compatibilidad
    homeTitle: "SyndaTools",
    homeLead: "Suite de herramientas conectadas al Syndaverse y SyndaBrain.",
    goCatalog: "Ver catálogo",

    tools: {
      title: "Catálogo de Herramientas",
      lead1:
        "Explora las aplicaciones conectadas al Syndaverse. Cada app puede integrarse con SyndaBrain.",
    },
    labels: {
      open: "Abrir",
      soon: "Pronto",
      online: "En línea",
      offline: "Fuera de línea",
    },
  };

  const en = {
    nav: {
      home: "Home",
      tools: "Tools",
      letsChat: "Let’s Chat",
      syndaverse: "Syndaverse",
    },
    home: {
      heroTitle: "SyndaTools",
      heroLead: "Suite of tools connected to Syndaverse and SyndaBrain.",
      ctaTools: "Browse catalog",
    },
    // Aliases de compatibilidad
    homeTitle: "SyndaTools",
    homeLead: "Suite of tools connected to Syndaverse and SyndaBrain.",
    goCatalog: "Browse catalog",

    tools: {
      title: "Tools Catalog",
      lead1:
        "Explore the applications connected to Syndaverse. Each app can integrate with SyndaBrain.",
    },
    labels: {
      open: "Open",
      soon: "Soon",
      online: "Online",
      offline: "Offline",
    },
  };

  return lang === "es" ? es : en;
};
