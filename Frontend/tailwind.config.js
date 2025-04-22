/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'my-gradmagenta': '#6A11CB',
        'my-gradblue': '#2575fc',
        'my-offwhite': '#F8F9FA',
        'my-darknavy': '#1A1A2E',
        'my-lavender': '#B39DDB',
        'my-coralaccent': '#FF6B6B',
      },
    },
  },
  plugins: [],
};
