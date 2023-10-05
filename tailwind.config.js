/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      minWidth: {
        '1/2': '50%',
        full: '100%',
      },
      backgroundColor: {
        'table-head': '#e3e5e9',
      },
    },
  },
  plugins: [],
};
