import { css, cx } from "linaria";
import React from "react";
import { Swatch } from "../Swatch";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  /**
   * Array of CSS Color values.
   */
  values: Array<string | { value: string; contrastValue?: string; name?: string; ancestry?: string }>;
}

function ColorBar(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { values, className, ...rest } = props;

  const [selected, setSelected] = React.useState<undefined | Props["values"][number]>(undefined);

  return (
    <Root
      ref={ref}
      {...rest}
      className={cx(
        className,
        css`
          position: relative;
        `
      )}
    >
      <div
        className={cx(
          css`
            display: grid;
            grid-auto-flow: row;
            grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
            transition: all 0.16s;

            &::before {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              display: block;
              z-index: 2;
              border-radius: 2px;
              box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.15);
              content: "";
              pointer-events: none;
              user-select: none;
              transition: all 0.16s;
            }
            &:hover::before {
              opacity: 0;
            }
          `,
          selected &&
            css`
              opacity: 0;
            `
        )}
      >
        {values.map((value, i) => (
          <div
            key={i}
            className={css`
              height: 40px;
              flex-grow: 1;

              display: grid;
              place-items: stretch;

              &:first-child > div {
                border-radius: 2px 0 0 2px;
              }
              &:last-child > div {
                border-radius: 0 2px 2px 0;
              }

              &:hover {
                z-index: 3;
              }
              &:hover > div {
                border-radius: 2px;
                margin: -3px 1px;
                box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.1),
                  0 8px 24px rgba(16, 22, 26, 0.2);
              }
            `}
          >
            <div
              className={css`
                transition: all 0.16s;
                cursor: pointer;
              `}
              style={{ background: typeof value === "string" ? value : value.value }}
              onClick={() => {
                setSelected(value);
              }}
            />
          </div>
        ))}
      </div>

      <div
        className={cx(
          css`
            position: absolute;
            top: 50%;
            right: 0px;
            left: 0px;
            transform: translateY(-50%);
            pointer-events: none;
            opacity: 0;
            z-index: 4;
            transition: opacity 0.16s;
          `,
          selected &&
            css`
              pointer-events: all;
              opacity: 1;
            `
        )}
      >
        <Swatch
          {...(typeof selected === "string" ? { value: selected } : selected)}
          onMouseLeave={() => {
            setSelected(undefined);
          }}
        />
      </div>
    </Root>
  );
}

export default React.forwardRef(ColorBar);
