/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "spidr-dark": "#1a202c",
        "spidr-gray": "#2d3748",
        "spidr-teal": "#4fd1c7",
        "spidr-light-teal": "#81e6d9",
        "spidr-accent": "#63b3ed",
        "rose-gold": "#e8b4a6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
