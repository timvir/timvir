import { css } from "linaria";
import Link from "next/link";
import React from "react";
import { Node } from "../types";

interface Props extends Node {
  location: { pathname: string };
  Link: typeof Link;
}

const Section = ({ location, Link, label, path, children = [] }: Props) => {
  const [active, setActive] = React.useState<boolean>(() => {
    if (path) {
      return location.pathname.startsWith(path);
    } else if (children.length > 0) {
      return children.some(({ path }) => path && location.pathname.startsWith(path))
    } else {
      return false
    }
  });

  React.useEffect(() => {
    if (path && location.pathname.startsWith(path)) {
      setActive(true);
    }
  }, [path, location.pathname]);

  return (
    <section
      className={css`
        & > div:before {
          opacity: 0;
          color: #2bbc8a;
          content: "›";
          position: relative;
          left: 2px;
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
          color: #383838;
          font-size: 0.8rem;
          line-height: 1.725;
          background: none;
          color: inherit;
          text-decoration: none;
          width: 100%;
        }
        & > div:hover a {
          color: #2bbc8a;
        }
        & > & {
          padding: 0 0 0 2ch;
        }
      `}
    >
      <div data-active={location.pathname === path}>
        {path ? (
          <Link href={path}>
            <a>{label}</a>
          </Link>
        ) : (
          <a href="#" onClick={() => setActive(x => !x)}>
            {label}
          </a>
        )}
      </div>
      {active && children.map((c, i) => <Section key={i} location={location} Link={Link} {...c} />)}
    </section>
  );
};

export default Section;
