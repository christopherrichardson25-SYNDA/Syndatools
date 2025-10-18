export type Lang = "es" | "en";

export async function getLangFromSearchParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>
): Promise<Lang> {
  const sp = await searchParams;
  const raw = typeof sp.lang === "string" ? sp.lang : "";
  return raw.toLowerCase().startsWith("en") ? "en" : "es";
}

export const dict = {
  es: {
    home_title: "Bienvenido a SYNDATools",
    home_sub: "Catálogo de herramientas y acceso rápido.",
    tools_title: "Catálogo de Herramientas",
    lets_chat_title: "SYNDA Chat",
    send: "Enviar",
    write_here: "Escribe tu mensaje…",
  },
  en: {
    home_title: "Welcome to SYNDATools",
    home_sub: "Tools catalog and quick access.",
    tools_title: "Tools Catalog",
    lets_chat_title: "SYNDA Chat",
    send: "Send",
    write_here: "Type your message…",
  },
} as const;
