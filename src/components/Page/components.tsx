import { styled } from "linaria/react";

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

export const h2 = styled.h2`
  position: relative;
  display: block;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: var(--c-text);
  text-transform: none;
  letter-spacing: normal;
  font-weight: bold;
  font-size: 1rem;

  &::before {
    position: absolute;
    top: -4px;
    left: -1.2rem;
    color: var(--c-p-4);
    content: "#";
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const h3 = styled.h3`
  position: relative;
  display: block;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: var(--c-text);
  text-transform: none;
  letter-spacing: normal;
  font-weight: bold;
  font-size: 0.9rem;

  &::before {
    position: absolute;
    top: -3px;
    left: -1rem;
    color: var(--c-p-4);
    content: "#";
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

export const h4 = styled.h4`
  position: relative;
  display: block;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: var(--c-text);
  text-transform: none;
  letter-spacing: normal;
  font-weight: normal;
  font-size: 0.9rem;

  &::before {
    position: absolute;
    top: -3px;
    left: -1rem;
    color: var(--c-p-4);
    content: "#";
    font-weight: bold;
    font-size: 1.1rem;
  }
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
