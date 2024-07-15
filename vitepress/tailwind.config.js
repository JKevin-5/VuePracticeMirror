/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/**/*.{js,ts,vue,md}',
    './**/**/*.{md,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  options: {
    safelist: ["html","body"]
  }
}

