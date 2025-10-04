import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import * as Icons from "../../icons";
import { layoutStyles } from "../../core/layout";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  variant?: "info" | "warning" | "alert";
}

function Message(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { variant, children, ...rest } = props;

  return (
    <Root ref={ref} {...stylex.props(layoutStyles.block, styles.root, variant && styles[variant])} {...rest}>
      {variant &&
        {
          info: <Icons.ChevronsRight {...stylex.props(styles.icon, styles.iconInfo)} />,
          warning: <Icons.AlertCircle {...stylex.props(styles.icon, styles.iconWarning)} />,
          alert: <Icons.XOctagon {...stylex.props(styles.icon, styles.iconAlert)} />,
        }[variant]}
      <div {...stylex.props(styles.content)}>
        {React.Children.toArray(children).map((child, index, array) => {
          if (React.isValidElement(child)) {
            const style: React.CSSProperties = {
              marginTop: index === 0 ? "0" : undefined,
              marginBottom: index === array.length - 1 ? "0" : undefined,
            };

            if (Object.keys(style).length > 0) {
              const props: any = child.props;
              return React.cloneElement(child, {
                style: { ...props?.style, ...style },
              } as any);
            }

            return child;
          }
          return child;
        })}
      </div>
    </Root>
  );
}

export default React.forwardRef(Message);

const styles = stylex.create({
  root: {
    position: "relative",
    backgroundColor: "var(--c-p-0)",
    color: "black",
    borderRadius: 3,
    padding: "16px 24px",
    boxShadow: "inset 0 0 0 1px rgba(16, 22, 26, 0.2)",
    display: "flex",
    alignItems: "flex-start",
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },

  icon: {
    flex: "0 0 auto",
    display: "block",
    position: "relative",
    top: 3,
    margin: "-2px 12px 0 -4px",
    width: "1.5em",
    height: "1.5em",
  },

  info: {
    backgroundColor: "#f0f2fc",
    color: "black",
  },
  warning: {
    backgroundColor: "#fcf9f0",
    color: "black",
  },
  alert: {
    backgroundColor: "#fcf0f0",
    color: "black",
  },

  iconInfo: {
    color: "#2a47d5",
  },
  iconWarning: {
    color: "#a68521",
  },
  iconAlert: {
    color: "#da4444",
  },

  content: {
    flexGrow: 1,
    minWidth: 0,
  },
});
