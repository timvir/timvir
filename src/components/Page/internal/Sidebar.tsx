import { css } from "linaria";
import Link from "next/link";
import * as React from "react";
import { noLayout } from "../layout";
import { Node } from "../types";
import Section from "./Section";

interface Props {
  location: { pathname: string };
  toc: Node[];
  Link: typeof Link;
}

function Sidebar({ location, toc, Link }: Props) {
  return (
    <aside className={noLayout}>
      <div
        className={css`
          display: none;
          padding-top: 50px;
          position: sticky;
          top: 0;
          height: 0;
          padding-left: 24px;

          @media (min-width: 60rem) {
            display: block;
            min-width: 20rem;
          }
        `}
      >
        <Search />

        <nav>
          {toc.map((c, i) => (
            <Section key={i} location={location} Link={Link} {...c} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

const Search = () => (
  <div
    className={css`
      position: relative;
      margin: 0 0 1.5rem 1.2ch;
      z-index: 1;
      max-width: 280px;
    `}
  >
    <label
      className={css`
        width: 100%;
        display: inline-flex;
        align-items: center;
        transition: border 0.2s ease;
        border-radius: 2px;
        background: hsla(0, 0%, 0%, 0.075);
        font-family: "Menlo", "Meslo LG", monospace;
      `}
    >
      <input
        type="text"
        placeholder="Search or jump to…"
        className={css`
          width: 100%;
          height: 100%;
          font-size: 0.8rem;
          border: none;
          outline: 0;
          padding-right: 1rem;
          -moz-appearance: none;
          -webkit-appearance: none;
          background: none;
          font-family: "Menlo", "Meslo LG", monospace;
          padding: 10px 1.2ch;
        `}
      />
      <span
        className={css`
          flex-shrink: 0;
          display: block;
          color: rgba(0, 0, 0, 0.3);
          padding: 4px 5px;
          border: 1px solid currentColor;
          border-radius: 3px;
          font-size: 0.8rem;
          line-height: 1;
          margin-right: 8px;
        `}
      >
        /
      </span>
    </label>
  </div>
);
