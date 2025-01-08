/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkOne: "#15191E",
        darkTwo: "#191E24",
        darkThree: "#1D232A",
        lightTwo: "#F2F2F2",
        lightThree: "#E5E6E6",
      },
    },
  },
  plugins: [daisyui],
};
