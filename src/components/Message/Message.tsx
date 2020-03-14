import React from "react";
import { cx, css } from "linaria";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Message({ className, children, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          background: var(--c-p-0);
          border-radius: 3px;
          padding: 16px 24px 16px 24px;
          box-shadow: inset 0 0 0 1px var(--c-p-2);
        `
      )}
      {...props}
    >
      {children}
    </Root>
  );
}

export default React.forwardRef(Message);
