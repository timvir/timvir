import * as React from "react";
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
   * The (color) value of the swatch. Any CSS color definition is accepted.
   *
   * @example "#FFFFFF"
   */
  value: string;

  contrastValue?: string;

  name?: string;
}

function Swatch({ value, contrastValue, name, ...props }: Props, ref: any /* FIXME */) {
  const [label, setLabel] = React.useState(name);

  return (
    <Component
      ref={ref}
      {...props}
      className={css`
        position: relative;
        height: 36px;
        width: 100%;

        & > div {
          border-radius: 2px;
        }

        &:hover > div {
          top: -4px;
          right: -4px;
          bottom: -4px;
          left: -4px;
          box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.1),
            0 8px 24px rgba(16, 22, 26, 0.2);
        }

        &:active > div {
          top: -2px;
          right: -2px;
          bottom: -2px;
          left: -2px;
          box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 1px 1px rgba(16, 22, 26, 0.2);
        }
      `}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setLabel("Copied to clipboard");
      }}
      onMouseLeave={() => {
        setLabel(name);
      }}
    >
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transition: all 0.16s;
          padding: 0px 12px;
          cursor: pointer;
        `}
        style={{ background: value, color: contrastValue }}
      >
        <div>{label}</div>
        {label === name && <div>{value}</div>}
      </div>
    </Component>
  );
}

export default React.forwardRef(Swatch);
