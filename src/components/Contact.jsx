import { Box, Grid, Paper, Typography } from "@mui/material";
import { PhoneRounded } from "@mui/icons-material";
import { EmailRounded } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import { WhatsApp } from "@mui/icons-material";
import { useApp } from "../context/useApp";
import { profile } from "../data/profile";
import { glow } from "../theme/theme";
import Section, { Reveal } from "./Section";

// مصفوفة قابلة للزيادة
const contactItems = [
  {
    key: "phone",
    icon: PhoneRounded,
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    ltr: true,
  },
  {
    key: "email",
    icon: EmailRounded,
    value: profile.email,
    href: `mailto:${profile.email}`,
    ltr: true,
  },
  {
    key: "whatsapp",
    icon: WhatsApp,
    value: "WhatsApp",
    href: profile.whatsapp,
  },
  { key: "github", icon: GitHub, value: "GitHub", href: profile.github },
  {
    key: "linkedin",
    icon: LinkedIn,
    value: "LinkedIn",
    href: profile.linkedin,
  },
];

export default function Contact() {
  const { t } = useApp();

  return (
    <Section id="contact" title={t("contactTitle")} subtitle={t("contactSub")}>
      <Grid container spacing={3} justifyContent="center">
        {contactItems.map(({ key, icon: Icon, value, href, ltr }, i) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Reveal delay={i * 80}>
              <Paper
                variant="outlined"
                component="a"
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                sx={{
                  height: "100%",
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "primary.main",
                    boxShadow: (th) => glow(th),
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  <Icon />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" color="text.secondary">
                    {t(key)}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    noWrap
                    dir={ltr ? "ltr" : undefined}
                    sx={{ textAlign: "start" }}
                  >
                    {value}
                  </Typography>
                </Box>
              </Paper>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
