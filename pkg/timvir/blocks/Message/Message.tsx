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
    backgroundColor: "var(--timvir-message-bg-color)",
    color: "var(--timvir-message-text-color)",
    borderRadius: 3,
    padding: "16px 24px",
    boxShadow: "inset 0 0 0 1px var(--timvir-message-border-color)",
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
    backgroundColor: "var(--timvir-message-info-bg)",
    color: "var(--timvir-message-info-text)",
  },
  warning: {
    backgroundColor: "var(--timvir-message-warning-bg)",
    color: "var(--timvir-message-warning-text)",
  },
  alert: {
    backgroundColor: "var(--timvir-message-alert-bg)",
    color: "var(--timvir-message-alert-text)",
  },

  iconInfo: {
    color: "var(--timvir-message-info-icon)",
  },
  iconWarning: {
    color: "var(--timvir-message-warning-icon)",
  },
  iconAlert: {
    color: "var(--timvir-message-alert-icon)",
  },

  content: {
    flexGrow: 1,
    minWidth: 0,
  },
});
