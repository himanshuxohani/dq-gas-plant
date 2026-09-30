/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          50: "#FFF4EC",
          100: "#FFE3CE",
          200: "#FFC79C",
          300: "#FFA35F",
          400: "#FF8A3D",
          500: "#F97316",
          600: "#E35D0A",
          700: "#BC4708",
          800: "#93380C",
          900: "#742E0F",
        },
        ink: {
          950: "#070B14",
          900: "#0B1220",
          850: "#0F1830",
          800: "#131E3A",
          700: "#1B2A4A",
          600: "#26385F",
          500: "#3A5075",
        },
        mist: {
          50: "#FAF8F5",
          100: "#F2EEE7",
          200: "#E4DDD1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px -30px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(249,115,22,0.25), 0 0 40px -8px rgba(249,115,22,0.45)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("light", ".light &");
    },
  ],
};
