import React from "react";
import { css } from "linaria";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "div";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentProps<typeof Component> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  context?: React.ReactNode;
}

function SearchBoxListItem({ icon, label, context, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Component
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
    </Component>
  );
}

export default React.forwardRef(SearchBoxListItem);
