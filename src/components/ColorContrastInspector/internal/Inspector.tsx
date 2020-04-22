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
        grid-gap: 2px;
        align-items: center;
      `}
      style={{
        gridTemplateColumns: `80px repeat(${values.length}, 1fr)`,
      }}
    >
      <div style={{ height: 80 }} />

      {values.map((value, i) => {
        const color = chroma.contrast(value, "white") > chroma.contrast(value, "black") ? "white" : "black";
        return (
          <>
            <div
              className={css`
                align-self: stretch;

                &:first-child {
                  border-radius: 3px 0 0 0;
                }
                &:last-child {
                  border-radius: 0 3px 0 0;
                }
              `}
              style={{ background: value, gridRow: "1 / 9", gridColumn: `${i + 2} / span 1` }}
            />
            <div
              className={css`
                justify-self: center;
              `}
              style={{ color, gridRow: "1 / span 1", gridColumn: `${i + 2} / span 1` }}
            >
              {value}
            </div>
          </>
        );
      })}

      {/* <div
        className={css`
          display: block;
          z-index: 2;
          border-radius: 3px 3px 0 0;
          box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.15);
          content: "";
          pointer-events: none;
          user-select: none;
          align-self: stretch;
        `}
        style={{ gridRow: `1 / 9`, gridColumn: "2 / -1" }}
      /> */}

      {["#FFFFFF", "#DCDF5A", "#06838F", "#727272", "#333333", "#142F4E", "#000000"].reverse().map((text, i) => {
        const color = chroma.contrast(text, "white") > chroma.contrast(text, "black") ? "white" : "black";
        return (
          <React.Fragment>
            <div
              className={css`
                grid-column: 1 / span 1;
                height: 32px;
              `}
              style={{ background: text, gridRow: `${i + 2} / span 1` }}
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
              {text}
            </div>

            {values.map((value, j) => {
              const content = op(value, text);
              const color = content ? text : undefined;

              return (
                <div
                  className={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                  style={{ color, gridRow: `${i + 2} / span 1`, gridColumn: `${j + 2} / span 1` }}
                >
                  {content}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </Root>
  );
}

export default React.forwardRef(Inspector);

function opacity(contrast: number, background: string, text: string) {
  if (chroma.contrast(background, text) < contrast) {
    return undefined;
  }

  const go = (min: number, max: number) => {
    if (min > max) {
      return undefined;
    }

    if (max - min < 1 / 1e4) {
      return min;
    }

    const mid = (min + max) / 2;
    const c = chroma.contrast(background, blendColor(background, text, mid));

    if (c >= contrast) {
      return go(min, mid);
    } else {
      return go(mid, max);
    }
  };

  return go(0, 1);
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

  const fmt = (n: undefined | number) => (n === undefined ? "–" : `${Math.round(n * 100)}%`);

  // console.log(background, text, large, normal)

  if (large === undefined && normal === undefined) {
    return "";
  } else {
    return `${fmt(large)} / ${fmt(normal)}`;
  }
}
