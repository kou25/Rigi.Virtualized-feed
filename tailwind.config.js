/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "rigi-50": "#f2f7f9",
        "rigi-100": "#DDEAF3",
        "rigi-200": "#DAE4ED",
        "rigi-300": "#10172A",
        "rigi-400": "#172038",
        "rigi-500": "#DAE4ED",
        "rigi-600": "#BFD4E4"
      }
    }
  },
  plugins: []
};
