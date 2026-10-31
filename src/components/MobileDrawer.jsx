import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Slide,
  Switch,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  CloseRounded,
  LanguageRounded,
  PaletteRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { useApp } from "../context/useApp";
import { profile } from "../data/profile";
import { NAV_ITEMS, scrollToSection } from "../utils/navigation";
import Logo from "./Logo";

const SLIDE_MS = 300;

function SettingRow({ icon, label, value, checked, onChange }) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2 }}
    >
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" fontWeight={700}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {value}
        </Typography>
      </Box>
      <Switch
        checked={checked}
        onChange={onChange}
        inputProps={{ "aria-label": label }}
      />
    </Box>
  );
}

export default function MobileDrawer({ open, onClose, active }) {
  const { t, l, dir, lang, mode, toggleLang, toggleMode } = useApp();

  const go = (id) => {
    onClose();
    setTimeout(() => scrollToSection(id), SLIDE_MS + 50);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{ backdrop: { timeout: SLIDE_MS } }}
    >
      <Slide
        in={open}
        direction={dir === "rtl" ? "right" : "left"}
        timeout={SLIDE_MS}
      >
        <Paper
          component="aside"
          role="dialog"
          aria-label={t("openMenu")}
          tabIndex={-1}
          square
          elevation={0}
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            insetInlineEnd: 0,
            width: 320,
            maxWidth: "88vw",
            p: 3,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            outline: 0,
            bgcolor: "background.paper",
            backgroundImage: "none",
            borderInlineStart: (th) => `1px solid ${th.palette.divider}`,
          }}
        >
          {/* الرأس */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}
          >
            <Logo size={34} />
            <Typography variant="h6" fontWeight={800} sx={{ flex: 1 }}>
              {l(profile.name)}
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label={t("closeMenu")}
              sx={{ border: 1, borderColor: "divider" }}
            >
              <CloseRounded />
            </IconButton>
          </Box>

          <Divider />

          {/* الأقسام */}
          <List sx={{ py: 2.5, display: "grid", gap: 0.75 }}>
            {NAV_ITEMS.map(({ id, key, icon: Icon }) => {
              const selected = active === id;
              return (
                <ListItemButton
                  key={id}
                  onClick={() => go(id)}
                  aria-current={selected ? "true" : undefined}
                  sx={{
                    borderRadius: 3,
                    py: 1.4,
                    px: 2,
                    color: selected ? "text.primary" : "text.secondary",
                    bgcolor: selected
                      ? (th) => alpha(th.palette.primary.main, 0.16)
                      : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: selected ? "primary.main" : "inherit",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t(key)}
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          {/* الإعدادات */}
          <Box sx={{ mt: "auto", pt: 3 }}>
            <Typography
              fontWeight={800}
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              <SettingsRounded fontSize="small" />
              {t("settings")}
            </Typography>

            <Box
              sx={{
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <SettingRow
                icon={<LanguageRounded />}
                label={t("language")}
                value={t("currentLanguage")}
                checked={lang === "en"}
                onChange={toggleLang}
              />
              <Divider />
              <SettingRow
                icon={<PaletteRounded />}
                label={t("appearance")}
                value={mode === "dark" ? t("dark") : t("light")}
                checked={mode === "dark"}
                onChange={toggleMode}
              />
            </Box>
          </Box>
        </Paper>
      </Slide>
    </Modal>
  );
}
