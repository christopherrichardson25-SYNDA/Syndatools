export type AppItem = {
  key: "vibragro" | "vibramed";
  name: { es: string; en: string };
  description: { es: string; en: string };
  href: string;
  icon?: string;
  online: boolean;
  soon?: boolean;
  healthPath?: string;
};

const APPS: AppItem[] = [
  {
    key: "vibragro",
    name: { es: "VIBRAGRO", en: "VIBRAGRO" },
    description: {
      es: "Sistema de monitoreo ambiental y diagnóstico del estado de salud vegetal.",
      en: "Environmental monitoring and plant health assessment system.",
    },
    href: "#",
    online: true,
    healthPath: "/api/ping",
  },
  {
    key: "vibramed",
    name: { es: "VIBRAMED", en: "VIBRAMED" },
    description: {
      es: "Calidad vibracional, estado armónico y desajuste resonante de estructuras biológicas.",
      en: "Vibrational quality, harmonic state and resonant mismatch in biological structures.",
    },
    href: "#",
    online: false,
    soon: true,
  },
];

export default APPS;
