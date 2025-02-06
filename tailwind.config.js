/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#65D1B5", // Custom primary color
      },
    }, // Extend Tailwind's default theme
  },
  plugins: [], // Add any Tailwind plugins if needed
};
