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
        ink: "#242820",
        moss: "#4F6B55",
        leaf: "#E5EDE3",
        clay: "#C46A52",
        sun: "#D99A3D",
        sky: "#6f96a6",
        blush: "#d98770",
        rice: "#F7F4EC",
        surface: "#FFFDF8",
        oat: "#F1EBDD",
        line: "#E4DCCB",
        muted: "#9A927F"
      },
      boxShadow: {
        soft: "0 10px 24px rgba(36, 40, 32, 0.04)"
      }
    }
  },
  plugins: []
};
