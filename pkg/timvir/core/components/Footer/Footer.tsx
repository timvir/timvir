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

function Footer(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { className, links, ...rest } = props;

  return (
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      {links && (
        <div className={grid}>
          <div className={classes.linkGroups}>
            {links.map(({ group, items }, i) => (
              <div key={i}>
                <div className={classes.linkGroupTitle}>{group}</div>
                <div>
                  {items.map(({ label, href }, j) => (
                    <a key={j} href={href} className={classes.link}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={cx(grid, classes.meta)}>
        <div style={{ marginBottom: 0 }}>
          Built with <a href="https://timvir.vercel.app">Timvir</a>
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Footer);

const classes = {
  root: css`
    padding: 50px 0 30px;

    display: grid;
    gap: 50px;

    border-top: 1px solid var(--timvir-border-color);
  `,

  linkGroups: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(234px, 1fr));
    grid-gap: 32px;
  `,

  linkGroupTitle: css`
    font-weight: 600;
    margin-bottom: 12px;
  `,

  link: css`
    display: block;
    color: inherit;
    text-decoration: none;
    &:hover {
      color: var(--c-p-4);
    }
  `,

  meta: css`
    color: var(--timvir-secondary-text-color);

    a {
      color: inherit;
      text-decoration: none;
      background-image: linear-gradient(transparent, transparent 5px, #383838 5px, #383838);
      background-position: bottom;
      background-size: 100% 6px;
      background-repeat: repeat-x;

      &:hover {
        background-image: linear-gradient(transparent, transparent 3px, #2bbc8a 3px, #2bbc8a);
      }
    }
  `,
};
