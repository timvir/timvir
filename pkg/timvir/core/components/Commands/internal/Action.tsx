import { css } from "@linaria/core";
import * as React from "react";

const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  label?: React.ReactNode;
}

function Action(props: Props) {
  const { label, ...rest } = props;

  return (
    <Root className={classes.root} {...rest}>
      <div className={classes.icon}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
      <div className={classes.label}>{label}</div>
    </Root>
  );
}

export default Action;

const classes = {
  root: css`
    background-color: transparent;
    color: rgb(214, 214, 214);
    white-space: nowrap;
    display: flex;
    flex: 0 0 100%;
    align-items: center;

    transition: color 0.1s;

    height: 46px;

    display: flex;
    flex-shrink: initial;
    flex-basis: initial;
    flex-direction: row;
    flex-grow: 1;
    overflow: hidden;

    align-items: center;
    padding-inline: 14px;
    border-left: none;

    cursor: default;

    &:hover {
      background-color: rgb(55, 55, 60);
    }
  `,

  icon: css`
    margin-right: 12px;
    width: 16px;

    & > svg {
      display: block;
      width: 16px;
      height: 16px;
    }
  `,

  label: css`
    font-size: 0.8125rem;
    color: rgb(247, 248, 248);
  `,
};
