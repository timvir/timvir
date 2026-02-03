import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import type { Node } from "../types";
import Section from "./Section";
import * as Icons from "../../../../icons";
import { useContext } from "timvir/context";

interface Props extends Omit<React.ComponentPropsWithoutRef<"nav">, "className" | "style"> {
  sx: stylex.StyleXStyles;

  toc: readonly Node[];

  search?: {
    open: () => void;
    label?: React.ReactNode;
    Component: React.ComponentType<{
      open: boolean;
      onClose: (ev: React.SyntheticEvent<HTMLElement>) => void;
    }>;
  };
}

function Sidebar(props: Props) {
  const { location } = useContext();

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const scrollLockClassList = stylex.props(styles.scrollLock).className!.split(" ");
    for (const className of scrollLockClassList) {
      document.body.classList.toggle(className, isMenuOpen);
    }

    return () => {
      for (const className of scrollLockClassList) {
        document.body.classList.remove(className);
      }
    };
  }, [isMenuOpen]);

  const { toc, search, ...rest } = props;

  const node = (function find(nodes: readonly Node[]): undefined | Node {
    for (const node of nodes) {
      if (location.asPath.replace(/#.*$/, "") === node.path) {
        return node;
      }

      if (node.children) {
        const n = find(node.children);
        if (n) {
          return n;
        }
      }
    }
  })(toc);

  return (
    <nav {...rest} {...stylex.props(props.sx, styles.root)}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerInner)}>
          <div {...stylex.props(styles.headerTitle)}>Timvir</div>
          <div {...stylex.props(styles.separator)} />
          <div>Docs</div>
        </div>

        {search && (
          <div {...stylex.props(styles.searchContainer)}>
            <Search {...search} />
          </div>
        )}
      </header>

      <div role="button" onClick={() => setMenuOpen(!isMenuOpen)} {...stylex.props(styles.menuLabel)}>
        {node?.icon
          ? React.cloneElement(node.icon, {
              ...stylex.props(styles.menuIcon),
            })
          : null}
        <span>{node?.label ?? "Menu"}</span>

        <Icons.Menu width={16} height={16} {...stylex.props(styles.menuCaret)} />
      </div>

      <div {...stylex.props(styles.content, isMenuOpen && styles.menuOpen)}>
        <div {...stylex.props(styles.sections)}>
          <div
            {...stylex.props(styles.nav)}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            {toc.map((c, i) => (
              <Section key={i} depth={0} {...c} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;

const styles = stylex.create({
  scrollLock: {
    overflowY: "scroll",
    position: "fixed",
    top: "0px",
    width: "100%",
  },

  root: {
    display: "flex",
    flexDirection: "column",

    "@media (min-width: 48rem)": {
      height: "100%",
    },
  },

  header: {
    padding: "0 var(--timvir-page-margin)",
    height: "3rem",
    display: "flex",
    alignItems: "center",

    "@media (min-width: 48rem)": {
      paddingTop: "24px",
      display: "block",
      height: "auto",
    },
  },

  headerInner: {
    fontSize: "0.875rem",
    lineHeight: 1.3125,
    display: "flex",
    gap: "16px",
  },

  headerTitle: {
    fontWeight: 590,
  },

  separator: {
    backgroundColor: "var(--timvir-border-color)",
    width: "1px",
    height: "1.25rem",
  },

  searchContainer: {
    flexShrink: 0,
    transition: "all 0.16s",
    marginTop: "16px",
    display: "none",

    "@media (min-width: 48rem)": {
      display: "block",
    },
  },

  menuLabel: {
    borderBottom: "1px solid var(--timvir-border-color)",
    padding: "0 var(--timvir-page-margin)",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",

    "@media (min-width: 48rem)": {
      display: "none",
    },
  },

  menuIcon: {
    display: "block",
    width: "1.3em",
    height: "1.3em",
    marginRight: "8px",
    minWidth: "1.3em",
  },

  menuCaret: {
    marginLeft: "auto",
  },

  content: {
    display: "none",
    backgroundColor: "var(--timvir-background-color)",

    "@media (min-width: 48rem)": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "static",
      overflow: "hidden",
    },
  },

  menuOpen: {
    display: "flex",
    position: "fixed",
    top: "6rem",
    left: 0,
    right: 0,
    bottom: 0,
  },

  sections: {
    padding: "24px 0",
    overflowY: "auto",
    flexGrow: 1,
    overscrollBehavior: "auto",
    scrollPaddingBlock: "24px",
    maskImage:
      "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 12px, #000 24px, #000 calc(100% - 24px), rgba(0, 0, 0, 0.2) calc(100% - 12px), transparent 100%)",
  },

  nav: {
    paddingInline: "calc(var(--timvir-page-margin) - 8px)",

    "@media (min-width: 48rem)": {
      paddingInline: "var(--timvir-page-margin)",
    },
  },

  searchRoot: {
    fontFamily: "system-ui",
  },

  searchButton: {
    color: "var(--timvir-text-color)",
    fontSize: "0.8125rem",
    lineHeight: 2.2,
    fontWeight: 400,
    cursor: "pointer",
    minHeight: "36px",
    borderRadius: "8px",
    padding: "0 12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--timvir-border-color)",
    backgroundColor: "var(--timvir-secondary-background-color)",
    display: "flex",
    alignItems: "center",

    ":hover": {
      backgroundColor: "var(--timvir-sidebar-highlight-color)",
    },
  },

  searchButtonIcon: {
    display: "block",
    marginRight: "8px",
    width: "0.75rem",
    height: "0.75rem",
  },
});

function Search(props: NonNullable<Props["search"]>) {
  const { open, label } = props;

  return (
    <div {...stylex.props(styles.searchRoot)}>
      <div role="button" {...stylex.props(styles.searchButton)} onClick={open}>
        <svg x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" {...stylex.props(styles.searchButtonIcon)}>
          <path
            d="M11.707 10.293l-2.54-2.54a5.015 5.015 0 10-1.414 1.414l2.54 2.54a1 1 0 001.414-1.414zM2 5a3 3 0 113 3 3 3 0 01-3-3z"
            fill="currentColor"
          />
        </svg>
        {label || "Search docs"}
      </div>
    </div>
  );
}
