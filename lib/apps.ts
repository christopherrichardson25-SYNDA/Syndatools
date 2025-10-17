export type SyndaApp = {
  key: string;
  name: string;
  description: string;
  icon?: string;
  href: string;
  tags?: string[];
  online?: boolean;
  soon?: boolean;
};

export const APPS: SyndaApp[] = [
  {
    key: "vibragro",
    name: "VIBRAGRO",
    description:
      "Sistema de monitoreo ambiental y diagnóstico del estado de salud vegetal.",
    icon: "/icons/vg.png", // opcional, pon un png en /public/icons
    href: "#",
    tags: ["AgTech", "IAH", "Monitoreo"],
    online: true,
    soon: false,
  },
  {
    key: "vibramed",
    name: "VIBRAMED",
    description:
      "Calidad vibracional, estado armónico y desajuste resonante de estructuras biológicas.",
    icon: "/icons/vm.png",
    href: "#",
    tags: ["Health", "Diagnóstico"],
    online: false,
    soon: true,
  },
];
