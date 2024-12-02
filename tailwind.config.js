/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        main: "#41354D",
        secondary: "#5B0088",
        alt: "E0E0E0",
      },
      fontFamily: {
        header: ["Inter", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      fontSize: {
        small: "14px",
      },
      backgroundImage: {
        auth: "url('/images/waves-login-register.png')",
        profile: "url('/images/waves-profile.png')",
      },
      dropShadow: {
        btns: "0 4px 2px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
