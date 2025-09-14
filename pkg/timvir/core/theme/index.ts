import { css } from "@linaria/core";
import * as colors from "./colors";

const themes = {
  light: {
    backgroundColor: "#ffffff",
    textColor: colors.text.main,
    secondaryTextColor: colors.text.light,
    secondaryBackgroundColor: "#f9f8f9",

    sidebarHighlightColor: "rgb(237, 237, 237)",

    borderColor: "#e9e8ea",

    accentColor: colors.green["400"],

    backgroundPattern:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAHElEQVR4AWP4/u07Mvr75y8yGlBpND6a6oGUBgAxMSSkDKa/pQAAAABJRU5ErkJggg==)",
    highlightBackgroundColor: "#ffe10044",
  },
  dark: {
    backgroundColor: "#1f2023",
    textColor: "rgba(255 255 255 / 0.86)",
    secondaryTextColor: "rgba(255 255 255 / 0.56)",
    secondaryBackgroundColor: "#161618",

    sidebarHighlightColor: "rgb(41, 43, 47)",

    borderColor: "#27292f",

    accentColor: colors.green["400"],

    backgroundPattern:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAFklEQVQI12NQBQF2EGAghQkmwXxSmADZJQiZ2ZZ46gAAAABJRU5ErkJggg==)",
    highlightBackgroundColor: "rgba(174, 124, 20, 0.15)",
  },
} as const;

export const theme: string = css`
  :global() {
    :root {
      box-sizing: border-box;
      scroll-padding-top: 20px;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }

  :global() {
    :root {
      ${mkTheme(themes.light)};
    }

    :root[data-timvir-theme="dark"] {
      ${mkTheme(themes.dark)};
    }
  }

  /*
   * Temporary kludge to enable light/dark support in Code blocks. To be
   * removed once theming is implemented properly.
   */
  :global() {
    .timvir-b-Code .shiki span {
      color: var(--timvir-b-Code-shiki-light);
      font-style: var(--timvir-b-Code-shiki-light-font-style);
      font-weight: var(--timvir-b-Code-shiki-light-font-weight);
      text-decoration: var(--timvir-b-Code-shiki-light-text-decoration);
    }

    :root[data-timvir-theme="dark"] {
      .timvir-b-Code .shiki span {
        color: var(--timvir-b-Code-shiki-dark);
        font-style: var(--timvir-b-Code-shiki-dark-font-style);
        font-weight: var(--timvir-b-Code-shiki-dark-font-weight);
        text-decoration: var(--timvir-b-Code-shiki-dark-text-decoration);
      }
    }
  }

  font-family: system-ui, sans-serif;
  font-feature-settings: "liga", "kern";
  text-rendering: optimizelegibility;

  font-size: 0.9375rem;
  line-height: 1.7333;

  background-color: var(--timvir-background-color);
  color: var(--timvir-text-color);

  --c-p-0: ${colors.green["50"]};
  --c-p-1: ${colors.green["100"]};
  --c-p-2: ${colors.green["200"]};
  --c-p-3: ${colors.green["300"]};
  --c-p-4: ${colors.green["400"]};
  --c-p-5: ${colors.green["500"]};
`;

function mkTheme(config: (typeof themes)[keyof typeof themes]) {
  return `
    --timvir-background-color: ${config.backgroundColor};
    --timvir-text-color: ${config.textColor};
    --timvir-secondary-text-color: ${config.secondaryTextColor};
    --timvir-secondary-background-color: ${config.secondaryBackgroundColor};

    --timvir-border-color: ${config.borderColor};

    --timvir-sidebar-highlight-color: ${config.sidebarHighlightColor};

    --timvir-accent-color: ${config.accentColor};

    --timvir-background-pattern: ${config.backgroundPattern};
    --timvir-highlight-background-color: ${config.highlightBackgroundColor};
  `;
}
