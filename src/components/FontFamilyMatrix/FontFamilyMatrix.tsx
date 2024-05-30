import { css } from "@linaria/core";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  fontFaces: Array<{ name: string; style: React.CSSProperties; className?: string }>;
}

function FontFamilyMatrix(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { fontFaces, className, ...rest } = props

  const sortedWeights = Array.from(new Set(fontFaces.map((fontFace) => fontFace.style.fontWeight))).sort();
  const styles = ["normal", "italic"];

  return (
    <Root ref={ref} className={className} {...rest}>
      <div
        className={css`
          margin: 0 -24px;
          padding: 16px 24px;
          font-size: 2rem;
          line-height: 1;
          display: grid;
          grid-row-gap: 16px;
          grid-template-columns: min-content min-content 1fr;
          align-items: baseline;
        `}
      >
        {sortedWeights.map((weight, i) => (
          <React.Fragment key={i}>
            <div
              className={css`
                font-size: 0.875rem;
                line-height: 1.5;
                color: var(--timvir-secondary-text-color);
                padding-right: 24px;
              `}
            >
              {weight}
            </div>
            {styles.map((style, i) => {
              const fontFace = fontFaces.find((x) => x.style.fontWeight === weight && x.style.fontStyle === style);
              if (fontFace) {
                return (
                  <div key={i} className={fontFace.className} style={{ ...fontFace.style, paddingRight: 48 }}>
                    {fontFace.name}
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    className={css`
                      font-size: 0.875rem;
                      line-height: 1.5;
                      opacity: 0.5;
                    `}
                  >
                    –
                  </div>
                );
              }
            })}
          </React.Fragment>
        ))}
      </div>
    </Root>
  );
}

export default React.forwardRef(FontFamilyMatrix);
