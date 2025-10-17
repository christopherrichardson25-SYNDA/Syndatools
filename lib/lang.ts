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
    hdrCatalog: "Syndaverse",
    hdrLetsChat: "Let’s Chat",
    homeTitle: "Welcome to SYNDATools",
    homeLead: "Quick access and tools catalog.",
    goCatalog: "Go to catalog",
    toolsTitle: "Tools Catalog",
    cardChatTitle: "Synda Chat",
    cardChatDesc: "Ask SyndaBrain about SyndaTools",
    open: "Open",
    soon: "Coming soon",
  };

  const es = {
    navHome: "Inicio",
    navTools: "Tools",
    navSyndaverse: "Syndaverse",
    hdrCatalog: "Syndaverse",
    hdrLetsChat: "Let’s Chat",
    homeTitle: "Bienvenido a SYNDATools",
    homeLead: "Catálogo de herramientas y acceso rápido.",
    goCatalog: "Ir al catálogo",
    toolsTitle: "Catálogo de Herramientas",
    cardChatTitle: "Synda Chat",
    cardChatDesc: "Consulta a SyndaBrain sobre SyndaTools",
    open: "Abrir",
    soon: "Próximamente",
  };

  return lang === "en" ? en : es;
}
