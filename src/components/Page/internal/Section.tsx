import { css } from "linaria";
import React from "react";
import { useContext } from "../context";
import { Node } from "../types";

interface Props extends Node {}

const Section = ({ label, path, children = [] }: Props) => {
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
        }
        & > div:before {
          opacity: 0;
          color: var(--c-p-4);
          content: "›";
          height: 1.1rem;
          font-size: 1rem;
          line-height: 1rem;
          transition: all 0.16s;
        }

        & > div:hover:before,
        & > div[data-active="true"]:before {
          opacity: 1;
          left: 0;
        }
        & > div > a {
          display: inline-block;
          margin-left: 0.5ch;
          color: var(--c-text);
          font-size: 0.8rem;
          line-height: 1.725;
          background: none;
          color: inherit;
          text-decoration: none;
          width: 100%;
        }
        & > div:hover a {
          color: var(--c-p-4);
        }
        & > & {
          padding: 0 0 0 2ch;
        }
      `}
    >
      <div data-active={location.asPath === path}>
        {path ? (
          <Link href={path}>
            <a>{label}</a>
          </Link>
        ) : (
          <a href="#" onClick={() => setActive((x) => !x)}>
            {label}
          </a>
        )}
      </div>
      {active && children.map((c, i) => <Section key={i} {...c} />)}
    </section>
  );
};

export default Section;
