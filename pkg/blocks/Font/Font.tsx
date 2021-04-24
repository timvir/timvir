import { mdx } from "@mdx-js/react";
import { css, cx } from "@linaria/core";
import * as React from "react";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  name: string;
  font: { style?: React.CSSProperties; className?: string };
  info?: React.ReactNode;
}

const classes = {
  meta: css`
    display: flex;
    align-items: baseline;

    font-size: 0.9rem;
    font-weight: bold;

    transition: all 0.2s;
  `,
};

function Font({ name, font, info, className, children, ...props }: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const [contentRef, setContentRef] = React.useState<null | HTMLDivElement>(null);
  const [fontSizeRef, setFontSizeRef] = React.useState<null | HTMLSpanElement>(null);
  const [infoRef, setInfoRef] = React.useState<null | HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef) {
      const computedStyle = window.getComputedStyle(contentRef);

      const intervalId = setInterval(() => {
        if (fontSizeRef) {
          const innerText = `${name} – ${Math.round(parseInt(computedStyle.fontSize))}px`;
          if (fontSizeRef.innerText !== innerText) {
            fontSizeRef.innerText = innerText;
          }
        }
      }, 250);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [name, contentRef]);

  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          padding: 16px 0;
        `
      )}
      {...props}
    >
      <div className={classes.meta}>
        {mdx(
          "h3",
          {
            className: css`
              margin: 0 auto 0 0;
            `,
          },
          <span ref={setFontSizeRef}>{name}</span>
        )}
        {info && (
          <div
            className={css`
              cursor: pointer;
              &:hover {
                color: var(--c-p-4);
                opacity: 1;
              }

              & > svg {
                position: relative;
                top: 2px;
              }
            `}
            onClick={() => {
              if (infoRef && contentRef) {
                // const contentParent = contentRef.parentElement;
                const infoParent = infoRef.parentElement;

                if (infoParent.style.height === "0px") {
                  infoParent.style.height = `${infoRef.getBoundingClientRect().height}px`;
                  infoParent.style.opacity = "1";

                  // contentParent.style.height = "0px";
                  // contentParent.style.opacity = "0";
                } else {
                  infoParent.style.height = "0px";
                  infoParent.style.opacity = "0";

                  // contentParent.style.height = window.getComputedStyle(contentRef).height;
                  // contentParent.style.opacity = "1";
                }
              }
            }}
          >
            <Icons.Info size={"1.1em"} />
          </div>
        )}
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {info && (
          <div
            className={css`
              overflow: hidden;
              transition: height 0.2s, opacity 0.2s 0.1s;
            `}
            style={{ height: 0, opacity: 0 }}
          >
            <div
              ref={setInfoRef}
              className={css`
                padding: 0 0 16px;
                display: flex;
                flex-direction: column;
              `}
            >
              {info}
            </div>
          </div>
        )}
        <div
          className={css`
            overflow: hidden;
            transition: height 0.2s, opacity 0.2s 0.1s;
          `}
          style={{ height: "auto", opacity: 1 }}
        >
          <div
            ref={setContentRef}
            contentEditable
            spellCheck="false"
            className={cx(
              font.className,
              css`
                outline: none;
                user-select: text;
                white-space: pre-wrap;
                overflow-wrap: break-word;
              `
            )}
            style={font.style}
          >
            {children || "The quick brown fox jumps over the lazy dog"}
          </div>
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Font);
