import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import * as Icons from "react-feather";
import { Value } from "timvir/context";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  Link: Value["Link"];

  prev?: {
    href: string;
    label: React.ReactNode;
    context: React.ReactNode;
  };
  next?: {
    href: string;
    label: React.ReactNode;
    context: React.ReactNode;
  };
}

function NavigationFooter(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { Link, prev, next, ...rest } = props;

  return (
    <Root ref={ref} {...rest} {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.container)}>
        {prev && (
          <Link href={prev.href} {...stylex.props(styles.link, styles.prev)}>
            <div {...stylex.props(styles.context)}>
              <Icons.ChevronLeft {...stylex.props(styles.icon)} /> Previous
            </div>
            <div {...stylex.props(styles.label)}>{prev.label}</div>
          </Link>
        )}
        {next && (
          <Link href={next.href} {...stylex.props(styles.link, styles.next)}>
            <div {...stylex.props(styles.context)}>
              Next <Icons.ChevronRight {...stylex.props(styles.icon)} />
            </div>
            <div {...stylex.props(styles.label)}>{next.label}</div>
          </Link>
        )}
      </div>
    </Root>
  );
}

export default React.forwardRef(NavigationFooter);

const styles = stylex.create({
  root: {
    padding: "50px 0 80px",

    /*
     * This grid layout replicates the layout of the main content area.
     */
    display: "grid",
    gridAutoRows: "min-content",
    gridTemplateColumns: "[le] var(--timvir-page-margin) [lex lc] 1fr [rc rex] var(--timvir-page-margin) [re]",
    "@media (min-width: 48rem)": {
      gridTemplateColumns:
        "[le] var(--timvir-page-margin) [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] var(--timvir-page-margin) [re]",
    },
    "@media (min-width: 72rem)": {
      gridTemplateColumns:
        "[le] 1fr var(--timvir-page-margin) [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] var(--timvir-page-margin) 1fr [re]",
    },
  },
  container: {
    gridColumn: "lc / rc",
    display: "flex",
    flexDirection: "column-reverse",
    gap: "1rem",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    "@media (min-width: 48rem)": {
      flexDirection: "row",
    },
  },
  link: {
    width: "100%",
    display: "flex",
    gap: "4px",
    borderRadius: "8px",
    border: "1px solid var(--timvir-border-color)",
    padding: "16px",
    color: "inherit",
    textDecoration: "none",
    minWidth: 0,
    ":hover": {
      backgroundColor: "var(--timvir-secondary-background-color)",
    },
  },
  prev: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    textAlign: "left",
  },
  next: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    textAlign: "right",
  },
  label: {
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  context: {
    color: "var(--timvir-secondary-text-color)",
    display: "flex",
    alignItems: "center",
    marginInline: "-0.2em",
  },
  icon: {
    height: "1.2em",
    width: "1.2em",
  },
});
