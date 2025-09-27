/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F14",
        card: "#0F141A",
        muted: "#9AA4B2",
        primary: "#22C55E",
        despesa: "#EF4444",
        receita: "#10B981",
        accent: "#6366F1",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
