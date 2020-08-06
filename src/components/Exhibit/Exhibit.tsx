import React from "react";
import { mdx } from "@mdx-js/react";
import { css, cx } from "linaria";

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
}

function Exhibit({ title, source, caption, bleed = 0, children, className, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          margin: 0;
        `
      )}
      {...props}
    >
      {title && mdx("h3", {}, title)}
      <div
        className={css`
          display: flow-root;
          border-radus: inherit;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=);
        `}
        style={{
          margin: `0 -${bleed}px`,
          padding: bleed,
          border: bleed !== 0 ? `1px solid #EFEFEF` : "none",
        }}
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
          style={{
            fontSize: "0.75rem",
            color: "#999",
            marginTop: 6,
          }}
        >
          {caption}
        </figcaption>
      )}
    </Root>
  );
}

export default React.forwardRef(Exhibit);
