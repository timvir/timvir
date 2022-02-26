import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "picture";

interface Props extends React.ComponentProps<typeof Root> {
  metadata: { width: number; height: number };
  img: { src: string };
  sources: Array<{ srcSet: string; type: string }>;
}

function Image(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { metadata, img, sources, ...rest } = props

  return (
    <Root ref={ref} {...rest}>
      {sources.map((p, i) => (
        <source key={i} {...p} />
      ))}
      <img {...metadata} {...img} style={{ maxWidth: "100%", height: "auto" }} />
    </Root>
  );
}

export default React.forwardRef(Image);
