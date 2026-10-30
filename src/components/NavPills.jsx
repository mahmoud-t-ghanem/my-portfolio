import { Box, ButtonBase, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useApp } from "../context/useApp";
import { NAV_ITEMS, scrollToSection } from "../utils/navigation";

export default function NavPills({ active }) {
  const { t } = useApp();

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        gap: 0.5,
        p: 0.6,
        borderRadius: "999px",
        border: 1,
        borderColor: "divider",
        bgcolor: (th) => alpha(th.palette.background.paper, 0.7),
      }}
    >
      {NAV_ITEMS.map(({ id, key, icon: Icon }) => {
        const selected = active === id;
        return (
          <ButtonBase
            key={id}
            onClick={() => scrollToSection(id)}
            aria-current={selected ? "true" : undefined}
            sx={{
              gap: 0.8,
              px: 2,
              py: 1,
              borderRadius: "999px",
              color: selected ? "primary.contrastText" : "text.secondary",
              bgcolor: selected ? "primary.main" : "transparent",
              transition: "all .25s ease",
              "&:hover": {
                color: selected ? "primary.contrastText" : "text.primary",
                bgcolor: selected
                  ? "primary.main"
                  : (th) => alpha(th.palette.primary.main, 0.14),
              },
            }}
          >
            <Icon sx={{ fontSize: 20 }} />
            <Typography
              component="span"
              sx={{ fontWeight: 700, fontSize: "0.92rem" }}
            >
              {t(key)}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
