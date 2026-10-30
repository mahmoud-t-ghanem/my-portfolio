import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useApp } from "../context/useApp";
import { skillGroups, USE_BRAND_COLORS } from "../data/skills";
import { glow } from "../theme/theme";
import Section, { Reveal } from "./Section";

function SkillTile({ skill }) {
  const { l } = useApp();
  const { icon: Icon, name, color } = skill;

  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100%",
        p: 2.5,
        textAlign: "center",
        transition: "all .3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "primary.main",
          boxShadow: (th) => glow(th),
          "& .skill-logo": { transform: "scale(1.1)" },
        },
      }}
    >
      <Box
        className="skill-logo"
        sx={{
          width: 68,
          height: 68,
          mx: "auto",
          mb: 1.5,
          borderRadius: 3,
          display: "grid",
          placeItems: "center",
          bgcolor: "action.hover",
          fontSize: 38,
          color: USE_BRAND_COLORS ? (color ?? "primary.main") : "primary.main",
          transition: "transform .3s ease",
          "& svg": { width: "1em", height: "1em", fontSize: "inherit" },
        }}
      >
        <Icon />
      </Box>
      <Typography variant="body2" fontWeight={700}>
        {l(name)}
      </Typography>
    </Paper>
  );
}

export default function Skills() {
  const { t, l } = useApp();

  return (
    <Section id="skills" title={t("skillsTitle")} subtitle={t("skillsSub")}>
      <Stack spacing={6}>
        {skillGroups.map((group) => (
          <Box key={group.id}>
            <Reveal sx={{ height: "auto", mb: 2.5 }}>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  "&::after": {
                    content: '""',
                    flex: 1,
                    height: "1px",
                    bgcolor: "divider",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 22,
                    borderRadius: 1,
                    bgcolor: "primary.main",
                  }}
                />
                {l(group.title)}
              </Typography>
            </Reveal>

            <Grid container spacing={2.5} justifyContent="center">
              {group.items.map((skill, i) => (
                <Grid item xs={6} sm={4} md={2} key={skill.id}>
                  <Reveal delay={i * 70}>
                    <SkillTile skill={skill} />
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Section>
  );
}
