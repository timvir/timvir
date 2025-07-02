import { cx } from "@linaria/core";
import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import { fullWidth } from "timvir/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  metadata: { width: number; height: number };
  img: { src: string };
  sources: Array<{ srcSet: string; type: string }>;
}

function Cover(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { metadata, img, sources, className, ...rest } = props;

  return (
    <Root ref={ref} className={cx(className, fullWidth)} {...rest}>
      <picture>
        {sources.map((p, i) => (
          <source key={i} {...p} />
        ))}
        <img {...metadata} {...img} {...stylex.props(styles.img)} />
      </picture>
    </Root>
  );
}

export default React.forwardRef(Cover);

const styles = stylex.create({
  img: {
    display: "block",
    maxWidth: "100%",
    height: "35vh",
    objectFit: "cover",
  },
});
