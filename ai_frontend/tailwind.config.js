/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This is the CRUCIAL line for Angular projects!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
}