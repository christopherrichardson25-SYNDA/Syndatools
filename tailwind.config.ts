// tailwind.config.ts
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'Helvetica', 'Arial'],
      },
      colors: {
        // Paleta Syndaverse (ajusta si ya la tienes definida)
        sv: {
          bg: "hsl(220 14% 97%)",
          card: "hsl(0 0% 100%)",
          border: "hsl(220 13% 91%)",
          text: "hsl(222 47% 11%)",
          muted: "hsl(215 16% 47%)",
          primary: "hsl(222 89% 56%)",     // azul Syndaverse
          primaryFg: "hsl(0 0% 100%)",
          accent: "hsl(161 94% 30%)",       // verde acento
          warn: "hsl(38 92% 50%)",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.1)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config
