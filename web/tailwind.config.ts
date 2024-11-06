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
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
            selected: '#3044FF',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  colors: {
    primary: {
      dark: "#3044FF", // Darker Blue
      light: "#4561FF", // Lighter Blue (use opacity class)
      white: "#FFF", // Primary White
      black: "#000", // primary black
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
      def50: "rgba(69, 97, 255, 0.05)",
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
    fill: {
      default: "#4561FF", // for any fill object
    },
    chat: {
      default: "4561FF", // fill color of user chat
      replies: "rgba(69, 97, 255, 0.7)", // replies fill color
      notification: "rgba(69, 97, 255, 0.8)", // replies fill color
    },
    schedule: {
      term: "rgba(69, 97, 255, 0.1)", // color for term select and day
      fill: "#4561FF", //class time or day
      nofill: "#F6F6F5", // not class time or not that day
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
      100: "#F0FFF4",
      200: "#C6F6D5",
      300: "#9AE6B4",
      400: "#68D391",
      500: "#38A169",
      600: "#2F855A",
      700: "#276749",
      800: "#22543D",
      900: "#1C4532",
      default: "#EBF6EA", // Green
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
      default: "#FCEBED", // Red
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
      default: "#FDF4E2", // Orange
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
