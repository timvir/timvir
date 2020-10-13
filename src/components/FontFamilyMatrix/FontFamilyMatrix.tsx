import { css } from "linaria";
import React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  fontFaces: Array<{ name: string; style: React.CSSProperties; className?: string }>;
}

function FontFamilyMatrix({ fontFaces, className, ...props }: Props, ref: any /* FIXME */) {
  const sortedWeights = Array.from(new Set(fontFaces.map((fontFace) => fontFace.style.fontWeight))).sort();
  const styles = ["normal", "italic"];

  return (
    <Root ref={ref} className={className} {...props}>
      <div
        className={css`
          margin: 0 -24px;
          padding: 16px 24px;
          background: white;
          font-size: 2rem;
          line-height: 1;
          display: grid;
          grid-row-gap: 16px;
          grid-template-columns: min-content min-content 1fr;
          align-items: baseline;
        `}
      >
        {sortedWeights.map((weight) => (
          <>
            <div
              className={css`
                font-size: 14px;
                opacity: 0.5;
                padding-right: 24px;
              `}
            >
              {weight}
            </div>
            {styles.map((style) => {
              const fontFace = fontFaces.find((x) => x.style.fontWeight === weight && x.style.fontStyle === style);
              if (fontFace) {
                return (
                  <div className={fontFace.className} style={{ ...fontFace.style, paddingRight: 48 }}>
                    {fontFace.name}
                  </div>
                );
              } else {
                return (
                  <div
                    className={css`
                      font-style: normal;
                      font-weight: 400;
                      font-size: 14px;
                      opacity: 0.5;
                    `}
                  >
                    –
                  </div>
                );
              }
            })}
          </>
        ))}
      </div>
    </Root>
  );
}

export default React.forwardRef(FontFamilyMatrix);
