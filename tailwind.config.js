/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iranText: "IRANSansXFaNum",
      },
      gridTemplateColumns: {
        sebyek: "1fr 3fr",
      },
      screens: {
        tabletz: "350px",
        450: "450px",
        650: "650px",
        800: "800px",
        300: "300px",
        360: "360px",
        420: "420px",
      },
    },
  },
  plugins: [],
};
