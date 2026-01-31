import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f4ff",
          100: "#e0e2ff",
          500: "#4f46e5",
          600: "#4338ca",
          900: "#111827"
        }
      }
    }
  },
  plugins: []
};

export default config;


