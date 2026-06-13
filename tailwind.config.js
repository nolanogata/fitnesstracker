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
        ink: "#1F2722",
        moss: "#566E61",
        leaf: "#DDE8E1",
        clay: "#D97A68",
        sun: "#C99848",
        sky: "#8FA8BD",
        blush: "#DFA898",
        rice: "#F8F7F3",
        surface: "#FFFFFF",
        oat: "#F6EBDD",
        line: "#E8E6DD",
        muted: "#8E978F"
      },
      boxShadow: {
        soft: "0 10px 24px rgba(36, 40, 32, 0.04)"
      }
    }
  },
  plugins: []
};
