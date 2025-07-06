import stylex from "@stylexjs/stylex";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "footer";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  links?: Array<{
    group: React.ReactNode;
    items: Array<{ label: string; href: string }>;
  }>;
}

function Footer(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { links, ...rest } = props;

  return (
    <Root ref={ref} {...rest} {...stylex.props(styles.root)}>
      {links && (
        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.center, styles.linkGroups)}>
            {links.map(({ group, items }, i) => (
              <div key={i}>
                <div {...stylex.props(styles.linkGroupTitle)}>{group}</div>
                <div>
                  {items.map(({ label, href }, j) => (
                    <a key={j} href={href} {...stylex.props(styles.link)}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div {...stylex.props(styles.grid, styles.meta)}>
        <div {...stylex.props(styles.center)}>
          Built with{" "}
          <a href="https://timvir.vercel.app" {...stylex.props(styles.metaLink)}>
            Timvir
          </a>
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Footer);

const styles = stylex.create({
  root: {
    padding: "50px 0 30px",
    display: "grid",
    gap: 50,
    borderTop: "1px solid var(--timvir-border-color)",
  },

  grid: {
    display: "grid",
    "--timvir-page-margin": "16px",
    "--timvir-margin": "var(--timvir-page-margin)",
    gridAutoRows: "min-content",
    gridTemplateColumns: "[le] var(--timvir-page-margin) [lex lc] 1fr [rc rex] var(--timvir-page-margin) [re]",

    "@media (min-width: 48rem)": {
      "--timvir-page-margin": "24px",
      gridTemplateColumns:
        "[le] var(--timvir-page-margin) [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] var(--timvir-page-margin) [re]",
    },

    "@media (min-width: 72rem)": {
      gridTemplateColumns:
        "[le] 1fr var(--timvir-page-margin) [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] var(--timvir-page-margin) 1fr [re]",
    },
  },

  center: {
    gridColumn: "lc / rc",
    minWidth: 0,
  },

  linkGroups: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(234px, 1fr))",
    gap: 32,
  },

  linkGroupTitle: {
    fontWeight: 600,
    marginBottom: 12,
  },

  link: {
    display: "block",
    color: "inherit",
    textDecoration: "none",
    ":hover": {
      color: "var(--c-p-4)",
    },
  },

  meta: {
    color: "var(--timvir-secondary-text-color)",
  },

  metaLink: {
    color: "inherit",
    textDecoration: "none",
    backgroundImage: "linear-gradient(transparent, transparent 5px, #383838 5px, #383838)",
    backgroundPosition: "bottom",
    backgroundSize: "100% 6px",
    backgroundRepeat: "repeat-x",

    ":hover": {
      backgroundImage: "linear-gradient(transparent, transparent 3px, #2bbc8a 3px, #2bbc8a)",
    },
  },
});
