import * as React from "react";
import { css } from "@linaria/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "a";

interface Props extends React.ComponentProps<typeof Root> {
  as?: React.ComponentType<React.ComponentProps<typeof Root>>;
  icon?: React.ReactNode;
  label: React.ReactNode;
  context?: React.ReactNode;
}

function SearchBoxListItem(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { as, icon, label, context, ...rest } = props;

  const Component = as ?? Root;

  return (
    <Component
      role="button"
      ref={ref}
      className={css`
        display: flex;
        padding: 8px 0;
        font-size: 14px;
        color: var(--timvir-text-color);
        cursor: pointer;
        box-shadow: rgba(55, 53, 47, 0.09) 0px 1px 0px;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        :global(:root[data-timvir-theme="dark"]) & {
          box-shadow: rgba(255, 255, 255, 0.09) 0px 1px 0px;

          &:hover {
            background: rgba(255, 255, 255, 0.05);
          }
        }
      `}
      {...rest}
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
              color: var(--timvir-secondary-text-color);
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
