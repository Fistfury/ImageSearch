/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: '#343a40', // dark grey
        brightLavender: '#7c4dff', // deep purple
        electricPurple: '#b388ff', // light purple
        // Add other colors as needed
      },
    },
  },
  plugins: [],
};