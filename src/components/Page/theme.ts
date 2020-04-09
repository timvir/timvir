import { css } from "linaria";

export const theme = css`
  font-family: "Menlo", "Meslo LG", monospace;
  font-feature-settings: "liga", "kern";
  text-rendering: optimizelegibility;
  font-size: 14px;
  line-height: 1.725;
  color: rgba(0, 0, 0, 0.85);

  --c-p-0: #f0fcf6;
  --c-p-1: #d1f6e4;
  --c-p-2: #a0dbc1;
  --c-p-3: #61c19f;
  --c-p-4: #38a585;
  --c-p-5: #1b896b;

  --c-gray-8: #303030;

  --c-text: var(--c-gray-8);
`;
