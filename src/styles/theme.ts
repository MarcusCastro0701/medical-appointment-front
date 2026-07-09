export const theme = {
  colors: {
    bg: "#f8fafc",
    surface: "#ffffff",
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    text: "#0f172a",
    textMuted: "#64748b",
    textSubtle: "#94a3b8",
    primary: "#0d9488",
    primaryHover: "#0f766e",
    primaryLight: "#ccfbf1",
    danger: "#dc2626",
    dangerBg: "#fef2f2",
    dangerBorder: "#fecaca",
    warning: "#b45309",
    warningBg: "#fffbeb",
    warningBorder: "#fde68a",
    userBubbleBg: "#0d9488",
    userBubbleText: "#ffffff",
    aiBubbleBg: "#f1f5f9",
    aiBubbleText: "#0f172a",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    full: "999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.06)",
    md: "0 4px 12px rgba(15, 23, 42, 0.08)",
    lg: "0 12px 32px rgba(15, 23, 42, 0.12)",
  },
  font: {
    sans: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  breakpoints: {
    mobile: "640px",
  },
} as const;

export type Theme = typeof theme;
