import { css } from "@linaria/core";
import { color } from "d3-color";
import * as colors from "./colors";

const themes = {
  light: {
    backgroundColor: "#ffffff",
    textColor: colors.text.main,
    secondaryTextColor: colors.text.light,
    secondaryBackgroundColor: "#f9f8f9",

    borderColor: "#e9e8ea",

    accentColor: colors.green["400"],
  },
  dark: {
    backgroundColor: "#1f2023",
    textColor: "rgba(255 255 255 / 0.86)",
    secondaryTextColor: "rgba(255 255 255 / 0.56)",
    secondaryBackgroundColor: "#161618",

    borderColor: "#27292f",

    accentColor: colors.green["400"],
  },
} as const;

export const theme = css`
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

function mkTheme(config: typeof themes[keyof typeof themes]) {
  return `
    --timvir-background-color: ${config.backgroundColor};
    --timvir-text-color: ${config.textColor};
    --timvir-secondary-text-color: ${config.secondaryTextColor};
    --timvir-secondary-background-color: ${config.secondaryBackgroundColor};

    --timvir-border-color: ${config.borderColor};

    --timvir-sidebar-highlight-color: ${tweakColor(config.backgroundColor)};

    --timvir-accent-color: ${config.accentColor};
  `;
}

const tweakColor = (input: string): string => {
  const c = color(input)!.rgb();
  const v = luminance([c.r, c.g, c.b]);
  return v < 127 ? c.brighter(0.8).toString() : c.darker(0.2).toString();
};

const luminance = ([r, g, b]: [number, number, number]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
