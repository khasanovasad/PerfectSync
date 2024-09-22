/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Add this line for Vite projects
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0056A1',
      },
    },
  },
  plugins: [],
};
