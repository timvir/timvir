import { css } from "@linaria/core";
import * as React from "react";
import { useContext } from "../../../context";
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
    <section
      className={css`
        & > div {
          display: flex;
          align-items: center;
          border-radius: 3px;
          margin: 2px 0;
          transition: background 0.16s;
        }

        & > div[data-active="true"] {
          background: var(--c-p-2) !important;
        }

        & > div > a {
          font-family: system-ui;
          font-weight: 500;
          display: inline-block;
          color: var(--timvir-text-color);
          font-size: 14px;
          line-height: 1.725;
          background: none;
          text-decoration: none;
          width: 100%;
          padding: 0 24px;
        }
        & > div:hover {
          background: var(--c-p-1);
        }
        & > div:hover a {
          color: black;
        }
      `}
    >
      <div data-active={location.asPath === path}>
        {path ? (
          <Link href={{ pathname: path }}>
            <a style={{ paddingLeft: 24 + depth * 20 }}>{label}</a>
          </Link>
        ) : (
          <a style={{ paddingLeft: 24 + depth * 20 }} href="#" onClick={() => setActive((x) => !x)}>
            {label}
          </a>
        )}
      </div>
      {active && children.map((c, i) => <Section key={i} depth={depth + 1} {...c} />)}
    </section>
  );
}

export default Section;
