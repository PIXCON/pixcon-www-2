/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './content/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Strict mode: only generate used classes
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
