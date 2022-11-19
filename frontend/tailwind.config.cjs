/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/Pages/**/*.{js,ts,jsx,tsx}",
    "./src/App.tsx",
  ],
  darkMode: "class",
  prefix: "",
  important: true,
  separator: ":",
  theme: {
    screens: {
      mobile: "420px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    fontFamily: {
      sans: ["SF Pro Display", "sans-serif"],
    },
    extend: {
      padding: {
        "6%": "6%",
        "60px": "60px",
        "20%": "20%",
        "10%": "10%",
      },
      colors: {
        primary: {
          100: "#75CCF3",
          200: "#30B9DC",
          300: "#0A2E43",
        },
        dark: {
          100: "#334155",
          200: "#182234",
          300: "#0F172A",
          400: "#0C1121",
        },
        light: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#F9F9F9",
        },
        lineClamp: {
          8: "8",
          10: "10",
          12: "12",
          16: "16",
        },
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ["hover", "focus"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
  ],
};
