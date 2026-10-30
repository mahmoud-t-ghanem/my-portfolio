import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { DownloadRounded, GitHub, LinkedIn } from "@mui/icons-material";
import { useApp } from "../context/useApp";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { scrollToSection } from "../utils/navigation";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const techCount = skillGroups.reduce((n, g) => n + g.items.length, 0);
const reduceMotion = "@media (prefers-reduced-motion: reduce)";

export default function Hero() {
  const { t, l } = useApp();

  const stats = [
    { value: projects.length, label: t("statProjects") },
    { value: techCount, label: t("statTech") },
  ];

  return (
    <Box
      id="home"
      component="section"
      sx={{ py: { xs: 7, md: 11 }, overflow: "hidden" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 5, md: 6 }}
          alignItems="center"
          direction={{ xs: "column-reverse", md: "row" }}
        >
          {/* النص */}
          <Grid item xs={12} md={7}>
            <Chip
              label={t("available")}
              icon={
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  }}
                />
              }
              variant="outlined"
              sx={{ mb: 3, "& .MuiChip-icon": { mx: 1 } }}
            />
            <Typography variant="h6" color="text.secondary">
              {t("greeting")}
            </Typography>
            <Typography
              variant="h1"
              color="primary"
              sx={{ fontSize: { xs: "3rem", md: "4.6rem" }, lineHeight: 1.3 }}
            >
              {l(profile.name)}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
              {l(profile.role)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 560, lineHeight: 1.9 }}
            >
              {l(profile.bio)}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                disableElevation
                startIcon={<DownloadRounded />}
                href={profile.cv}
                download
              >
                {t("downloadCv")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollToSection("projects")}
              >
                {t("viewProjects")}
              </Button>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={3}
              sx={{ mt: 5 }}
            >
              {stats.map((s, i) => (
                <Stack
                  key={s.label}
                  direction="row"
                  alignItems="center"
                  spacing={3}
                >
                  {i > 0 && <Divider orientation="vertical" flexItem />}
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ textAlign: "center" }}
                    >
                      {s.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      {s.label}
                    </Typography>
                  </Box>
                </Stack>
              ))}
              <Divider orientation="vertical" flexItem />
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  href={profile.github}
                  target="_blank"
                  rel="noopener"
                  color="primary"
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                  color="primary"
                >
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          {/* الصورة مع الحلقات */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 280, md: 400 },
                height: { xs: 280, md: 400 },
                display: "grid",
                placeItems: "center",
              }}
            >
              {/* الحلقة الخارجية */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: 1,
                  borderColor: "divider",
                }}
              />

              {/* الحلقة المتقطعة الدوّارة مع النقطة */}
              <Box
                sx={{
                  position: "absolute",
                  inset: { xs: 28, md: 40 },
                  borderRadius: "50%",
                  border: "1.5px dashed",
                  borderColor: (th) => alpha(th.palette.primary.main, 0.55),
                  animation: `${spin} 28s linear infinite`,
                  [reduceMotion]: { animation: "none" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: -7,
                    left: "calc(50% - 7px)",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  },
                }}
              />

              {/* الصورة */}
              <Box
                sx={{
                  animation: `${float} 5s ease-in-out infinite`,
                  [reduceMotion]: { animation: "none" },
                }}
              >
                <Avatar
                  src={profile.photo || undefined}
                  alt={l(profile.name)}
                  sx={{
                    width: { xs: 170, md: 240 },
                    height: { xs: 170, md: 240 },
                    fontSize: "5rem",
                    fontWeight: 800,
                    bgcolor: "background.paper",
                    color: "primary.main",
                    border: 4,
                    borderColor: "primary.main",
                  }}
                >
                  {l(profile.name).charAt(0)}
                </Avatar>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
