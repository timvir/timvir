import { css } from "@linaria/core";
import * as React from "react";
import { useContext } from "timvir/context";
import { Node } from "../types";
import * as Icons from "react-feather";

interface Props extends Node {
  depth: number;
}

function Section(props: Props) {
  const { depth, label, path, children = [] } = props;

  const { location, Link } = useContext();

  const [active, setActive] = React.useState<boolean>(() => {
    if (path) {
      return location.asPath.startsWith(path);
    } else if (children.length > 0) {
      return children.some(({ path }) => path && location.asPath.startsWith(path));
    } else {
      return false;
    }
  });

  React.useEffect(() => {
    if (path && location.asPath.startsWith(path)) {
      setActive(true);
    }
  }, [path, location.asPath]);

  return (
    <section className={classes.root}>
      <div className={classes.node} data-active={location.asPath === path}>
        {path ? (
          <Link href={path} style={{ marginLeft: depth * 20 }}>
            {label}
            {children.length > 0 && (
              <Icons.ChevronRight
                className={classes.icon}
                style={{ transform: active ? "rotate(90deg)" : "rotate(0deg)" }}
                size={16}
              />
            )}
          </Link>
        ) : (
          <a style={{ marginLeft: depth * 20 }} href="#" onClick={() => setActive((x) => !x)}>
            {label}
            {children.length > 0 && (
              <Icons.ChevronRight
                className={classes.icon}
                style={{ transform: active ? "rotate(90deg)" : "rotate(0deg)" }}
                size={16}
              />
            )}
          </a>
        )}
      </div>

      {active && children.length > 0 && (
        <div style={{ padding: "0" }}>
          {children.map((c, i) => (
            <Section key={i} depth={depth + 1} {...c} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Section;

const classes = {
  root: css``,

  node: css`
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin: 1px 0;

    & > a {
      transition: background 0.16s;
      border-radius: 8px;
      display: flex;
      align-items: center;
      color: var(--timvir-sidebar-text-color);
      font-size: 0.8125rem;
      line-height: 2.2;
      font-weight: 510;
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

  icon: css`
    margin-left: auto;
    transition: transform 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transform-origin: center center;
  `,
};
