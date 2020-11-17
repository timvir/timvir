import React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "picture";

interface Props extends React.ComponentProps<typeof Root> {
  metadata: { width: number; height: number };
  img: { src: string };
  sources: Array<{ srcSet: string; type: string }>;
}

function Image({ metadata, img, sources, ...props }: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  return (
    <Root ref={ref} {...props}>
      {sources.map((p, i) => (
        <source key={i} {...p} />
      ))}
      <img {...metadata} {...img} style={{ maxWidth: "100%", height: "auto" }} />
    </Root>
  );
}

export default React.forwardRef(Image);
