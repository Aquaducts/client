/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // https://www.color-hex.com/color/353335
        "nav-pink": "#353335",
        "body-pink": "#2f2d2f",
        "page-pink": "#2f2d2f"// "#252325"
      },
    }
  },
  plugins: [],
}