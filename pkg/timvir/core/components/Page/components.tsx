import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import * as React from "react";

const anchorize = (children?: React.ReactNode): undefined | string => {
  if (typeof children === "string") {
    return children
      .toLowerCase()
      .replace(/[ _]+/g, "-")
      .replace(/[!:^*./\\]/g, "");
  } else {
    return undefined;
  }
};

function Heading(Component: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>>) {
  return function Heading(props: React.HTMLAttributes<HTMLHeadingElement>) {
    const id = anchorize(props.children);

    return (
      <Component id={id} {...props}>
        <a
          className={css`
            margin-right: 6px;
            color: var(--timvir-accent-color);
            font-weight: bold;
            font-size: 1em;
            text-decoration: none;

            @media (min-width: 48rem) {
              position: absolute;
              top: -0.1em;
              left: -0.9em;
              font-size: 1.1em;
            }
          `}
          href={id && `#${id}`}
        >
          #
        </a>
        {props.children}
      </Component>
    );
  };
}

export const h1 = styled.h1`
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  line-height: 1.125;
  font-weight: 590;
  text-indent: -0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const h2 = Heading(
  styled.h2`
    position: relative;
    margin-top: 4.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    line-height: 1.1666;
    font-weight: 590;
  `
);

export const h3 = Heading(
  styled.h3`
    position: relative;
    margin-top: 3rem;
    margin-bottom: 0.5rem;
    font-size: 1.0625rem;
    line-height: 1.4705882353;
    font-weight: 590;
  `
);

export const h4 = Heading(
  styled.h4`
    position: relative;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 0.9375rem;
    line-height: 1.4375;
    font-weight: 590;
  `
);

export const blockquote = styled.blockquote`
  margin-left: 0;
  font-size: 1.1rem;

  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const hr = styled.hr`
  display: block;
  border: none;
  height: 1px;
  width: 100%;
  background: currentColor;
  opacity: 0.25;
`;

export const table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;

  width: 100%;
  overflow: auto;
`;

export const thead = styled.thead``;

export const tbody = styled.tbody``;

export const tr = styled.tr`
  background-color: #fff;
  border-top: 1px solid var(--c-p-2);

  &:nth-child(2n) {
    background-color: var(--c-p-0);
  }
`;

export const th = styled.th`
  text-align: ${(props) => props.align || "center"};

  padding: 6px 13px;
  border: 1px solid var(--c-p-2);
`;

export const td = styled.td`
  text-align: ${(props) => props.align || "left"};

  padding: 6px 13px;
  border: 1px solid var(--c-p-2);
`;

export const code = styled.code`
  border-radius: 5px;
  padding: 4px 6px 3px;
  font-size: 0.8em;
  background: var(--timvir-secondary-background-color);
  border: 1px solid var(--timvir-border-color);
`;

export const a = styled.a`
  color: currentColor;
  text-decoration: none;
  background-image: linear-gradient(transparent, transparent 5px, #383838 5px, #383838);
  background-position: bottom;
  background-size: 100% 6px;
  background-repeat: repeat-x;

  &:hover {
    background-image: linear-gradient(transparent, transparent 3px, #2bbc8a 3px, #2bbc8a);
  }

  &:hover ${code} {
    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.5), inset 0 1px 4px rgba(16, 22, 26, 0.2);
  }
  &:active ${code} {
    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.7), inset 0 1px 4px rgba(16, 22, 26, 0.4);
    background: var(--c-p-2);
  }
`;

export const p = styled.p`
  margin: 0 0 1rem;
`;

export const ul = styled.ul`
  margin: 0 0 1rem;
`;

export const ol = styled.ol`
  margin: 0 0 1rem;
`;
