import React from "react";
import { css } from "linaria";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "div";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentPropsWithoutRef<typeof Component> {
  /**
   * Array of CSS Color values.
   */
  values: Array<string>;
}

function ColorBar({ values, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Component
      ref={ref}
      {...props}
      className={css`
        position: relative;
        display: flex;

        &::before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: block;
          z-index: 2;
          border-radius: 3px;
          box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.15);
          content: "";
          pointer-events: none;
          user-select: none;
        }
      `}
    >
      {values.map(value => (
        <div
          className={css`
            height: 40px;
            flex-grow: 1;

            &:first-child {
              border-radius: 3px 0 0 3px;
            }
            &:last-child {
              border-radius: 0 3px 3px 0;
            }
          `}
          style={{ background: value }}
        />
      ))}
    </Component>
  );
}

export default React.forwardRef(ColorBar);
