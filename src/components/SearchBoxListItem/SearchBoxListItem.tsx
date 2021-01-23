import * as React from "react";
import { css } from "@linaria/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  context?: React.ReactNode;
}

function SearchBoxListItem({ icon, label, context, ...props }: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  return (
    <Root
      role="button"
      ref={ref}
      {...props}
      className={css`
        display: flex;
        padding: 8px 0;
        font-size: 14px;
        color: var(--c-text);
        cursor: pointer;
        box-shadow: rgba(55, 53, 47, 0.09) 0px 1px 0px;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 14px;
          width: 18px;
          height: 24px;
        `}
      >
        {icon}
      </div>
      <div
        className={css`
          margin-left: 14px;
        `}
      >
        <div>{label}</div>
        {context && (
          <div
            className={css`
              font-size: 12px;
              color: rgba(55, 53, 47, 0.4);
            `}
          >
            {context}
          </div>
        )}
      </div>
    </Root>
  );
}

export default React.forwardRef(SearchBoxListItem);
