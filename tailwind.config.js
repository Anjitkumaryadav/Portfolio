/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#08090A",
        surface: "#0E1012",
        "surface-2": "#141619",
        line: "rgba(255,255,255,0.08)",
        "line-strong": "rgba(255,255,255,0.16)",
        ink: "#F3F4F5",
        "ink-dim": "#8A9099",
        "ink-faint": "#565B62",
        signal: "#D2A15E",
        "signal-dim": "rgba(210,161,94,0.14)",
        data: "#6E8BFF",
      },
      fontFamily: {
        display: ['"Inter Tight Variable"', "Inter Tight", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono Variable"', "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        meta: "0.14em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        frame: "1440px",
      },
      keyframes: {
        "grain-shift": {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-5%)" },
          "30%": { transform: "translate(3%,-2%)" },
          "50%": { transform: "translate(-2%,4%)" },
          "70%": { transform: "translate(4%,2%)" },
          "90%": { transform: "translate(-3%,3%)" },
        },
        blink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
      },
      animation: {
        grain: "grain-shift 8s steps(6) infinite",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
