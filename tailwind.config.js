/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,njk,js}"],

  plugins: [
    require('tailwind-scrollbar'),
  ],

  theme: {
    extend: {
    },
  },

}
