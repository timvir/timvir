import React from "react";
import { css } from "linaria";
import chroma from "chroma-js";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  /**
   * Array of CSS Color values.
   */
  values: Array<string>;
}

function Inspector({ values, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      ref={ref}
      {...props}
      className={css`
        display: grid;
        grid-template-columns: 80px 1fr;
        grid-gap: 2px;
        align-items: center;
      `}
    >
      <div></div>
      <div
        className={css`
          position: relative;
          display: grid;

          &::before {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: block;
            z-index: 2;
            border-radius: 3px 3px 0 0;
            box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.15);
            content: "";
            pointer-events: none;
            user-select: none;
          }
        `}
        style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}
      >
        {values.map((value) => (
          <div
            className={css`
              height: 65px;

              &:first-child {
                border-radius: 3px 0 0 0;
              }
              &:last-child {
                border-radius: 0 3px 0 0;
              }
            `}
            style={{ background: value }}
          />
        ))}
      </div>

      {["#FFFFFF", "#DCDF5A", "#06838F", "#727272", "#333333", "#142F4E", "#000000"].reverse().map((background, i) => {
        const color = chroma.contrast(background, "white") > chroma.contrast(background, "black") ? "white" : "black";
        return (
          <React.Fragment>
            <div
              className={css`
                grid-column: 1 / -1;
                height: 32px;
              `}
              style={{ background, gridRow: `${i + 2} / span 1` }}
            />
            <div
              className={css`
                grid-column: 1 / span 1;
                padding-left: 12px;
                border-right: 2px solid white;
                height: 32px;
                display: flex;
                align-items: center;
                margin-right: -2px;
              `}
              style={{ gridRow: `${i + 2} / span 1`, color }}
            >
              {background}
            </div>
            <div
              className={css`
                grid-column: 2 / span 1;
                display: grid;
                height: 32px;
              `}
              style={{ color, gridTemplateColumns: `repeat(${values.length}, 1fr)`, gridRow: `${i + 2} / span 1` }}
            >
              {values.map((value) => (
                <div
                  className={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  {op(value, background)}
                </div>
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </Root>
  );
}

export default React.forwardRef(Inspector);

function opacity(contrast: number, background: string, text: string) {
  let opacity = 0;
  while (chroma.contrast(background, blendColor(background, text, opacity)) < contrast) {
    opacity += 0.01;

    if (opacity > 1) {
      return "–";
    }
  }

  if (opacity === 0) {
    return "–";
  }

  return `${Math.round(opacity * 100)}%`;
}

export function blendColor(c1: string, c2: string, a: number) {
  const [r1, g1, b1] = chroma(c1).rgb();
  const [r2, g2, b2] = chroma(c2).rgb();

  const a1 = 1 - a;
  const a2 = a;

  return chroma(r1 * a1 + r2 * a2, g1 * a1 + g2 * a2, b1 * a1 + b2 * a2);
}

function op(background: string, text: string) {
  const large = opacity(3, background, text);
  const normal = opacity(4.5, background, text);

  if (large === "–" && normal == "–") {
    return "";
  } else {
    return `${large} / ${normal}`;
  }
}
