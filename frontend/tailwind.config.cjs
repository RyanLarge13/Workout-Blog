/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "600px",
      sm: "720px",
      md: "1024px",
      lg: "1280px",
      xl: "1536px",
    },
    extend: {},
  },
  plugins: [],
};
