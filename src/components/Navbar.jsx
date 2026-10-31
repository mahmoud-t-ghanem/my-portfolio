import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  DarkModeRounded,
  LightModeRounded,
  LanguageRounded,
  MenuRounded,
} from "@mui/icons-material";
import { useApp } from "../context/useApp";
import { useActiveSection } from "../hooks/useActiveSection";
import { profile } from "../data/profile";
import { glowLine } from "../theme/theme";
import { SECTION_IDS, scrollToSection } from "../utils/navigation";
import Logo from "./Logo";
import NavPills from "./NavPills";
import MobileDrawer from "./MobileDrawer";

// نفس الشكل لكل أزرار الأيقونات في الناف بار
const actionButtonSx = {
  border: 1,
  borderColor: "divider",
  "&:hover": { borderColor: "primary.main" },
};

export default function Navbar() {
  const { t, l, lang, mode, toggleMode, toggleLang } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // التول تيب يصف الإجراء الذي سيحدث عند الضغط
  const themeLabel = mode === "dark" ? t("switchToLight") : t("switchToDark");
  const langLabel = lang === "ar" ? t("switchToEnglish") : t("switchToArabic");

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: (th) => alpha(th.palette.background.default, 0.8),
          backdropFilter: "blur(14px)",
          color: "text.primary",
          "&::after": {
            content: '""',
            position: "absolute",
            insetInline: 0,
            bottom: 0,
            height: 2,
            background: (th) => glowLine(th).background,
            boxShadow: (th) => glowLine(th).boxShadow,
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ gap: 1.5, minHeight: { xs: 72, sm: 84 } }}
          >
            {/* اللوغو والاسم */}
            <Box
              onClick={() => scrollToSection("home")}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
              }}
            >
              <Logo size={37} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
              >
                {l(profile.name)}
              </Typography>
            </Box>

            {/* الأقسام (كمبيوتر فقط) */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <NavPills active={active} />
            </Box>

            {/* الأزرار */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
                <Tooltip title={langLabel} arrow>
                  <IconButton
                    color="primary"
                    aria-label={langLabel}
                    onClick={toggleLang}
                    sx={actionButtonSx}
                  >
                    <LanguageRounded />
                  </IconButton>
                </Tooltip>

                <Tooltip title={themeLabel} arrow>
                  <IconButton
                    color="primary"
                    aria-label={themeLabel}
                    onClick={toggleMode}
                    sx={actionButtonSx}
                  >
                    {mode === "dark" ? (
                      <LightModeRounded />
                    ) : (
                      <DarkModeRounded />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* زر المنيو (موبايل فقط) */}
              <IconButton
                color="primary"
                aria-label={t("openMenu")}
                onClick={() => setDrawerOpen(true)}
                sx={{
                  ...actionButtonSx,
                  display: { xs: "inline-flex", md: "none" },
                }}
              >
                <MenuRounded />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        active={active}
      />
    </>
  );
}
