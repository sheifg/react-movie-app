/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-dark-main': '#23242a',
        'gray-dark-second': '#28292d',
        'gray-light': '#d3dce6',
        'red-main': '#ff4b45',
      },
    },
  },
  plugins: [],
  // Selector, class and media
  // selector(developer decide when applies dark mode, you have button), media(browser default value, the browser decides darkmode or light, you dont have a button for that, ut is a setting on browser) and class(default, you have a button)
  // https://tailwindcss.com/docs/dark-mode#basic-usage:~:text=selector%E2%80%99%20strategy.-,Toggling%20dark%20mode%20manually,The%20selector%20strategy%20replaced%20the%20class%20strategy%20in%20Tailwind%20CSS%20v3.4.1.,-tailwind.config.js
  // at top level of your app you have to wrap with the dark mode
  darkMode: 'class',
};
