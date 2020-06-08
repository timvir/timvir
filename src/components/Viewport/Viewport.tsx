import { css, cx } from "linaria";
import React from "react";
import { useResizeObserver, useResizeObserverEntry } from "../../hooks/useResizeObserver";
import { fullWidth } from "../Page";
import * as pageComponents from "../Page/components";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  src: string;
}

function Viewport({ src, className, ...props }: Props, ref: any /* FIXME */) {
  const [containerRef, containerROE] = useResizeObserverEntry();
  const [svgRef, svgROE] = useResizeObserverEntry();
  const [viewportRef, roe] = useResizeObserverEntry();

  const [height, setHeight] = React.useState<undefined | number>(undefined);

  const [width, setWidth] = React.useState<undefined | number>(undefined);
  React.useEffect(() => {
    if (containerROE) {
      if (width === undefined) {
        setWidth(containerROE.contentRect.width);
      }
    }
  }, [containerROE, setWidth, width]);

  const lock = React.useRef("");
  const iframeRef = React.useRef<HTMLIFrameElement>();

  React.useEffect(() => {
    const onMouseMove = (ev: MouseEvent) => {
      if (lock.current) {
        ev.preventDefault();
        const max = svgROE.contentRect.width - 2 * (56 + 8 + 8);
        setWidth((width) =>
          Math.min(max, Math.max(320, width + 2 * ev.movementX * ({ left: -1, right: 1 }[lock.current] ?? 1)))
        );
      }
    };

    const onMouseUp = () => {
      lock.current = "";
      iframeRef.current!.style.userSelect = "";
      iframeRef.current!.style.pointerEvents = "";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [svgROE]);

  const iframeRO = useResizeObserver((entries) => {
    // console.log("iframeRO", entries);
    setHeight(entries[entries.length - 1].contentRect.height);
  });

  React.useEffect(() => {
    iframeRO.observe(iframeRef.current.contentDocument.body);
  });

  return (
    <>
      <div ref={containerRef} />
      <Root ref={ref} {...props} className={cx(className, fullWidth)}>
        <div
          ref={svgRef}
          className={css`
            position: relative;
          `}
        >
          <svg
            viewBox={`-${(svgROE?.contentRect.width ?? 0) / 2} -20 ${svgROE?.contentRect.width ?? 0} 40`}
            className={css`
              width: 100%;
              display: block;
              height: 40px;
            `}
          >
            <rect
              x={-(svgROE?.contentRect.width ?? 0) / 2}
              y={-8}
              width={svgROE?.contentRect.width ?? 0}
              height={16}
              fill="rgba(0, 0, 0, .1)"
            />
            <line x1={-(width ?? 0) / 2} x2={-(width ?? 0) / 2} y1={-8} y2={8} strokeWidth={2} stroke="var(--c-p-4)" />
            <line x1={(width ?? 0) / 2} x2={(width ?? 0) / 2} y1={-8} y2={8} strokeWidth={2} stroke="var(--c-p-4)" />
            {/* <circle r={5} cx={width / 2} fill="magenta" /> */}
            {/* <circle r={5} cx={-width / 2} fill="magenta" /> */}
          </svg>
          <div
            className={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            {width}px
          </div>
        </div>
        <div
          className={css`
            display: flex;
            align-items: stretch;
            justify-content: center;
          `}
        >
          <div>
            <div
              className={css`
                border-radius: 3px;
                display: grid;
                grid-template-columns: 56px auto 56px;
                grid-template-rows: 0 auto 0;
                grid-column-gap: 8px;
              `}
            >
              <div
                ref={viewportRef}
                className={css`
                  grid-column: 2 / span 1;
                  grid-row: 2 / span 1;
                  position: relative;
                  flex: 1;
                  height: 100px;
                  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=);
                `}
                style={{ width, height }}
              >
                <iframe
                  ref={iframeRef}
                  frameBorder="0"
                  src={src}
                  onLoad={() => {
                    const { height } = iframeRef.current.contentDocument.body.getBoundingClientRect();
                    setHeight(height);
                  }}
                  className={css`
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                  `}
                  style={{ width: roe?.contentRect.width ?? 0, height: roe?.contentRect.height ?? 0 }}
                />
              </div>

              <div
                className={css`
                  grid-column: 1 / span 1;
                  grid-row: 1 / span 3;
                  cursor: pointer;

                  display: flex;
                  align-items: center;
                  justify-content: center;

                  opacity: 0.5;
                  color: var(--c-text);

                  border-radius: 2px;
                  transition: all 0.2s cubic-bezier(0.4, 1, 0.75, 0.9);

                  &:hover {
                    opacity: 1;
                    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2),
                      0 8px 24px rgba(16, 22, 26, 0.2);
                  }

                  &:active {
                    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0),
                      0 1px 1px rgba(16, 22, 26, 0.2);
                  }
                `}
                onMouseDown={() => {
                  lock.current = "left";
                  iframeRef.current.style.userSelect = "none";
                  iframeRef.current.style.pointerEvents = "none";
                }}
              >
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <path fill="currentColor" d="M27 18h2v20h-2V18zm-6 0h2v20h-2V18zm12 0h2v20h-2V18z" />
                </svg>
              </div>
              <div
                className={css`
                  grid-column: 3 / span 1;
                  grid-row: 1 / span 3;
                  cursor: pointer;

                  display: flex;
                  align-items: center;
                  justify-content: center;

                  opacity: 0.5;
                  color: var(--c-text);

                  border-radius: 2px;
                  transition: all 0.2s cubic-bezier(0.4, 1, 0.75, 0.9);

                  &:hover {
                    opacity: 1;
                    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2),
                      0 8px 24px rgba(16, 22, 26, 0.2);
                  }

                  &:active {
                    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0),
                      0 1px 1px rgba(16, 22, 26, 0.2);
                  }
                `}
                onMouseDown={() => {
                  lock.current = "right";
                  iframeRef.current.style.userSelect = "none";
                  iframeRef.current.style.pointerEvents = "none";
                }}
              >
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <path fill="currentColor" d="M27 18h2v20h-2V18zm-6 0h2v20h-2V18zm12 0h2v20h-2V18z" />
                </svg>
              </div>
              {/* <div
                className={css`
                  grid-column: 2 / span 1;
                  grid-row: 2 / span 1;
                  cursor: pointer;

                  &:hover {
                    background: rgba(0, 0, 0, 0.1);
                  }
                `}
              /> */}
            </div>
          </div>
        </div>
      </Root>

      <figcaption
        style={{
          fontSize: "0.75rem",
          color: "#999",
          marginTop: 8,
          whiteSpace: "nowrap",
        }}
      >
        Source:{" "}
        <pageComponents.a href={src} target="_blank">
          {src}
        </pageComponents.a>
      </figcaption>
    </>
  );
}

export default React.forwardRef(Viewport);
