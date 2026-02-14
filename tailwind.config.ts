import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warmth: {
          50: "#fef7ee",
          100: "#fdedd6",
          200: "#fad7ac",
          300: "#f6ba77",
          400: "#f19240",
          500: "#ed751a",
          600: "#de5b10",
          700: "#b84410",
          800: "#933615",
          900: "#772f14",
          950: "#401508",
        },
        calm: {
          50: "#f0fdf9",
          100: "#ccfbef",
          200: "#99f6e0",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Fraunces", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
