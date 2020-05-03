import { css } from "linaria";
import { styled } from "linaria/react";
import React from "react";

const anchorize = (children?: React.ReactNode): string => {
  if (typeof children === "string") {
    return children
      .toLowerCase()
      .replace(/[ _]+/g, "-")
      .replace(/[!:^*./\\]/g, "");
  } else {
    return undefined;
  }
};

function Heading(Component: React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = anchorize(props.children);

    return (
      <Component id={id} {...props}>
        <a
          className={css`
            position: absolute;
            top: 0em;
            left: -0.8em;
            color: var(--c-p-4);
            font-weight: bold;
            font-size: 1em;
            text-decoration: none;

            @media (min-width: 48rem) {
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
  display: block;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: var(--c-p-4);
  letter-spacing: 0.01em;
  font-weight: 700;
  font-style: normal;
  font-size: 1.5em;
  text-indent: -0.05em;
`;

export const h2 = Heading(styled.h2`
  position: relative;
  display: block;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: var(--c-text);
  text-transform: none;
  letter-spacing: normal;
  font-weight: bold;
  font-size: 1rem;
`);

export const h3 = Heading(styled.h3`
  position: relative;
  display: block;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: var(--c-text);
  text-transform: none;
  letter-spacing: normal;
  font-weight: bold;
  font-size: 0.9rem;
`);

export const h4 = Heading(styled.h4`
  position: relative;
  display: block;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: var(--c-text);
  text-transform: none;
  letter-spacing: normal;
  font-weight: normal;
  font-size: 0.9rem;
`);

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
`;

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
