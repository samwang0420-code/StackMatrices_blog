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
          DEFAULT: "#2DD4BF", // Clinical Teal
          hover: "#14B8A6",
          light: "#CCFBF1",
        },
        danger: {
          DEFAULT: "#EF4444", // Security Red
          hover: "#DC2626",
          light: "#FEE2E2",
        },
        navy: {
          DEFAULT: "#0B0F19", // Deep Space Navy
          light: "#111827",
          lighter: "#1A1F2E",
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
