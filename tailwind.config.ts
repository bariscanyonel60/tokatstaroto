import type { Config } from "tailwindcss";

/**
 * Tasarım belirteçleri (tokens). Renkler aynı zamanda globals.css içinde
 * CSS değişkeni olarak tanımlıdır; ikisini birlikte güncelleyin.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0C",
        carbon: "#151619",
        surface: "#24262B",
        accent: {
          DEFAULT: "#FF681E",
          soft: "#FF8A4D",
        },
        fg: "#F2F2F0",
        muted: "#A5A7AD",
        line: "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "clamp(5rem, 11vw, 9.5rem)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      letterSpacing: {
        label: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
