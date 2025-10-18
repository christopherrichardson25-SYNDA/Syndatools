export type Lang = "es" | "en";
export type SP = Record<string, string | string[] | undefined>;

/** Dado searchParams resueltos, detecta idioma (default: "en") */
export function detectLangFromSearch(sp: SP): Lang {
  const src = sp?.lang;
  const raw =
    typeof src === "string" ? src : Array.isArray(src) ? src[0] : "";
  return raw.toLowerCase().startsWith("es") ? "es" : "en";
}
