/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Hiragino Sans",
          "Yu Gothic",
          "system-ui",
          "sans-serif"
        ]
      },
      colors: {
        ink: "#1f2923",
        moss: "#526a57",
        leaf: "#8fb48e",
        clay: "#c76f51",
        sun: "#d9a441",
        sky: "#6f96a6",
        blush: "#d98770",
        rice: "#f7f6f2",
        surface: "#fffdf8",
        line: "#e4dfd2"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(31, 41, 35, 0.08)"
      }
    }
  },
  plugins: []
};
