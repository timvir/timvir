"use client";

import { cx } from "../../internal/cx";
import * as stylex from "@stylexjs/stylex";
import { useBlock } from "timvir/core";
import { layoutStyles } from "../../core/layout";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  caption?: React.ReactNode;

  /**
   * How much the component should extend out of its original box. When number,
   * it's the number of pixels. When a string, must evaluate to a CSS <length>
   * (can be inline or reference to a CSS variable).
   */
  bleed?: string | number;

  BackdropProps?: React.ComponentPropsWithoutRef<"div">;
}

function Exhibit(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const block = useBlock(props);

  const { caption, bleed, BackdropProps, children, className, style, ...rest } = block.props;

  const rootStyleProps = stylex.props(layoutStyles.block, styles.root);
  const containerStyleProps = stylex.props(styles.container, bleed === 0 && styles.bleedZero);

  return (
    <Root
      ref={ref}
      data-timvir-b-exhibit
      {...rest}
      {...rootStyleProps}
      className={cx(className, rootStyleProps.className)}
      style={{
        ...rootStyleProps.style,
        ...style,

        [cssVariables.bleed]: typeof bleed === "number" ? `${bleed}px` : "calc(var(--timvir-margin, 0px) * 0.6666)",
        [cssVariables.borderColor]: "var(--timvir-border-color)",
        [cssVariables.background]: "var(--timvir-background-pattern)",
      }}
    >
      <div
        data-timvir-b-exhibit-container
        {...BackdropProps}
        {...containerStyleProps}
        className={cx(containerStyleProps.className, BackdropProps?.className)}
        style={{
          ...containerStyleProps.style,
          border: bleed === 0 ? "none" : `1px solid var(${cssVariables.borderColor})`,
          ...BackdropProps?.style,
        }}
      >
        {children}
      </div>

      {caption && (
        <div data-timvir-b-exhibit-caption {...stylex.props(styles.caption)}>
          {caption}
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(Exhibit);

const cssVariables = {
  bleed: "--timvir-b-Exhibit-bleed",
  borderColor: "--timvir-b-Exhibit-borderColor",
  background: "--timvir-b-Exhibit-background",
};

const styles = stylex.create({
  root: {},
  container: {
    display: "flow-root",
    backgroundImage: `var(${cssVariables.background})`,
    marginInline: `calc(-1 * var(${cssVariables.bleed}))`,
    padding: `var(${cssVariables.bleed})`,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: `var(${cssVariables.borderColor})`,
  },
  bleedZero: {
    borderStyle: "none",
    marginInline: 0,
    padding: 0,
  },
  caption: {
    fontSize: "0.8125rem",
    lineHeight: 1.1875,
    color: "var(--timvir-secondary-text-color)",
    marginTop: "0.3em",
  },
});
