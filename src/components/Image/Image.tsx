import React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "picture";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentProps<typeof Component> {
  metadata: { width: number; height: number };
  img: { src: string };
  sources: Array<{ srcSet: string; type: string }>;
}

function Image({ metadata, img, sources, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Component ref={ref} {...props}>
      {sources.map((p, i) => (
        <source key={i} {...p} />
      ))}
      <img {...metadata} {...img} style={{ maxWidth: "100%", height: "auto" }} />
    </Component>
  );
}

export default React.forwardRef(Image);
