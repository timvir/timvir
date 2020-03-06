import React from "react";
import { mdx } from "@mdx-js/react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "figure";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentProps<typeof Component> {
  source?: React.ReactNode;
  caption?: React.ReactNode;

  /**
   * How much the component should extend out of its original box.
   *
   * @default 0
   */
  bleed?: number;
}

function Exhibit({ title, source, caption, bleed = 0, children, style, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Component
      ref={ref}
      style={{
        margin: 0,
        ...style
      }}
      {...props}
    >
      {title && mdx("h3", {}, title)}
      <div
        style={{
          margin: `0 -${bleed}px`,
          padding: bleed,
          border: bleed !== 0 && `1px solid #EFEFEF`,
          background:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=)"
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
            borderRadius: "0 0 4px 4px"
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
            marginTop: 6
          }}
        >
          {caption}
        </figcaption>
      )}
    </Component>
  );
}

export default React.forwardRef(Exhibit);
