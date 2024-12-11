import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          1: "#1C1F2E",
          2: "#161925",
          3: "#252A41",
          4: "#1E2757",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
          white: "var(--primary-white)",
          black: "var(--primary-black)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          main: "var(--secondary-main)",
          gray: "var(--secondary-gray)",
          lightGray: "#D9D9D9",
        },
        black: {
          "40": "rgba(0, 0, 0, 0.4)",
          "50": "rgba(0, 0, 0, 0.5)",
          "80": "rgba(0, 0, 0, 0.8)",
          DEFAULT: "#000",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        gray: {
          light: "rgba(60, 60, 67, 0.6)",
          medium: "rgba(63, 61, 61, 0.5)",
          dark: "#3F3D3D",
        },
        blue: {
          default: "#304FFE",
          def50: "rgba(69, 97, 255, 0.05)",
          def100: "rgba(69, 97, 255, 0.7)",
          def200: "rgba(69, 97, 255, 0.75)",
          def300: "rgba(69, 97, 255, 0.8)",
          def400: "rgba(69, 97, 255, 0.9)",
          def500: "#4561FF",
          def600: "#3865E0",
        },
        violet: {
          default: "#9E86FF",
        },
        red: {
          default: "#C21D1A",
        },
        orange: {
          default: "#F89402",
        },
        green: {
          default: "#1D8C1D",
        },
        white: {
          default: "#FFF",
          light: "#D9D9D9",
          alt: "#E3DBDB",
        },
        fill: {
          default: "#4561FF",
        },
        chat: {
          default: "4561FF",
          replies: "rgba(69, 97, 255, 0.7)",
          notification: "rgba(69, 97, 255, 0.8)",
        },
        schedule: {
          term: "rgba(69, 97, 255, 0.1)",
          fill: "#4561FF",
          nofill: "#F6F6F5",
        },
        toast: {
          success: "#5A8156",
          danger: "#BB5653",
          error: "#BB5653",
          warning: "#A4603B",
          info: "#4F5FE2",
        },
        info: {
          default: "#E8E9FB",
        },
        success: {
          "100": "#F0FFF4",
          "200": "#C6F6D5",
          "300": "#9AE6B4",
          "400": "#68D391",
          "500": "#38A169",
          "600": "#2F855A",
          "700": "#276749",
          "800": "#22543D",
          "900": "#1C4532",
          default: "#EBF6EA",
        },
        danger: {
          "100": "#FFF5F5",
          "200": "#FED7D7",
          "300": "#FEB2B2",
          "400": "#FC8181",
          "500": "#F56565",
          "600": "#E53E3E",
          "700": "#C53030",
          "800": "#9B2C2C",
          "900": "#742A2A",
          default: "#FCEBED",
        },
        warning: {
          "100": "#FFFBEB",
          "200": "#FEF3C7",
          "300": "#FDE68A",
          "400": "#FACC15",
          "500": "#EAB308",
          "600": "#CA8A04",
          "700": "#A16207",
          "800": "#854D0E",
          "900": "#713F12",
          default: "#FDF4E2",
        },
      },
    },
    keyframes: {
      "caret-blink": {
        "0%,70%,100%": { opacity: "1" },
        "20%,50%": { opacity: "0" },
      },
      show: {
        "0%": { "animation-timing-function": "ease-in", width: "0%" },
        "100%": { "animation-timing-function": "ease-in", width: "100%" },
      },
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "caret-blink": "caret-blink 1.25s ease-out infinite",
      show: "show 0.7s forwards linear",
      "loop-scroll": "120s linear 0s infinite normal none running loop-scroll",
      spin: "spin 1s linear infinite",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
