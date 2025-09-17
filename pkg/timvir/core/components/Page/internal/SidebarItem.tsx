import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import { useContext } from "timvir/context";
import { Node } from "../types";
import * as Icons from "../../../../icons";

interface Props extends Node {
  depth: number;

  active: boolean;
  setActive: (f: (active: boolean) => boolean) => void;
}

function SidebarItem(props: Props) {
  const { depth, label, path, children = [], active, setActive } = props;

  const { location, Link } = useContext();

  const iconStylexProps = stylex.props(styles.icon);
  const iconStyle = { ...iconStylexProps.style, transform: active ? "rotate(90deg)" : "rotate(0deg)" };

  const icon =
    children.length === 0 ? null : (
      <Icons.ChevronRight className={iconStylexProps.className} style={iconStyle} width={16} height={16} />
    );

  const isActive = location.asPath.replace(/#.*$/, "") === path;
  const linkStylexProps = stylex.props(styles.link, isActive && styles.linkActive);
  const linkStyle = { ...linkStylexProps.style, marginLeft: depth * 16 };

  return (
    <div {...stylex.props(styles.root)}>
      {path ? (
        <Link href={path} className={linkStylexProps.className} style={linkStyle}>
          {props.icon ? React.cloneElement(props.icon, { ...stylex.props(styles.icn) }) : null}
          <span {...stylex.props(styles.label)}>{label}</span>
          {icon}
        </Link>
      ) : (
        <a href="#" className={linkStylexProps.className} style={linkStyle} onClick={() => setActive((x) => !x)}>
          {props.icon ? React.cloneElement(props.icon, { ...stylex.props(styles.icn) }) : null}
          <span {...stylex.props(styles.label)}>{label}</span>
          {icon}
        </a>
      )}
    </div>
  );
}

export default SidebarItem;

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "1px 0",

    fontSize: "0.9375rem",
    lineHeight: 2.2,

    "@media (min-width: 48rem)": {
      fontSize: "0.8125rem",
    },
  },

  link: {
    minWidth: 0,
    transition: "background 0.16s",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    color: "var(--timvir-text-color)",
    fontWeight: 500,
    backgroundColor: "none",
    textDecoration: "none",
    width: "100%",
    padding: "0 8px",
    opacity: 0.7,

    "@media (any-pointer: coarse)": {
      minHeight: "44px",
    },

    ":hover": {
      backgroundColor: "var(--timvir-sidebar-highlight-color)",
      opacity: 1,
    },
  },

  linkActive: {
    backgroundColor: "var(--timvir-sidebar-highlight-color)",
    opacity: 1,
  },

  icn: {
    display: "block",
    width: "1.3em",
    height: "1.3em",
    marginRight: "8px",
    minWidth: "1.3em",
  },

  label: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: "auto",
  },

  icon: {
    marginLeft: "4px",
    transition: "transform 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955)",
    transformOrigin: "center center",

    width: "1rem",
    height: "1rem",

    flex: "0 0 1rem",
  },
});
