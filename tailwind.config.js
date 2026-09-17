/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00288e",
        "primary-container": "#1e40af",
        "on-primary": "#ffffff",
        "on-primary-container": "#a8b8ff",
        "primary-fixed": "#dde1ff",
        "primary-fixed-dim": "#b8c4ff",
        "on-primary-fixed": "#001453",
        "on-primary-fixed-variant": "#173bab",

        "secondary": "#9d4300",
        "secondary-container": "#dfe0e0",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5c2400",
        "secondary-fixed": "#ffdbca",
        "secondary-fixed-dim": "#ffb690",
        "on-secondary-fixed": "#341100",
        "on-secondary-fixed-variant": "#783200",

        "tertiary": "#25354a",
        "tertiary-container": "#3c4c61",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#acbcd6",
        "tertiary-fixed": "#d3e4fe",
        "tertiary-fixed-dim": "#b7c8e1",
        "on-tertiary-fixed": "#0b1c30",
        "on-tertiary-fixed-variant": "#38485d",

        "background": "#f8f9fb",
        "on-background": "#191c1e",

        "surface": "#f8f9fb",
        "on-surface": "#191c1e",
        "surface-bright": "#f8f9fb",
        "surface-dim": "#d8dadc",
        "surface-variant": "#e0e3e5",
        "on-surface-variant": "#444653",
        "surface-tint": "#3755c3",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#edeef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",

        "inverse-surface": "#2d3133",
        "inverse-on-surface": "#eff1f3",
        "inverse-primary": "#b8c4ff",

        "outline": "#757684",
        "outline-variant": "#c4c5d5",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        "success": "#10B981",
        "success-container": "#D1FAE5",
        "on-success": "#ffffff",

        "warning": "#F59E0B",
        "warning-container": "#FEF3C7",
        "on-warning": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"]
      },
      boxShadow: {
        'stitch-sm': '0 1px 8px rgba(0, 0, 0, 0.04)',
        'stitch-card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'stitch-float': '0 8px 24px rgba(0, 40, 142, 0.25)',
      }
    },
  },
  plugins: [],
}
