import { css } from "@linaria/core";
import * as React from "react";
import { useContext } from "timvir/context";
import { Node } from "../types";
import * as Icons from "react-feather";

interface Props extends Node {
  depth: number;

  active: boolean;
  setActive: (f: (active: boolean) => boolean) => void;
}

function SidebarItem(props: Props) {
  const { depth, label, path, children = [], active, setActive } = props;

  const { location, Link } = useContext();

  const icon =
    children.length === 0 ? null : (
      <Icons.ChevronRight
        className={classes.icon}
        style={{ transform: active ? "rotate(90deg)" : "rotate(0deg)" }}
        size={16}
      />
    );

  return (
    <div className={classes.root} data-active={path && location.asPath.startsWith(path)}>
      {path ? (
        <Link href={path} style={{ marginLeft: depth * 16 }}>
          {props.icon ? React.cloneElement(props.icon, { className: classes.icn }) : null}
          <span className={classes.label}>{label}</span>
          {icon}
        </Link>
      ) : (
        <a style={{ marginLeft: depth * 16 }} href="#" onClick={() => setActive((x) => !x)}>
          {props.icon ? React.cloneElement(props.icon, { className: classes.icn }) : null}
          <span className={classes.label}>{label}</span>
          {icon}
        </a>
      )}
    </div>
  );
}

export default SidebarItem;

const classes = {
  root: css`
    display: flex;
    align-items: center;
    margin: 1px 0;

    font-size: 0.9375rem;
    line-height: 2.2;

    @media (min-width: 48rem) {
      font-size: 0.8125rem;
    }

    @media (any-pointer: coarse) {
      & > a {
        min-height: 44px;
      }
    }

    & > a {
      min-width: 0;
      transition: background 0.16s;
      border-radius: 4px;
      display: flex;
      align-items: center;
      color: var(--timvir-text-color);
      font-weight: 500;
      background: none;
      text-decoration: none;
      width: 100%;
      padding: 0 8px;
      opacity: 0.7;
    }
    &:hover a {
      background-color: var(--timvir-sidebar-highlight-color);
      opacity: 1;
    }
    &[data-active="true"] a {
      background-color: var(--timvir-sidebar-highlight-color);
      opacity: 1;
    }
  `,

  icn: css`
    display: block;
    width: 1.3em;
    height: 1.3em;
    margin-right: 8px;
    min-width: 1.3em;
  `,

  label: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: auto;
  `,

  icon: css`
    margin-left: 4px;
    transition: transform 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transform-origin: center center;

    width: 1rem;
    height: 1rem;

    flex: 0 0 1rem;
  `,
};
