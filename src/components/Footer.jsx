import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import { WhatsApp } from "@mui/icons-material";
import { useApp } from "../context/useApp";
import { profile } from "../data/profile";
import { glowLine } from "../theme/theme";
import Logo from "./Logo";
import { NAV_ITEMS, scrollToSection } from "../utils/navigation";

const socials = [
  [GitHub, profile.github],
  [LinkedIn, profile.linkedin],
  [WhatsApp, profile.whatsapp],
];

export default function Footer() {
  const { t, l } = useApp();

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        mt: 4,
        py: 6,
        bgcolor: "background.paper",
        "&::before": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 2,
          background: (th) => glowLine(th).background,
          boxShadow: (th) => glowLine(th).boxShadow,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <Logo size={33} />
              <Typography variant="h6" fontWeight={800}>
                {l(profile.name)}
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              sx={{ maxWidth: 380, lineHeight: 1.9 }}
            >
              {l(profile.role)}
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography fontWeight={800} sx={{ mb: 1.5 }}>
              {t("quickLinks")}
            </Typography>
            <Stack spacing={1} alignItems="flex-start">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  component="button"
                  underline="none"
                  color="text.secondary"
                  onClick={() => scrollToSection(item.id)}
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  {t(item.key)}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography fontWeight={800} sx={{ mb: 1.5 }}>
              {t("followMe")}
            </Typography>
            <Stack direction="row" spacing={1}>
              {socials.map(([Icon, href], i) => (
                <IconButton
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  color="primary"
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {l(profile.name)} — {t("rights")}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t("builtWith")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
