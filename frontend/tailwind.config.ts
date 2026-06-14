import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-card": "var(--bg-card)",
        "bg-card-hover": "var(--bg-card-hover)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        success: "var(--success)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        DEFAULT: "var(--radius-md)",
        sm: "var(--radius-sm)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-sm)",
        modal: "var(--shadow-lg)",
        accent: "var(--shadow-accent)",
      },
    },
  },
  plugins: [],
};

export default config;
