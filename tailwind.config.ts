import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-merriweather)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0EA5E9", // Medical Blue
          hover: "#0284C7",
          light: "#E0F2FE",
          dark: "#0369A1",
        },
        danger: {
          DEFAULT: "#EF4444", // Alert Red
          hover: "#DC2626",
          light: "#FEE2E2",
        },
        navy: {
          DEFAULT: "#0C4A6E", // Deep Medical Blue
          light: "#075985",
          lighter: "#0369A1",
          dark: "#082F49",
        },
        medical: {
          white: "#FAFAFA",
          cream: "#F8F7F4",
          silver: "#E5E7EB",
          slate: "#64748B",
        },
        "background-light": "#f5f5f8",
        code: {
          bg: "#1e1e1e",
          text: "#d4d4d4",
          keyword: "#569cd6",
          string: "#ce9178",
          comment: "#6a9955",
          number: "#b5cea8",
          function: "#dcdcaa",
        },
        callout: {
          bg: "#f8f9fa",
          border: "#3c3cf6",
          text: "#1a1a2e",
        },
      },
      maxWidth: {
        'prose': '70ch',
      },
    },
  },
  plugins: [],
};
export default config;
