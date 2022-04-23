import { css, cx } from "@linaria/core";
import { send, useContext } from "@timvir/core";
import * as React from "react";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  codeId?: string;
}

const exhibit = css`
  cursor: pointer;
  transition: all 0.2s;
`;

interface Selector {
  hover?: number;
  sticky?: number;
}

function Exhibits(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { codeId, children, ...rest } = props;

  const context = useContext();
  const backdrop = React.useRef<HTMLDivElement>(null);

  const [selector, setSelector] = React.useState<Selector>({});
  const timeout = React.useRef<any>();

  const exhibits: React.ReactElement[] = React.Children.toArray(children).filter(React.isValidElement);

  const { source } = exhibits[(selector.hover ?? selector.sticky) as any]?.props ?? {};
  React.useEffect(() => {
    if (codeId) {
      if (source) {
        send(context.bus, codeId, "merge", { children: source });
      } else {
        send(context.bus, codeId, "reset", {});
      }
    }
  }, [codeId, source]);

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
  }, [selector]);

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
          return React.cloneElement(child, {
            className: cx(child.props.className, exhibit),
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
    </Root>
  );
}

export default React.forwardRef(Exhibits);
