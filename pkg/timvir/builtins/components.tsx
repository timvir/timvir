/*
 * TIMVIR-18
 *
 * All the !important overrides on margins are needed because of
 * CSS descendant selectors in Page. These override can be removed
 * once we fully migrate to StyleX.
 */

import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import * as Icons from "react-feather";

const anchorize = (children?: React.ReactNode): undefined | string => {
  if (typeof children === "string") {
    return children
      .toLowerCase()
      .replace(/[ _]+/g, "-")
      .replace(/[!:^*./\\]/g, "");
  } else {
    return undefined;
  }
};

const headingStyles = stylex.create({
  a: {
    color: "inherit",
    textDecoration: "none",

    ":hover": {
      "--link-icon-opacity": 1,
      "--link-icon-transform": "none",
      "--link-icon-visibility": "visible",
      "--link-icon-visibility-delay": "0s",
    },
  },
  linkIcon: {
    display: "inline-block",
    marginLeft: "6px",
    color: "var(--timvir-secondary-text-color)",
    height: "0.9rem",
    width: "0.9rem",
    verticalAlign: "middle",
    transition: "opacity 0.2s, transform 0.2s, visibility 0s var(--link-icon-visibility-delay, 0.2s)",
    opacity: "var(--link-icon-opacity, 0)",
    visibility: "var(--link-icon-visibility, hidden)",
    transform: "var(--link-icon-transform, translateX(-50%))",
  },
});

function Heading(Component: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>>) {
  return function Heading(props: React.HTMLAttributes<HTMLHeadingElement>) {
    const { children, ...rest } = props;

    const id = anchorize(children);

    return (
      <Component {...rest} id={id}>
        <a {...stylex.props(headingStyles.a)} href={id && `#${id}`}>
          {children}
          <Icons.Link {...stylex.props(headingStyles.linkIcon)} />
        </a>
      </Component>
    );
  };
}

export const h1: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h1 {...stylex.props(styles.h1)} {...props} />
);

export const h2: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = Heading((props) => (
  <h2 {...stylex.props(styles.h2)} {...props} />
));

export const h3: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = Heading((props) => (
  <h3 {...stylex.props(styles.h3)} {...props} />
));

export const h4: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = Heading((props) => (
  <h4 {...stylex.props(styles.h4)} {...props} />
));

export const blockquote: React.FunctionComponent<React.BlockquoteHTMLAttributes<HTMLQuoteElement>> = (props) => {
  const { children, ...rest } = props;

  return (
    <blockquote {...rest} {...stylex.props(styles.blockquote)}>
      {React.Children.toArray(children)
        .filter((x) => x !== "\n")
        .map((child, index, self) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          const style: React.CSSProperties = {
            marginTop: index === 0 ? "0 !important" : undefined,
            marginBottom: index === self.length - 1 ? "0 !important" : undefined,
          };

          return React.cloneElement<any>(child, { style });
        })}
    </blockquote>
  );
};

export const hr: React.FunctionComponent<React.HTMLAttributes<HTMLHRElement>> = (props) => (
  <hr {...stylex.props(styles.hr)} {...props} />
);

export const table: React.FunctionComponent<React.TableHTMLAttributes<HTMLTableElement>> = (props) => (
  <table {...stylex.props(styles.table)} {...props} />
);

export const thead: React.FunctionComponent<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <thead {...props} />
);

export const tbody: React.FunctionComponent<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <tbody {...props} />
);

export const tr: React.FunctionComponent<React.HTMLAttributes<HTMLTableRowElement>> = (props) => (
  <tr {...stylex.props(styles.tr)} {...props} />
);

export const th: React.FunctionComponent<React.ThHTMLAttributes<HTMLTableCellElement>> = (props) => {
  const { align, ...rest } = props;

  const style: React.CSSProperties = {
    textAlign: (align || "center") as any,
  };

  return <th {...stylex.props(styles.tableCell)} style={style} {...rest} />;
};

export const td: React.FunctionComponent<React.TdHTMLAttributes<HTMLTableCellElement>> = (props) => {
  const { align, ...rest } = props;

  const style: React.CSSProperties = {
    textAlign: (align || "left") as any,
  };

  return <td {...stylex.props(styles.tableCell)} style={style} {...rest} />;
};

export const code: React.FunctionComponent<React.HTMLAttributes<HTMLElement>> = (props) => (
  <code {...stylex.props(styles.code)} {...props} />
);

export const a: React.FunctionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => (
  <a {...stylex.props(styles.a)} {...props} />
);

export const p: React.FunctionComponent<React.HTMLAttributes<HTMLParagraphElement>> = (props) => <p {...props} />;

export const ul: React.FunctionComponent<React.HTMLAttributes<HTMLUListElement>> = (props) => <ul {...props} />;

export const ol: React.FunctionComponent<React.HTMLAttributes<HTMLOListElement>> = (props) => <ol {...props} />;

const styles = stylex.create({
  h1: {
    marginTop: "3rem !important",
    marginBottom: "1rem !important",
    fontSize: "2rem",
    lineHeight: 1.125,
    fontWeight: 590,
    textIndent: "-0.05em",
  },
  h2: {
    position: "relative",
    margin: "2.5rem 0 1rem !important",
    fontSize: "1.5rem",
    lineHeight: 1.1666,
    fontWeight: 590,
  },
  h3: {
    position: "relative",
    margin: "1rem 0 1rem !important",
    fontSize: "1.0625rem",
    lineHeight: 1.4705882353,
    fontWeight: 590,
  },
  h4: {
    position: "relative",
    margin: "1rem 0 1rem !important",
    fontSize: "0.9375rem",
    lineHeight: 1.4375,
    fontWeight: 590,
  },
  hr: {
    display: "block",
    borderStyle: "none",
    height: "1px",
    width: "100%",
    backgroundColor: "currentColor",
    opacity: 0.25,
  },
  table: {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%",
    overflow: "auto",
  },
  tr: {
    backgroundColor: "#fff",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "var(--c-p-2)",

    ":nth-child(2n)": {
      backgroundColor: "var(--c-p-0)",
    },
  },
  blockquote: {
    marginLeft: "0 !important",

    fontSize: "1.1rem",
  },
  tableCell: {
    padding: "6px 13px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--c-p-2)",
  },
  code: {
    borderRadius: "5px",
    padding: "4px 6px 3px",
    fontSize: "0.8em",
    backgroundColor: "var(--code-background, var(--timvir-secondary-background-color))",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--timvir-border-color)",
    boxShadow: "var(--code-box-shadow, none)",
  },
  a: {
    color: "currentColor",
    textDecoration: "none",
    backgroundImage: "linear-gradient(transparent, transparent 5px, #383838 5px, #383838)",
    backgroundPosition: "bottom",
    backgroundSize: "100% 6px",
    backgroundRepeat: "repeat-x",

    ":hover": {
      backgroundImage: "linear-gradient(transparent, transparent 3px, #2bbc8a 3px, #2bbc8a)",
      "--code-box-shadow": "inset 0 0 0 1px rgba(16, 22, 26, 0.5), inset 0 1px 4px rgba(16, 22, 26, 0.2)",
    },

    ":active": {
      backgroundImage: "linear-gradient(transparent, transparent 3px, #2bbc8a 3px, #2bbc8a)",
      "--code-box-shadow": "inset 0 0 0 1px rgba(16, 22, 26, 0.7), inset 0 1px 4px rgba(16, 22, 26, 0.4)",
      "--code-background": "var(--c-p-2)",
    },
  },
});
