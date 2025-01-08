const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        street: ["StreetBomber"],
        redhat: ["Red Hat Text", "serif"],
      },

      colors: {
        background: colors.neutral[900],
      },
    },
  },
  plugins: [],
};
