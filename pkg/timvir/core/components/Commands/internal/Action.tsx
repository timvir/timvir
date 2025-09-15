import { cx } from "../../../../internal/cx";
import * as stylex from "@stylexjs/stylex";
import * as React from "react";

const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  label?: React.ReactNode;
}

function Action(props: Props) {
  const { label, ...rest } = props;

  const rootStyleProps = stylex.props(styles.root);

  return (
    <Root
      {...rest}
      {...rootStyleProps}
      className={cx(rest.className, rootStyleProps.className)}
      style={{ ...rootStyleProps.style, ...rest.style }}
    >
      <div {...stylex.props(styles.icon)}>
        <svg
          {...stylex.props(styles.svg)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
      <div {...stylex.props(styles.label)}>{label}</div>
    </Root>
  );
}

export default Action;

const styles = stylex.create({
  root: {
    backgroundColor: "transparent",
    color: "rgb(214, 214, 214)",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    transition: "color 0.1s",
    height: 46,
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    overflow: "hidden",
    paddingInline: 14,
    borderLeft: "none",
    cursor: "default",

    ":hover": {
      backgroundColor: "rgb(55, 55, 60)",
    },
  },

  icon: {
    marginRight: 12,
    width: 16,
  },

  svg: {
    display: "block",
    width: 16,
    height: 16,
  },

  label: {
    fontSize: "0.8125rem",
    color: "rgb(247, 248, 248)",
  },
});
