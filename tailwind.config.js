/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sunset: {
          200: "#F8D38A",
          300: "#E8E2AC",
          400: "#5DAF9E",
          500: "#062842",
          600: "#051F33",
          700: "#171d21",
        },
        star: {
          100: "#fffbe7",
        },
      },
      fontFamily: {
        primary: ["Oswald", "sans-serif"],
        secondary: ["Average"],
      },
    },
  },
  plugins: [],
};
