import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaNodeJs,
} from "react-icons/fa";
import { SiMui, SiExpress, SiMongodb } from "react-icons/si";
import { ApiRounded, DevicesRounded } from "@mui/icons-material";

// true  = شعارات بألوانها الرسمية
// false = كل الشعارات بالأخضر الخاص بالموقع
export const USE_BRAND_COLORS = true;

// لإضافة تقنية: أضف عنصراً داخل items لأي مجموعة (أو أنشئ مجموعة جديدة)
// color اختياري (لون الشعار الرسمي)
export const skillGroups = [
  {
    id: "frontend",
    title: { ar: "الواجهات الأمامية", en: "Frontend" },
    items: [
      { id: "html", name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { id: "css", name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { id: "js", name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { id: "react", name: "React", icon: FaReact, color: "#61DAFB" },
      { id: "mui", name: "Material UI", icon: SiMui, color: "#007FFF" },
      {
        id: "bootstrap",
        name: "Bootstrap",
        icon: FaBootstrap,
        color: "#7952B3",
      },
    ],
  },
  {
    id: "backend",
    title: { ar: "الخادم وقواعد البيانات", en: "Backend & Database" },
    items: [
      { id: "node", name: "Node.js", icon: FaNodeJs, color: "#5FA04E" },
      {
        id: "express",
        name: "Express.js",
        icon: SiExpress,
        color: "text.primary",
      },
      { id: "mongo", name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: "concepts",
    title: { ar: "المفاهيم والممارسات", en: "Concepts & Practices" },
    items: [
      { id: "rest", name: "REST API", icon: ApiRounded },
      {
        id: "responsive",
        name: { ar: "تصميم متجاوب", en: "Responsive Design" },
        icon: DevicesRounded,
      },
    ],
  },
];
