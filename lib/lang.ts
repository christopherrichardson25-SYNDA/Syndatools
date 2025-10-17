// lib/lang.ts
export type Lang = "es" | "en";

export function detectLangFromSearch(
  sp: Record<string, string | string[] | undefined>
): Lang {
  const raw =
    typeof sp.lang === "string"
      ? sp.lang
      : Array.isArray(sp.lang)
      ? sp.lang[0]
      : "";
  return raw?.toLowerCase().startsWith("en") ? "en" : "es";
}

export function t(lang: Lang) {
  const en = {
    navHome: "Home",
    navTools: "Tools",
    navSyndaverse: "Syndaverse",
    hdrSyndaverse: "Syndaverse",
    hdrLetsChat: "Let’s Chat",
    homeTitle: "Welcome to SYNDATools",
    homeLead: "Catalog of tools and quick access.",
    goCatalog: "Go to catalog",
    toolsTitle: "Tools Catalog",
    cardOpen: "Open",
    cardSoon: "Coming soon",
  };

  const es = {
    navHome: "Inicio",
    navTools: "Tools",
    navSyndaverse: "Syndaverse",
    hdrSyndaverse: "Syndaverse",
    hdrLetsChat: "Let’s Chat",
    homeTitle: "Bienvenido a SYNDATools",
    homeLead: "Catálogo de herramientas y acceso rápido.",
    goCatalog: "Ir al catálogo",
    toolsTitle: "Catálogo de Herramientas",
    cardOpen: "Abrir",
    cardSoon: "Próximamente",
  };

  return lang === "en" ? en : es;
}

