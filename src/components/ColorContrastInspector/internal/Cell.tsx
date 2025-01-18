import { css, cx } from "@linaria/core";
import * as React from "react";
import { opacity } from "./utils";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  background: string;
  foreground: string;
  isWhitelisted: boolean;
}

const classes = {
  icon: css`
    transition: all 0.2s;
    opacity: 1;
  `,
  opacity: css`
    transition: all 0.2s;
    opacity: 0;
  `,
};

function Cell(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { background, foreground, isWhitelisted, className, style, ...rest } = props;

  const large = opacity(3, background, foreground);
  const normal = opacity(4.5, background, foreground);

  const content = (() => {
    const fmt = (n: undefined | number) => (n === undefined ? "" : `${Math.round(n * 100)}%`);

    if (large === undefined && normal === undefined) {
      return isWhitelisted ? (
        <Icons.X className={classes.icon} size={"1.5em"} style={{ gridRow: 1, gridColumn: "2" }} />
      ) : null;
    } else {
      return (
        <>
          {normal === undefined ? (
            <Icons.AlertTriangle className={classes.icon} size={"1.5em"} style={{ gridRow: 1, gridColumn: "2" }} />
          ) : (
            <Icons.Check className={classes.icon} size={"1.5em"} style={{ gridRow: 1, gridColumn: "2" }} />
          )}

          <span className={classes.opacity} style={{ gridRow: 1, gridColumn: "1", textAlign: "end" }}>
            {fmt(large)}
          </span>
          <span className={classes.opacity} style={{ gridRow: 1, gridColumn: "3" }}>
            {fmt(normal)}
          </span>
        </>
      );
    }
  })();

  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          display: grid;
          grid-template-columns: 1fr min-content 1fr;
          grid-gap: 8px;
          align-self: stretch;
          align-items: center;
          justify-content: center;

          font-weight: 500;

          &:hover ${classes.icon} {
            opacity: 1;
          }
          &:hover ${classes.opacity} {
            opacity: 1;
          }
        `
      )}
      style={{ color: foreground, ...style }}
      {...rest}
    >
      {content}
    </Root>
  );
}

export default React.forwardRef(Cell);
