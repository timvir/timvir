export { };

const mqls = Object.fromEntries(
  ["light", "dark"].map((colorScheme) => [
    colorScheme,
    (() => {
      const mql = window.matchMedia(`(prefers-color-scheme: ${colorScheme})`);
      mql.addEventListener("change", applyTheme);
      return mql;
    })(),
  ])
);

applyTheme();
function applyTheme() {
  const theme = detectTheme();
  if (theme) {
    useTheme(theme);
  }
}

function detectTheme(): undefined | string {
  try {
    const theme = localStorage.getItem("timvir-theme");
    if (theme) {
      return theme;
    }
  } catch {}

  for (const [colorScheme, mql] of Object.entries(mqls)) {
    if (mql.matches) {
      return colorScheme;
    }
  }
}

function useTheme(theme: string) {
  document.documentElement.setAttribute("data-timvir-theme", theme);
}
