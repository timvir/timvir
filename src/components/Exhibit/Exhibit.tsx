import * as React from "react";
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
}

function Exhibit({ title, source, caption, children, style, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Component
      ref={ref}
      style={{
        ...style,
        margin: "24px 0 36px"
      }}
      {...props}
    >
      {title && mdx("h3", {}, title)}
      <div
        style={{
          margin: "0 -24px",
          padding: 24,
          borderRadius: 4,
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
            margin: "0 -24px",
            padding: "16px 24px 16px",
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
