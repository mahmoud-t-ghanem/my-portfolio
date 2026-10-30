import { useEffect, useState } from "react";

// يحدد أي قسم ظاهر حالياً ليتم تمييزه في الناف بار
export function useActiveSection(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
      if (atBottom) current = ids[ids.length - 1];

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, offset]);

  return active;
}
