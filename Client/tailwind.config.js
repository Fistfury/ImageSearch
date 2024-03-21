/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jet: "#3b533b", // dark grey
        darkGreen: "#8da183", // darkGreen
        lightGreen: "#748d9b", // lightGreen
        whiteText: "#fafafa", // White
      },
      backgroundImage: (theme) => ({
        "hero-image": "url('/images/treesForest.jpg')",
      }),
      backgroundPosition: {
        "center-100": "center bottom",
        "center-bottom": "center 600px",
      },
    },
  },
  plugins: [],
};
