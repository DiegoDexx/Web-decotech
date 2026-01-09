/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,scss,css}",  // ← AÑADIR SCSS AQUÍ
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        white: "#FFFFFF",
        brand: "#FBD036",
        black: "#000000",
      },
    },
  },
  plugins: [],
}
