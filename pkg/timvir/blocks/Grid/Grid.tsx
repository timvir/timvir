import { css, cx } from "@linaria/core";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {}

function Grid(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { children, className, ...rest } = props;

  return (
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      {children}
    </Root>
  );
}

export default React.forwardRef(Grid);

const classes = {
  root: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--timvir-page-margin, 24px);

    --timvir-margin: calc(var(--timvir-page-margin, 24px) * 0.5);
  `,
};
