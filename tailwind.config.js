/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,njk}"],

  plugins: [
    require('tailwind-scrollbar'),
  ],

  theme: {
    extend: {
    },
  },

}
