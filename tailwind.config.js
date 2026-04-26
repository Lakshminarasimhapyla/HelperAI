import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: {
          950: "#070b16",
          900: "#0b1020",
          800: "#111827",
          700: "#1f2937"
        }
      },
      boxShadow: {
        glow: "0 0 50px rgba(59, 130, 246, 0.22)",
        panel: "0 20px 70px rgba(2, 6, 23, 0.28)"
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "gradient-shift": "gradient-shift 12s ease infinite",
        shimmer: "shimmer 1.8s infinite"
      }
    }
  },
  plugins: [typography]
};
