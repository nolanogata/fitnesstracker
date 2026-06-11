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
        rice: "#f7f6f2",
        line: "#dfded6"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(31, 41, 35, 0.08)"
      }
    }
  },
  plugins: []
};
