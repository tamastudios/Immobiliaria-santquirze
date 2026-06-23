import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0F203D", deep: "#0A1729" },
        secondary: "#1E4A5A",
        accent: { DEFAULT: "#D4B26A", deep: "#C29E50" },
        cream: "#F5F1EA",
        ink: "#333333",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(15,32,61,0.18)",
        card: "0 4px 24px -8px rgba(15,32,61,0.16)",
        header: "0 6px 24px -12px rgba(15,32,61,0.25)",
      },
      maxWidth: { container: "1280px" },
      transitionTimingFunction: { premium: "cubic-bezier(0.22,1,0.36,1)" },
    },
  },
  plugins: [],
} satisfies Config;
