/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      smallPhones: "640px",
      normalPhones: "768px",
      smallTablets: "1024px",
      largeTablets: "1280px",
      deskTop: "1536px",
    },
    extend: {},
  },
  plugins: [],
};
