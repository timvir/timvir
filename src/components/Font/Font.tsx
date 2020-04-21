import { cx, css } from "linaria";
import React from "react";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  name: string;
  font: { style: React.CSSProperties; className?: string };
  info?: React.ReactNode;
}

function Font({ name, font, info, className, children, ...props }: Props, ref: any /* FIXME */) {
  const [contentRef, setContentRef] = React.useState<null | HTMLDivElement>(null);
  const [fontSizeRef, setFontSizeRef] = React.useState<null | HTMLDivElement>(null);
  const [infoRef, setInfoRef] = React.useState<null | HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef) {
      const computedStyle = window.getComputedStyle(contentRef);

      const intervalId = setInterval(() => {
        if (fontSizeRef) {
          const { fontSize } = computedStyle;
          fontSizeRef.innerText = `${Math.round(parseInt(fontSize))}px`;
        }
      }, 250);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [contentRef]);

  const classNames = {
    meta: css`
      display: flex;
    `,
  };

  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          padding: 16px 0;

          & .${classNames.meta} > * {
            opacity: 0.5;
          }
          &:hover .${classNames.meta} > * {
            opacity: 0.8;
          }
        `
      )}
      {...props}
    >
      <div className={classNames.meta}>
        <div
          ref={setFontSizeRef}
          className={css`
            text-align: left;
          `}
        />
        <div
          className={css`
            margin-right: auto;
          `}
        >
          {" "}– {name}
        </div>
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
                  infoParent.style.height = window.getComputedStyle(infoRef).height;
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
        <div
          className={css`
            margin-left: 16px;
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
        >
          <Icons.RotateCcw size={"1.1em"} />
        </div>
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
                padding: 16px 0;
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
