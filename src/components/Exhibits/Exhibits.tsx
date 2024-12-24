import { css, cx } from "@linaria/core";
import * as React from "react";
import { Code } from "timvir/blocks";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

const exhibit = css`
  cursor: pointer;
  transition: all 0.2s;
`;

interface Selector {
  hover?: number;
  sticky?: number;
}

function Exhibits(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, ...rest } = props;

  const backdrop = React.useRef<HTMLDivElement>(null);
  const [selector, setSelector] = React.useState<Selector>({});
  const timeout = React.useRef<any>(null);
  const [codeRef, setCodeRef] = React.useState<null | HTMLDivElement>(null);

  const exhibits: React.ReactElement<{ source: string }>[] = React.Children.toArray(children).filter(
    React.isValidElement
  ) as any;

  React.useEffect(() => {
    const index = selector.hover ?? selector.sticky;
    if (index !== undefined) {
      const root = backdrop.current!.parentElement!;
      const child = root.children[index + 1];
      const c = root.getBoundingClientRect();
      const e = child.getBoundingClientRect();
      backdrop.current!.style.clipPath = `inset(${e.top - c.top}px ${c.right - e.right}px ${c.bottom - e.bottom}px ${
        e.left - c.left
      }px round 4px)`;
    } else {
      backdrop.current!.style.clipPath = "";
    }

    if (codeRef) {
      const infoParent = codeRef.parentElement!;
      if (index !== undefined) {
        infoParent.style.height = `${codeRef.getBoundingClientRect().height}px`;
        infoParent.style.opacity = "1";
      } else {
        infoParent.style.height = "0px";
        infoParent.style.opacity = "0";
      }
    }
  }, [selector, codeRef]);

  return (
    <Root ref={ref} {...rest}>
      <div
        className={css`
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;

          .${exhibit} {
            & > div {
              background: none;
            }
          }
        `}
      >
        <div
          ref={backdrop}
          className={css`
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=);
            z-index: -1;
            clip-path: inset(0 0 0 0);
            transition: all 0.2s;
          `}
        />

        {exhibits.map((child, i) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return React.cloneElement<any>(child, {
            className: cx((child.props as any).className, exhibit),
            source: undefined,
            onMouseEnter: (_ev: React.MouseEvent<HTMLDivElement>) => {
              if (selector.sticky !== undefined) {
                clearTimeout(timeout.current);
                timeout.current = setTimeout(() => {
                  setSelector((selector) => ({ ...selector, hover: i }));
                }, 150);
              } else {
                setSelector((selector) => ({ ...selector, hover: i }));
              }
            },
            onMouseLeave: () => {
              if (selector.sticky !== undefined) {
                clearTimeout(timeout.current);
                timeout.current = setTimeout(() => {
                  setSelector((selector) => ({ ...selector, hover: undefined }));
                }, 150);
              } else {
                setSelector((selector) => ({ ...selector, hover: undefined }));
              }
            },
            onClick: () => {
              setSelector((selector) => ({ ...selector, sticky: i }));
            },
          });
        })}

        {selector.sticky !== undefined && (
          <div
            className={css`
              position: absolute;
              top: 0;
              right: 0;

              cursor: pointer;
              &:hover {
                color: var(--c-p-4);
                opacity: 1;
              }
            `}
            onClick={() => {
              setSelector((selector) => ({ ...selector, sticky: undefined }));
            }}
          >
            <Icons.X size={"1.5em"} />
          </div>
        )}
      </div>

      {(() => {
        const focusedExhibitIndex = selector.hover ?? selector.sticky;
        if (focusedExhibitIndex === undefined) {
          return null;
        }

        return (
          <div
            className={cx(
              css`
                transition: height 0.2s, opacity 0.2s 0.1s;
              `
            )}
            style={{ height: 0, opacity: 0 }}
          >
            <div ref={setCodeRef}>
              <Code language="jsx">{exhibits[focusedExhibitIndex].props.source}</Code>
            </div>
          </div>
        );
      })()}
    </Root>
  );
}

export default React.forwardRef(Exhibits);
