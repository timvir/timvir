import { css, cx } from "linaria";
import React from "react";
import { grid } from "../Page/layout";

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

function Footer({ className, links, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          padding: 50px 0 30px;
          background: #20232a;
          color: white;
        `
      )}
      {...props}
    >
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
                    font-weight: 900;
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
