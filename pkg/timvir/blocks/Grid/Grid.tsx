import { cx } from "../../internal/cx";
import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import { layoutStyles } from "../../core/layout";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {}

function Grid(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { children, className, ...rest } = props;

  const rootStyleProps = stylex.props(layoutStyles.block, styles.root);

  return (
    <Root
      ref={ref}
      {...rest}
      {...rootStyleProps}
      style={{ ...rootStyleProps.style, ...rest.style }}
      className={cx(className, rootStyleProps.className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const { style, ...props } = child.props as { style?: any };

        return React.createElement(child.type, {
          ...props,
          style: {
            margin: 0,
            gridColumn: "initial",
            ...style,
          },
        });
      })}
    </Root>
  );
}

export default React.forwardRef(Grid);

const styles = stylex.create({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "var(--timvir-page-margin, 24px)",
    "--timvir-margin": "calc(var(--timvir-page-margin, 24px) * 0.5)",
  },
});
