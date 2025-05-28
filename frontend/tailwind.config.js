/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'sm': '340px', // Custom screen size for min-width: 340px
      },
      height: {
        'screen-85': '85vh',
      },
      fontFamily: {
        sans: ['Inter', "Inter"],
      },
    colors: {
  primary: "#1f2937", // ✅ Tailwind gray-800 – only for dark mode via 'dark:bg-primary'
  secondary: "#FFFFFF",
  tertiary: "#222222", // bg
  quaternary: "#444444", // border
  
}
    },
  },
  plugins: [],
};
