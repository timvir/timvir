import React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "div";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentProps<typeof Component> {}

function Grid({ children, style, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Component
      ref={ref}
      {...props}
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gridGap: 24, ...style }}
    >
      {children}
    </Component>
  );
}

export default React.forwardRef(Grid);
