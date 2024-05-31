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
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
