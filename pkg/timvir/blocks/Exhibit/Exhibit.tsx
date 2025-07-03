"use client";

import { cx } from "@linaria/core";
import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import { useBlock } from "timvir/core";

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

  return (
    <Root
      ref={ref}
      {...mergeStyleXProps(styles.root, {
        className: cx("timvir-b-Exhibit", className),
        style: {
          ...style,
          ["--timvir-b-Exhibit-bleed"]: typeof bleed === "number" ? `${bleed}px` : undefined,
        },
      })}
      {...rest}
    >
      <div
        {...BackdropProps}
        {...mergeStyleXProps(styles.container, {
          className: cx("timvir-b-Exhibit-container", BackdropProps?.className),
          style: {
            border: bleed === 0 ? "none" : `1px solid var(--timvir-b-Exhibit-borderColor)`,
            ...BackdropProps?.style,
          },
        })}
      >
        {children}
      </div>

      {caption && (
        <div
          {...mergeStyleXProps(styles.caption, {
            className: "timvir-b-Exhibit-caption",
          })}
        >
          {caption}
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(Exhibit);

function mergeStyleXProps(styles: any, { className, style }: any = {}) {
  const stylexProps = stylex.props(styles);
  return {
    ...stylexProps,
    className: cx(stylexProps.className, className),
    style: { ...stylexProps.style, ...style },
  };
}

const styles = stylex.create({
  root: {
    "--timvir-b-Exhibit-bleed": "calc(var(--timvir-margin, 0px) * 0.6666)",
    "--timvir-b-Exhibit-borderColor": "var(--timvir-border-color)",

    "--timvir-b-Exhibit-background":
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAHElEQVR4AWP4/u07Mvr75y8yGlBpND6a6oGUBgAxMSSkDKa/pQAAAABJRU5ErkJggg==)",

    ":root[data-timvir-theme='dark']": {
      "--timvir-b-Exhibit-background":
        "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAFklEQVQI12NQBQF2EGAghQkmwXxSmADZJQiZ2ZZ46gAAAABJRU5ErkJggg==)",
    },
  },

  container: {
    display: "flow-root",
    background: `var(--timvir-b-Exhibit-background)`,

    margin: `0 calc(-1 * var(--timvir-b-Exhibit-bleed))`,
    padding: `var(--timvir-b-Exhibit-bleed)`,

    borderRadius: "5px",
  },

  caption: {
    fontSize: "0.8125rem",
    lineHeight: 1.1875,
    color: "var(--timvir-secondary-text-color)",
    marginTop: "0.3em",
  },
});
