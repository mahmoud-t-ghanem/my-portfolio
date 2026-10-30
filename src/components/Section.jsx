import { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

// ظهور تدريجي عند التمرير (يُستخدم داخل الكاردات أيضاً)
export function Reveal({ children, delay = 0, sx }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        height: "100%",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default function Section({ id, title, subtitle, children }) {
  return (
    <Box
      id={id}
      component="section"
      sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: "104px" }}
    >
      <Container maxWidth="lg">
        <Reveal sx={{ height: "auto", textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "2rem", md: "2.6rem" } }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: 70,
              height: 4,
              mx: "auto",
              my: 2,
              borderRadius: 2,
              bgcolor: "primary.main",
              boxShadow: (th) => `0 0 14px ${th.palette.primary.main}`,
            }}
          />
          {subtitle && (
            <Typography
              color="text.secondary"
              sx={{ maxWidth: 560, mx: "auto" }}
            >
              {subtitle}
            </Typography>
          )}
        </Reveal>
        {children}
      </Container>
    </Box>
  );
}
