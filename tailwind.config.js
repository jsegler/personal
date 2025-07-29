module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        libre: ["Libre Baskerville", "serif"],
        sourceSansPro: ["Source Sans Pro", "sans-serif"],
      },
      keyframes: {
        "pulse-twice": {
          "0%, 100%": { opacity: "1" },
          "10%": { opacity: "0.6" },
          "20%": { opacity: "1" },
          "30%": { opacity: "0.6" },
          "40%": { opacity: "1" },
          "100%": { opacity: "1" }, // hold
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-shadow": {
          "0%, 100%": { "box-shadow": "0 0 12px #c58230" },
          "50%": { "box-shadow": "0 0 15px #c55930" },
        },
      },
      animation: {
        "pulse-twice": "pulse-twice 10s ease-in-out infinite",
        "fade-out": "fade-out 0.5s ease-in-out forwards",
        "fade-in": "fade-in 1.0s ease-in-out forwards",
        "pulse-shadow": "pulse-shadow 2s ease-in-out infinite",
      },
      textShadow: {
        white: "0 0 12px rgba(255,255,255,1)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
