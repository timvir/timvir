import { css, cx } from "@linaria/core";
import { useMDXComponents } from "@mdx-js/react";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentProps<typeof Root> {
  source?: React.ReactNode;
  caption?: React.ReactNode;

  /**
   * How much the component should extend out of its original box.
   *
   * @default 0
   */
  bleed?: number;

  BackdropProps?: React.ComponentPropsWithoutRef<"div">;
}

function Exhibit(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const components = useMDXComponents();
  console.log(components);

  const { title, source, caption, bleed = 0, BackdropProps, children, className, ...rest } = props;

  return (
    <>
      {title && components.h3 && <components.h3>{title}</components.h3>}

      <Root ref={ref} className={cx(className, classes.root)} {...rest}>
        <div
          className={css`
            display: flow-root;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=);
          `}
          style={{
            margin: `0 -${bleed}px`,
            padding: bleed,
            border: bleed !== 0 ? `1px solid #EFEFEF` : "none",
          }}
          {...BackdropProps}
        >
          {children}
        </div>

        {source && (
          <pre
            style={{
              background: "#F8F8F8",
              margin: `0 -${bleed}px`,
              padding: `16px ${bleed}px 16px`,
              borderTop: "1px solid grey",
              fontSize: ".9rem",
              borderRadius: "0 0 4px 4px",
            }}
          >
            {source}
          </pre>
        )}

        {caption && (
          <figcaption
            className={css`
              font-size: 0.75rem;
              color: var(--c-text-light);
              margin-top: 2px;
            `}
          >
            {caption}
          </figcaption>
        )}
      </Root>
    </>
  );
}

export default React.forwardRef(Exhibit);

const classes = {
  root: css`
    margin: 0;
  `,
};
