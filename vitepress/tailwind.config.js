/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/*.{js,ts,vue,md,html}',
    './docs/**/*.{js,ts,vue,md,html}',
    "./docs/.vitepress/**/*.{html,vue,js,ts,md}",
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

