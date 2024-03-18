/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jet: "#3b533b", // dark grey
        darkGreen: "#8da183", // deep purple
        electricPurple: "#748d9b",
        whiteText: "#fafafa", // White
        // Add other colors as needed
      },
    },
  },
  plugins: [],
};
