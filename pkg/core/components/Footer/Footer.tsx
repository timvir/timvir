import { grid } from "../../layout";
import { css, cx } from "@linaria/core";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "footer";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  links?: Array<{
    group: React.ReactNode;
    items: Array<{ label: string; href: string }>;
  }>;
}

function Footer(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { className, links, ...rest } = props;

  return (
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      {links && (
        <div
          className={cx(
            grid,
            css`
              margin-bottom: 50px;
            `
          )}
        >
          <div
            className={css`
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(234px, 1fr));
              grid-gap: 32px;
            `}
          >
            {links.map(({ group, items }, i) => (
              <div key={i}>
                <div
                  className={css`
                    text-transform: uppercase;
                    color: #999;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    margin-bottom: 12px;
                  `}
                >
                  {group}
                </div>
                <div>
                  {items.map(({ label, href }, j) => (
                    <a
                      key={j}
                      href={href}
                      className={css`
                        display: block;
                        color: white;
                        text-decoration: none;
                        &:hover {
                          color: var(--c-p-4);
                        }
                      `}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={cx(
          grid,
          css`
            color: #999;
          `
        )}
      >
        <div>Copyright 2020</div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Footer);

const classes = {
  root: css`
    padding: 50px 0 30px;
    background: #20232a;
    color: white;
  `,
};
