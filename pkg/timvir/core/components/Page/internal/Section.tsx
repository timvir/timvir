import { css } from "@linaria/core";
import * as React from "react";
import { useContext } from "timvir/context";
import { Node } from "../types";

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
          </Link>
        ) : (
          <a style={{ marginLeft: depth * 20 }} href="#" onClick={() => setActive((x) => !x)}>
            {label}
          </a>
        )}
      </div>

      {active && children.map((c, i) => <Section key={i} depth={depth + 1} {...c} />)}
    </section>
  );
}

export default Section;

const classes = {
  root: css``,

  node: css`
    display: flex;
    align-items: center;
    margin: 1px 0;
    padding: 0 16px;

    & > a {
      transition: background 0.16s;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      color: var(--timvir-sidebar-text-color);
      font-size: 14px;
      line-height: 1.725;
      background: none;
      text-decoration: none;
      width: 100%;
      padding: 0 6px;
      height: 27px;
    }
    &:hover a {
      background-color: var(--timvir-sidebar-highlight-color);
    }
    &[data-active="true"] a {
      background-color: var(--timvir-sidebar-highlight-color);
    }
  `,
};
