import { css } from "@linaria/core";
import * as colors from "../../theme/colors";

export const theme = css`
  font-family: system-ui, sans-serif;
  font-feature-settings: "liga", "kern";
  text-rendering: optimizelegibility;
  font-size: 16px;
  line-height: 1.725;

  color: ${colors.text.main};

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
