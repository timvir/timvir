import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {}

function Grid(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, style, ...rest } = props;

  return (
    <Root
      ref={ref}
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gridGap: 24, ...style }}
      {...rest}
    >
      {children}
    </Root>
  );
}

export default React.forwardRef(Grid);
