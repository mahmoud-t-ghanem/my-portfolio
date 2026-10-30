import { Grid } from "@mui/material";
import { useApp } from "../context/useApp";
import { projects } from "../data/projects";
import Section, { Reveal } from "./Section";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { t } = useApp();

  return (
    <Section
      id="projects"
      title={t("projectsTitle")}
      subtitle={t("projectsSub")}
    >
      {/* نظام غريد: 1 عمود (موبايل) - 2 (من 600px) - 3 (من 900px)، والصف الأخير يتوسّط */}
      <Grid container spacing={{ xs: 2.5, md: 3 }} justifyContent="center">
        {projects.map((project, i) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <Reveal delay={(i % 3) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
