import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        "bg-dark": "var(--bg-dark)",
        "bg-light": "var(--bg-light)",
        card: "var(--card)",
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '16px',
      },
      boxShadow: {
        'glass': 'var(--shadow)',
      }
    },
  },
  plugins: [],
};
export default config;
