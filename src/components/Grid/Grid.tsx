import React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {}

function Grid({ children, style, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      ref={ref}
      {...props}
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gridGap: 24, ...style }}
    >
      {children}
    </Root>
  );
}

export default React.forwardRef(Grid);
