import React from "react";
import { cx, css } from "linaria";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  variant?: "info" | "warning" | "alert";
}

function Message({ variant, className, children, ...props }: Props, ref: any /* FIXME */) {
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
          box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2);

          & > *:first-child {
            margin-top: 0;
          }
          & > *:last-child {
            margin-bottom: 0;
          }

          & > h3:before {
            display: none;
          }
        `,
        variantStyles[variant]
      )}
      {...props}
    >
      {children}
    </Root>
  );
}

export default React.forwardRef(Message);

const variantStyles = {
  info: css`
    background: #f0f2fc;
  `,
  warning: css`
    background: #fcf9f0;
  `,
  alert: css`
    background: #fcf0f0;
  `
} as const;
