/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rye: ['Rye', 'cursive'],
        carnival: ['Bungee', 'cursive'],
      },
    },
  },
  plugins: [],
};
