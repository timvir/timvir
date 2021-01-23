import { cx } from "@linaria/core";
import * as React from "react";
import { fullWidth } from "@timvir/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  metadata: { width: number; height: number };
  img: { src: string };
  sources: Array<{ srcSet: string; type: string }>;
}

function Cover({ metadata, img, sources, className, ...props }: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  return (
    <Root ref={ref} className={cx(className, fullWidth)} {...props}>
      <picture>
        {sources.map((p, i) => (
          <source key={i} {...p} />
        ))}
        <img {...metadata} {...img} style={{ maxWidth: "100%", height: "35vh", objectFit: "cover" }} />
      </picture>
    </Root>
  );
}

export default React.forwardRef(Cover);
