/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'my-purple': '#6A11CB',
        'my-blue': '#2575fC',
        'my-offwhite': '#F8F9FA',
        'my-darknavy': '#1A1A2E',
        'my-lavender': '#B39DDB',
        'my-coralaccent': '#FF6B6B',
        'my-yellow': '#E3C60D',
        'my-green': '#11B662',
        'my-lightblue': '#bbd3f8',
        'my-lightpurple': '#d4b6f2',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-dots-kf': {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'spin-animation': 'spin 1s linear infinite',
        'bounce-dots': 'bounce-dots-kf 1s infinite',
      },
    },
  },
  plugins: [],
};
