import { css, cx } from "@linaria/core";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  elevation?: 0 | 1 | 2 | 3 | 4;
  interactive?: boolean;
}

function Card(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { elevation, interactive, className, ...rest } = props;

  return (
    <Root
      ref={ref}
      className={cx(
        className,
        elevation !== undefined && elevationStyles[`e${elevation}`],
        interactive && interactiveStyle,
        css`
          border-radius: 3px;
          background: #fff;
          transition: transform 0.2s cubic-bezier(0.4, 1, 0.75, 0.9), box-shadow 0.2s cubic-bezier(0.4, 1, 0.75, 0.9);
          box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
        `
      )}
      {...rest}
    />
  );
}

export default React.forwardRef(Card);

const elevationStyles = {
  e0: css`
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  `,
  e1: css`
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.2);
  `,
  e2: css`
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2);
  `,
  e3: css`
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
  `,
  e4: css`
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 4px 8px rgba(16, 22, 26, 0.2), 0 18px 46px 6px rgba(16, 22, 26, 0.2);
  `,
} as const;

const interactiveStyle = css`
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
  }

  &:active {
    opacity: 0.9;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.2);
  }
`;
