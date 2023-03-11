/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        red: "#f00",
        blue: "#00f",
      },
      linearGradientColors: (theme) => theme("colors"),
      radialGradientColors: (theme) => theme("colors"),
      conicGradientColors: (theme) => theme("colors"),
      fontFamily: {
        sans: ["wotfard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
