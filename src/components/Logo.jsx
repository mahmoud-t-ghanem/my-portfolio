import { Box } from "@mui/material";
import { useApp } from "../context/useApp";
import { profile } from "../data/profile";

export default function Logo({ size = 37 }) {
  const { l } = useApp();

  if (profile.logo) {
    return (
      <Box
        component="img"
        src={profile.logo}
        alt="logo"
        sx={{
          width: size,
          height: size,
          borderRadius: 2,
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        display: "grid",
        placeItems: "center",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        fontWeight: 800,
        fontSize: size * 0.52,
      }}
    >
      {l(profile.name).charAt(0)}
    </Box>
  );
}
