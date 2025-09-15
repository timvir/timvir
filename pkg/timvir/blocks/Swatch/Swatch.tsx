"use client";

import { cx } from "../../internal/cx";
import * as stylex from "@stylexjs/stylex";
import { layoutStyles, useBlock } from "timvir/core";
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

  const { value, contrastValue, name, ancestry, onClick, onMouseLeave, className, style, ...rest } = block.props;

  const [label, setLabel] = React.useState(name);
  React.useEffect(() => {
    setLabel(name);
  }, [name]);

  const rootStyleProps = stylex.props(layoutStyles.block, styles.root);
  const innerStyleProps = stylex.props(styles.inner);

  return (
    <Root
      role="button"
      ref={ref}
      {...rest}
      {...rootStyleProps}
      className={cx(rootStyleProps.className, className)}
      style={{ ...style, ...rootStyleProps.style, height: ancestry ? 48 : 36 }}
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
      <div {...innerStyleProps} style={{ ...innerStyleProps.style, background: value, color: contrastValue }}>
        <div {...stylex.props(styles.labelWrapper)}>
          {label && <div>{label}</div>}
          {label === name && <div>{value}</div>}
        </div>
        {ancestry && <div {...stylex.props(styles.ancestry)}>{ancestry}</div>}
      </div>
    </Root>
  );
}

export default React.forwardRef(Swatch);

const styles = stylex.create({
  root: {
    position: "relative",
  },

  inner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: "all 0.16s",
    padding: "0px 12px",
    cursor: "pointer",
    borderRadius: 2,
  },

  labelWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: 1,
  },

  ancestry: {
    paddingTop: 6,
    opacity: 0.5,
    fontSize: "0.8em",
    lineHeight: 1,
  },
});
