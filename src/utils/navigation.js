import {
  HomeRounded,
  CodeRounded,
  FolderSpecialRounded,
  EmailRounded,
} from "@mui/icons-material";

export const NAV_ITEMS = [
  { id: "home", key: "home", icon: HomeRounded },
  { id: "skills", key: "skills", icon: CodeRounded },
  { id: "projects", key: "projects", icon: FolderSpecialRounded },
  { id: "contact", key: "contact", icon: EmailRounded },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export const scrollToSection = (id) => {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
