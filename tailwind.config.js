/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: '#1E1E1E',
      },
      colors: {
        purple: '#322566',
        cyan: '#24D1D3',
        yellow: '#E1FFB4',
        pink: '#FF56D1',
        green: '#B2FF9E',
        blue: '#6FFFE9',
      },
      textColor: {
        primary: '#90B7E4',
      },
    },
  },
  plugins: [],
};
