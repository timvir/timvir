import React from "react";
import { css } from "linaria";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  context?: React.ReactNode;
}

function SearchBoxListItem({ icon, label, context, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      role="button"
      ref={ref}
      {...props}
      className={css`
        display: flex;
        padding: 8px 0;
        font-size: 14px;
        cursor: pointer;

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
