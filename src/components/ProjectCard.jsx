import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { GitHub, OpenInNewRounded, ImageRounded } from "@mui/icons-material";
import { useApp } from "../context/useApp";
import { glow } from "../theme/theme";

// نسبة أبعاد منطقة الصورة (عرض / ارتفاع)
const IMAGE_RATIO = "16 / 10";

// بادينغ بنسبة من عرض الكارد: الكارد الضيق أقل، والعريض أكتر
const PAD = "clamp(16px, 6%, 24px)";

// أحجام خطوط مرنة تتدرج بسلاسة مع عرض الشاشة
const FONT = {
  title: "clamp(1.05rem, 0.95rem + 0.4vw, 1.25rem)",
  body: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)",
  button: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)",
};

// الأزرار: بحجم محتواها، تتوزع بالتساوي، وتنزل تحت بعضها بدل ما تنضغط
const buttonSx = {
  flex: "1 1 auto",
  minHeight: 44,
  py: 0.9,
  px: 1.5,
  fontSize: FONT.button,
  whiteSpace: "nowrap",
  borderRadius: "20px",
};

export default function ProjectCard({ project }) {
  const { t, l } = useApp();
  const [failed, setFailed] = useState(false);
  const hasImage = project.image && !failed;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        transition: "all .35s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "primary.main",
          boxShadow: (th) => glow(th, 1.2),
          "& img": { transform: "scale(1.05)" },
        },
      }}
    >
      {/* الصورة */}
      <Box
        sx={{
          position: "relative",
          aspectRatio: IMAGE_RATIO,
          overflow: "hidden",
          bgcolor: (th) => alpha(th.palette.primary.main, 0.1),
        }}
      >
        {hasImage ? (
          <Box
            component="img"
            src={project.image}
            alt={l(project.title)}
            loading="lazy"
            onError={() => setFailed(true)}
            sx={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: "top",
              transition: "transform .5s ease",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: "primary.main",
            }}
          >
            <ImageRounded sx={{ fontSize: 48 }} />
          </Box>
        )}
      </Box>

      {/* المحتوى */}
      <CardContent sx={{ flexGrow: 1, p: PAD, pb: 1.5 }}>
        <Typography
          variant="h6"
          fontWeight={800}
          gutterBottom
          sx={{ fontSize: FONT.title, overflowWrap: "anywhere" }}
        >
          {l(project.title)}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: FONT.body,
            lineHeight: 1.8,
            mb: 2,
            // أقصى 4 أسطر (احذف الأسطر الأربعة التالية لإلغاء القص)
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {l(project.description)}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.8}>
          {project.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Stack>
      </CardContent>

      {/* الأزرار */}
      <Box
        sx={{
          px: PAD,
          pb: PAD,
          pt: 0.5,
          display: "flex",
          flexWrap: "wrap",
          gap: 1.25,
        }}
      >
        {project.demo && (
          <Button
            variant="contained"
            disableElevation
            href={project.demo}
            target="_blank"
            rel="noopener"
            startIcon={<OpenInNewRounded />}
            sx={buttonSx}
          >
            {t("liveDemo")}
          </Button>
        )}
        {project.github && (
          <Button
            variant="outlined"
            href={project.github}
            target="_blank"
            rel="noopener"
            startIcon={<GitHub />}
            sx={buttonSx}
          >
            {t("code")}
          </Button>
        )}
      </Box>
    </Card>
  );
}
