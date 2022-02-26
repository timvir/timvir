import * as React from "react";
import { cx, css } from "@linaria/core";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  variant?: "info" | "warning" | "alert";
}

function Message(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { variant, className, children, ...rest } = props;

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

          display: flex;
          align-items: flex-start;
        `,
        variant !== undefined && variantStyles[variant]
      )}
      {...rest}
    >
      {variant && (
        <div className={icon}>
          {
            {
              info: <Icons.ChevronsRight size={"1.5em"} />,
              warning: <Icons.AlertCircle size={"1.5em"} />,
              alert: <Icons.XOctagon size={"1.5em"} />,
            }[variant]
          }
        </div>
      )}
      <div
        className={css`
          & > *:first-child {
            margin-top: 0;
          }
          & > *:last-child {
            margin-bottom: 0;
          }

          & > h3:before {
            display: none;
          }
        `}
      >
        {children}
      </div>
    </Root>
  );
}

export default React.forwardRef(Message);

const icon = css`
  position: relative;
  top: 3px;
  margin: -2px 12px 0 -4px;

  & > svg {
    display: block;
  }
`;

const variantStyles = {
  info: css`
    background: #f0f2fc;

    .${icon} {
      color: #2a47d5;
    }
  `,
  warning: css`
    background: #fcf9f0;

    .${icon} {
      color: #a68521;
    }
  `,
  alert: css`
    background: #fcf0f0;

    .${icon} {
      color: #da4444;
    }
  `,
} as const;
