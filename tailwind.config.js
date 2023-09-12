/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    minWidth: {
      '1/2': '50%',
      full: '100%',
    },
  },
  plugins: [],
};
