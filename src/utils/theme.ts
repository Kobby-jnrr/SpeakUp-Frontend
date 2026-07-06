export type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "app_theme";

export function getTheme(): ThemeMode {
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || "system";
}

export function setTheme(mode: ThemeMode) {
  localStorage.setItem(THEME_KEY, mode);
  applyTheme(mode);
}

export function applyTheme(mode: ThemeMode) {
  const root = window.document.documentElement;

  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  root.classList.remove("light", "dark");
  root.classList.add(isDark ? "dark" : "light");
}

export function initTheme() {
  const saved = getTheme();
  applyTheme(saved);
}
