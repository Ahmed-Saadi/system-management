/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "first-color": "#fff9f9",
        "first-color-soft": "#FFF2F1",
        "second-color": "#D6FF79",
        "third-color": "#B0FF92",
        "forth-color": "#A09BE7",
        "fifth-color": "#890AFF",
        "font-color": "#2A0052",
      },
    },
  },
  plugins: [],
};
