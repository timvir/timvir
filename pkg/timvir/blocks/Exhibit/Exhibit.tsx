"use client";

import { css, cx } from "@linaria/core";
import { useBlock } from "timvir/core";
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

function Exhibit(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const block = useBlock(props);

  const { caption, bleed, BackdropProps, children, className, style, ...rest } = block.props;

  return (
    <Root
      ref={ref}
      className={cx("timvir-b-Exhibit", className, classes.root)}
      style={{
        ...style,
        [cssVariables.bleed]: typeof bleed === "number" ? `${bleed}px` : undefined,
      }}
      {...rest}
    >
      <div
        className={cx("timvir-b-Exhibit-container", classes.container)}
        {...BackdropProps}
        style={{
          border: bleed === 0 ? "none" : `1px solid var(${cssVariables.borderColor})`,
          ...BackdropProps?.style,
        }}
      >
        {children}
      </div>

      {caption && <div className={cx("timvir-b-Exhibit-caption", classes.caption)}>{caption}</div>}
    </Root>
  );
}

export default React.forwardRef(Exhibit);

const cssVariables = {
  bleed: "--timvir-b-Exhibit-bleed",
  borderColor: "--timvir-b-Exhibit-borderColor",
  background: "--timvir-b-Exhibit-background",
};

const classes = {
  root: css`
    ${cssVariables.bleed}: calc(var(--timvir-margin, 0px) * 0.6666);

    ${cssVariables.borderColor}: var(--timvir-border-color);
    ${cssVariables.background}: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAHElEQVR4AWP4/u07Mvr75y8yGlBpND6a6oGUBgAxMSSkDKa/pQAAAABJRU5ErkJggg==);

    :global(:root[data-timvir-theme="dark"]) & {
      ${cssVariables.background}: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAFklEQVQI12NQBQF2EGAghQkmwXxSmADZJQiZ2ZZ46gAAAABJRU5ErkJggg==);
    }
  `,

  container: css`
    display: flow-root;
    background: var(${cssVariables.background});

    margin: 0 calc(-1 * var(${cssVariables.bleed}));
    padding: var(${cssVariables.bleed});

    border-radius: 5px;
  `,

  caption: css`
    font-size: 0.8125rem;
    line-height: 1.1875;
    color: var(--timvir-secondary-text-color);
    margin-top: 0.3em;
  `,
};
