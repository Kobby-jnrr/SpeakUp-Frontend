/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        institution: {
          50: '#f3f7fb',
          100: '#e5eef7',
          600: '#25699a',
          700: '#1f567d',
          900: '#18364f',
        },
        support: {
          50: '#f2f8f4',
          600: '#3f7f5f',
          700: '#336a4f',
        },
      },
    },
  },
  plugins: [],
};
