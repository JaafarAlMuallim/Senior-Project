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
          lightGray: "var(--secondary-lightGray)",
        },
        black: {
          "40": "var(--black-40)",
          "50": "var(--black-50)",
          "80": "var(--black-80)",
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
          light: "var(--gray-light)",
          medium: "var(--gray-medium)",
          dark: "var(--gray-dark)",
        },
        blue: {
          default: "#304FFE",
          def50:  "var(--blue-def50)",
          def100: "var(--blue-def100)",
          def200: "var(--blue-def200)",
          def300: "var(--blue-def300)",
          def400: "var(--blue-def400)",
          def500: "var(--blue-def500)",
          def600: "var(--blue-def600)"
        },
        violet: {
          default: "var(--violet-default)",
        },
        red: {
          default: "var(--red-default)",
        },
        orange: {
          default: "var(--orange-default)",
        },
        green: {
          default: "var(--green-default)",
        },
        white: {
          default: "var(--white-default)",
          light: "var(--white-light)",
          alt: "var(--white-alt)",
        },
        fill: {
          default: "var(--fill-default)",
        },
        chat: {
          default: "var(--chat-default)",
          replies: "var(--chat-replies)",
          notification: "var(--chat-notification)",
        },
        schedule: {
          term: "var(--schedule-term)",
          fill: "var(--schedule-fill)",
          nofill: "var(--schedule-nofill)",
        },
        toast: {
          success: "var(--toast-success)",
          danger: "var(--toast-danger)",
          error: "var(--toast-error)",
          warning: "var(--toast-warning)",
          info: "var(--toast-info)",
        },
        info: {
          default: "var(--info-default)",
        },
        success: {
          "100": "var(--success-100)",
          "200": "var(--success-200)",
          "300": "var(--success-300)",
          "400": "var(--success-400)",
          "500": "var(--success-500)",
          "600": "var(--success-600)",
          "700": "var(--success-700)",
          "800": "var(--success-800)",
          "900": "var(--success-900)",
          default: "var(--success-default)",
        },
        danger: {
          "100": "var(--danger-100)",
          "200": "var(--danger-200)",
          "300": "var(--danger-300)",
          "400": "var(--danger-400)",
          "500": "var(--danger-500)",
          "600": "var(--danger-600)",
          "700": "var(--danger-700)",
          "800": "var(--danger-800)",
          "900": "var(--danger-900)",
          default: "var(--danger-default)",
        },
        warning: {
          "100": "var(--warning-100)",
          "200": "var(--warning-200)",
          "300": "var(--warning-300)",
          "400": "var(--warning-400)",
          "500": "var(--warning-500)",
          "600": "var(--warning-600)",
          "700": "var(--warning-700)",
          "800": "var(--warning-800)",
          "900": "var(--warning-900)",
          default: "var(--warning-default)"
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
