"use client";

import { css, cx } from "@linaria/core";
import { useBlock } from "timvir/core";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  /**
   * The CSS Color value of the swatch. Any CSS color definition is accepted.
   *
   * @example "#FFFFFF"
   */
  value: string;

  /**
   * Color of the text that is rendered on top of the swatch. Should be chosen
   * such that it provides enough contrast. If not provided then the normal text
   * color from the page will be inherited.
   */
  contrastValue?: string;

  /**
   * Name of the swatch.
   */
  name?: string;

  /**
   * Use this as a short reference where or how the color was derived. If it is an
   * primordial color (not derived from any color palette or other algorithm), then
   * leave it empty.
   *
   * @example "Blue 500"
   */
  ancestry?: string;
}

function Swatch(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const block = useBlock(props);

  const { value, contrastValue, name, ancestry, onClick, onMouseLeave, className, ...rest } = block.props;

  const [label, setLabel] = React.useState(name);
  React.useEffect(() => {
    setLabel(name);
  }, [name]);

  return (
    <Root
      role="button"
      ref={ref}
      {...rest}
      style={{ height: ancestry ? 48 : 36 }}
      className={cx(className, classes.root)}
      onClick={(ev) => {
        navigator.clipboard.writeText(value);
        setLabel("Copied to clipboard");
        onClick?.(ev);
      }}
      onMouseLeave={(ev) => {
        setLabel(name);
        onMouseLeave?.(ev);
      }}
    >
      <div className={classes.inner} style={{ background: value, color: contrastValue }}>
        <div className={classes.labelWrapper}>
          {label && <div>{label}</div>}
          {label === name && <div>{value}</div>}
        </div>
        {ancestry && <div className={classes.ancestry}>{ancestry}</div>}
      </div>
    </Root>
  );
}

export default React.forwardRef(Swatch);

const classes = {
  root: css`
    position: relative;
  `,

  inner: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.16s;
    padding: 0px 12px;
    cursor: pointer;
    border-radius: 2px;
  `,

  labelWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
  `,

  ancestry: css`
    padding-top: 6px;
    opacity: 0.5;
    font-size: 0.8em;
    line-height: 1;
  `,
};
