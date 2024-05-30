import { css, cx } from "@linaria/core";
import { useMDXComponents } from "@mdx-js/react";
import { useBlock } from "timvir/core";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentProps<typeof Root> {
  caption?: React.ReactNode;

  /**
   * How much the component should extend out of its original box. When number,
   * it's the number of pixels. When a string, must evaluate to a CSS <length>
   * (can be inline or reference to a CSS variable).
   *
   * @default 0
   */
  bleed?: string | number;

  BackdropProps?: React.ComponentPropsWithoutRef<"div">;
}

function Exhibit(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const block = useBlock(props)
  const components = { h3: "h3", ...useMDXComponents() };

  const { title, caption, bleed = 0, BackdropProps, children, className, style, ...rest } = block.props;

  return (
    <>
      {title && <components.h3>{title}</components.h3>}

      <Root
        ref={ref}
        className={cx(className, classes.root)}
        style={{
          ...style,
          [cssVariables.bleed]: typeof bleed === "number" ? `${bleed}px` : bleed,
        }}
        {...rest}
      >
        <div
          className={classes.container}
          style={{ border: bleed !== 0 ? `1px solid var(${cssVariables.borderColor})` : "none" }}
          {...BackdropProps}
        >
          {children}
        </div>

        {caption && <figcaption className={classes.caption}>{caption}</figcaption>}
      </Root>
    </>
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
    margin: 0 0 1.5rem;

    ${cssVariables.bleed}: 0px;

    ${cssVariables.borderColor}: var(--timvir-border-color);
    ${cssVariables.background}: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=);

    :global(:root[data-timvir-theme="dark"]) & {
      ${cssVariables.background}: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAFklEQVQI12NQBQF2EGAghQkmwXxSmADZJQiZ2ZZ46gAAAABJRU5ErkJggg==);
    }
  `,

  container: css`
    display: flow-root;
    background: var(${cssVariables.background});

    margin: 0 calc(-1 * var(${cssVariables.bleed}));
    padding: var(${cssVariables.bleed});
  `,

  caption: css`
    font-size: 0.8125rem;
    line-height: 1.1875;
    color: var(--timvir-secondary-text-color);
    margin-top: 2px;
  `,
};
