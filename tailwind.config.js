/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  important: ['#__next', 'headlessui-portal-root'],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/forms', '@tailwindcss/aspect-ratio', '@tailwindcss/line-clamp'],
  corePlugins: {
    preflight: false,
  }
}
