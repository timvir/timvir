import { css } from "@linaria/core";
import * as colors from "./colors";

export const theme = css`
  :global() {
    :root {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }
  }

  :global() {
    :root {
      --timvir-background-color: white;

      --timvir-text-color: ${colors.text.main};
      --timvir-secondary-text-color: ${colors.text.light};
    }
  }

  :global() {
    :root {
      font-family: system-ui, sans-serif;
      font-feature-settings: "liga", "kern";
      text-rendering: optimizelegibility;

      font-size: 16px;
      line-height: 1.725;
      
      background-color: var(--timvir-background-color);
      color: var(--timvir-text-color);
    }
  }

  --c-p-0: ${colors.green["50"]};
  --c-p-1: ${colors.green["100"]};
  --c-p-2: ${colors.green["200"]};
  --c-p-3: ${colors.green["300"]};
  --c-p-4: ${colors.green["400"]};
  --c-p-5: ${colors.green["500"]};

  --c-gray-8: ${colors.gray["800"]};

  --c-text: ${colors.text.main};
  --c-text-light: ${colors.text.light};
`;
