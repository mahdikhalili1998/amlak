/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        background: "background-color, color, border-color",
      },
      transitionTimingFunction: {
        smooth: "ease-in-out",
      },
      transitionDuration: {
        default: "300ms",
      },
      fontFamily: {
        iranText: "IRANSansXFaNum",
      },
      gridTemplateColumns: {
        sebyek: "1fr 3fr",
      },
      screens: {
        tabletz: "350px",
        300: "300px",
        360: "360px",
        420: "420px",
        450: "450px",
        650: "650px",
        800: "800px",
      },
    },
  },
  plugins: [],
};
