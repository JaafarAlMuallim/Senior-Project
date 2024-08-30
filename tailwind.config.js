/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        PoppinItalic: ["Poppinstalic", "sans-serif"],
        PoppinsBold: ["PoppinsBold", "sans-serif"],
        PoppinsBoldItalic: ["PoppinsBoldItalic", "sans-serif"],
        PoppinsExtraBold: ["PoppinsExtraBold", "sans-serif"],
        PoppinsExtraBoldItalic: ["PoppinsExtraBoldItalic", "sans-serif"],
        PoppinsExtraLight: ["PoppinsExtraLight", "sans-serif"],
        PoppinsExtraLightItalic: ["PoppinsExtraLightItalic", "sans-serif"],
        PoppinsItalic: ["PoppinsItalic", "sans-serif"],
        PoppinsLight: ["PoppinsLight", "sans-serif"],
        PoppinsLightItalic: ["PoppinsLightItalic", "sans-serif"],
        PoppinsMedium: ["PoppinsMedium", "sans-serif"],
        PoppinsMediumItalic: ["PoppinsMediumItalic", "sans-serif"],
        PoppinsRegular: ["PoppinsRegular", "sans-serif"],
        PoppinsSemiBold: ["PoppinsSemiBold", "sans-serif"],
        PoppinsSemiBoldItalic: ["PoppinsSemiBoldItalic", "sans-serif"],
        PoppinsThin: ["PoppinsThin", "sans-serif"],
        PoppinsThinItalic: ["PoppinsThinItalic", "sans-serif"],
      },
      colors: {
        primary: {
          default: "#3044FF", // Primary Blue
          dark: "#4561FF", // Darker Blue
          light: "#4561FF", // Lighter Blue (use opacity class)
          white: "#FFF", // Primary White
        },
        secondary: {
          main: "#9E86FF", // Violet
          gray: "#3F3D3D", // Dark Gray
          lightGray: "#D9D9D9", // Light Gray
        },
        black: {
          40: "rgba(0, 0, 0, 0.4)", // Black with 40% opacity 
          50: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
          80: "rgba(0, 0, 0, 0.8)", // Black with 80% opacity
        },
        gray: {
          light: "rgba(60, 60, 67, 0.6)", // Light Gray with 60% opacity
          medium: "rgba(63, 61, 61, 0.5)", // Medium Gray with 50% opacity
          dark: "#3F3D3D", // Dark Gray
        },
        blue: {
          default: "#304FFE", // Primary Blue
          def100: "rgba(69, 97, 255, 0.7)", // Lightest Blue with 70% opacity
          def200: "rgba(69, 97, 255, 0.75)", // Even Lighter Blue with 75% opacity
          def300: "rgba(69, 97, 255, 0.8)", // Lightest Blue with 80% opacity
          def400: "rgba(69, 97, 255, 0.9)", // Even Darker Blue with 90% opacity
          def500: "#4561FF", // Darker Blue
          def600: "#3865E0", // Accent Blue
        },
        violet: {
          default: "#9E86FF", // Violet
        },
        red: {
          default: "#C21D1A", // Destructive Red
        },
        orange: {
          default: "#F89402", // Warning Orange
        },
        green: {
          default: "#1D8C1D", // Success Green
        },
        white: {
          default: "#FFF", // White
          light: "#D9D9D9", // Light White
          alt: "#E3DBDB", // Alternative White
        },
        // widget: {
        //   default: "#8F98FF", // Blue for widgets
        // },
        fill: {
          default: "#4561FF" // for any fill object
        },
        chat: {
          default: "4561FF", // fill color of user chat
          replies: "rgba(69, 97, 255, 0.7)", // replies fill color
          notification: "rgba(69, 97, 255, 0.8)" // replies fill color
        },
        schedule: {
          term: "rgba(69, 97, 255, 0.1)", // color for term select and day
          fill: "4561FF", //class time or day
          nofill: "F6F6F5" // not class time or not that day

        },

        success: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#38A169",
          600: "#2F855A",
          700: "#276749",
          800: "#22543D",
          900: "#1C4532",
          default: "#1D8C1D", // Green
        },
        danger: {
          100: "#FFF5F5",
          200: "#FED7D7",
          300: "#FEB2B2",
          400: "#FC8181",
          500: "#F56565",
          600: "#E53E3E",
          700: "#C53030",
          800: "#9B2C2C",
          900: "#742A2A",
          default: "#C21D1A", // Red
        },
        warning: {
          100: "#FFFBEB",
          200: "#FEF3C7",
          300: "#FDE68A",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
          default: "#F89402", // Orange
        },
      },
    },
  },
  plugins: [],
};
