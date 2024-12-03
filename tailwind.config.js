/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        main: "#41354D",
        secondary: "#5B0088",
        alt: "#E0E0E0",
      },
      fontFamily: {
        header: ["Inter", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      fontSize: {
        small: "14px",
        medium: "20px",
        large: "36px",
        xLarge: "46px",
      },
      backgroundImage: {
        auth: "url('/images/waves-login-register.png')",
        home: "url('/images/waves-main.png')",
        profile: "url('/images/waves-profile.png')",
      },
      dropShadow: {
        btns: "0 4px 2px rgba(0, 0, 0, 0.25)",
        input: "0 4px 4px rgba(0, 0, 0, 0.25)",
        text: "0 1px 1px rgba(0, 0, 0, 0.25)",
        filterBtns: "0 2px 2px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        spread: "2px 2px 5px rgba(0, 0, 0, 0.450)",
      },
    },
  },
  plugins: [],
};
