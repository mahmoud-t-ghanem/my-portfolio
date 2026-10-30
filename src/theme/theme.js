import { createTheme, alpha } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";

export const buildTheme = (mode, direction) => {
  const isDark = mode === "dark";
  const paper = isDark ? "#171717" : "#ffffff";
  const tooltipBorder = alpha(lightGreen[500], 0.45);

  return createTheme({
    direction,
    palette: {
      mode,
      // اللون الوحيد المستخدم: Light Green 500 (#8bc34a)
      primary: { main: lightGreen[500], contrastText: "#111111" },
      background: isDark
        ? { default: "#0e0e0e", paper }
        : { default: "#f7f7f7", paper },
      text: isDark
        ? { primary: "#ededed", secondary: "#a1a1a1" }
        : { primary: "#1a1a1a", secondary: "#5f5f5f" },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"Cairo", sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
      button: { fontWeight: 700 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" },
          "::selection": { background: alpha(lightGreen[500], 0.4) },
        },
      },
      MuiButton: {
        styleOverrides: { root: { textTransform: "none", borderRadius: 12 } },
      },
      // التول تيب: خلفية بلون الثيم + بوردر أخضر خفيف + نص Light Green 500
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: paper,
            color: lightGreen[500],
            border: `1px solid ${tooltipBorder}`,
            borderRadius: 10,
            padding: "6px 12px",
            fontSize: "0.82rem",
            fontWeight: 700,
            boxShadow: `0 6px 18px ${alpha("#000000", isDark ? 0.5 : 0.12)}`,
          },
          arrow: {
            color: paper,
            "&::before": {
              border: `1px solid ${tooltipBorder}`,
              boxSizing: "border-box",
            },
          },
        },
      },
    },
  });
};

// الإضاءة الخضراء الخفيفة (هوفر الكاردات وغيرها)
export const glow = (theme, scale = 1) =>
  `0 0 ${24 * scale}px ${alpha(theme.palette.primary.main, 0.4)}`;

// خط مضيء أخضر (تحت النافبار وأعلى الفوتر)
export const glowLine = (theme) => ({
  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
  boxShadow: `0 0 18px 2px ${alpha(theme.palette.primary.main, 0.5)}`,
});
