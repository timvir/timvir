import { css, cx } from "@linaria/core";
import * as React from "react";
import IconCode from "./IconCode";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "a";

interface Props extends React.ComponentProps<typeof Root> {
  // default is a code icon
  icon?: React.ReactNode;
  noIcon?: boolean;
  url: string;
}

function CodeSourceLink(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const {
    noIcon,
    icon = <IconCode style={{ marginRight: "8px" }} />,
    url,
    children = "View source on Github",
    className,
    ...rest
  } = props;

  return (
    <Root ref={ref} href={url} className={cx(className, classes.root)} {...rest}>
      {/* use fragment to fix single node error */}
      <>
        {!noIcon && icon}
        {children}
      </>
    </Root>
  );
}

export default React.forwardRef(CodeSourceLink);

const classes = {
  root: css`
    display: flex;
    background-color: var(--c-p-0);
    border: 1px solid var(--c-p-2);
    color: var(--timvir-text-color);
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    padding: 8px;
    text-decoration: none;
    &:hover {
      border-color: var(--c-p-4);
      color: var(--c-p-5);
    }
  `,
};
