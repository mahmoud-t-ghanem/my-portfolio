import { useCallback, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { buildTheme } from "../theme/theme";
import translations from "../i18n/translations";
import { AppContext } from "./useApp";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const cacheLtr = createCache({ key: "muiltr" });

const readStorage = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => readStorage("lang", "ar"));
  const [mode, setMode] = useState(() =>
    readStorage(
      "mode",
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    ),
  );

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir]);

  useEffect(() => {
    try {
      localStorage.setItem("mode", mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const toggleLang = useCallback(
    () => setLang((v) => (v === "ar" ? "en" : "ar")),
    [],
  );
  const toggleMode = useCallback(
    () => setMode((m) => (m === "dark" ? "light" : "dark")),
    [],
  );

  // t('key')  -> نص ثابت من translations.js
  // l({ar,en}) -> قيمة ثنائية اللغة من ملفات data
  const t = useCallback((key) => translations[lang][key] ?? key, [lang]);
  const l = useCallback(
    (v) => (typeof v === "string" ? v : (v?.[lang] ?? "")),
    [lang],
  );

  const theme = useMemo(() => buildTheme(mode, dir), [mode, dir]);
  const value = useMemo(
    () => ({ lang, dir, mode, toggleLang, toggleMode, t, l }),
    [lang, dir, mode, toggleLang, toggleMode, t, l],
  );

  return (
    <AppContext.Provider value={value}>
      <CacheProvider value={dir === "rtl" ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </AppContext.Provider>
  );
}
