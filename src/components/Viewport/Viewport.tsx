import { css, cx } from "linaria";
import React from "react";
import { useResizeObserver, useResizeObserverEntry } from "../../hooks/useResizeObserver";
import { fullWidth } from "../Page";
import { Caption, Handle, Ruler } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  src: string;
}

function Viewport({ src, className, ...props }: Props, ref: any /* FIXME */) {
  /*
   * The container measures the width of the main column. It is used to initialize
   * the default width.
   */
  const [containerRef, containerROE] = useResizeObserverEntry();

  /*
   * The SVG spans across the full width. It is used to restrict the max width.
   */
  const [svgRef, svgROE] = useResizeObserverEntry();

  const [height, setHeight] = React.useState<undefined | number>(undefined);

  const [width, setWidth] = React.useState<undefined | number>(undefined);
  React.useEffect(() => {
    if (width === undefined && containerROE) {
      setWidth(containerROE.contentRect.width);
    } else if (svgROE) {
      const max = svgROE.contentRect.width - 2 * (56 + 8 + 8);
      if (width > max) {
        setWidth(max);
      }
    }
  }, [containerROE, svgROE, setWidth, width]);

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
    if (height !== undefined) {
      setHeight(entries[entries.length - 1].contentRect.height);
    }
  });

  React.useEffect(() => {
    if (iframeRef.current.contentDocument.body) {
      iframeRO.observe(iframeRef.current.contentDocument.body);
    }
  });

  return (
    <>
      <div ref={containerRef} />
      <Root
        ref={ref}
        {...props}
        className={cx(
          className,
          fullWidth,
          css`
            contain: layout;
          `
        )}
      >
        <div
          ref={svgRef}
          className={css`
            position: relative;
          `}
        >
          <Ruler containerWidth={svgROE?.contentRect.width} viewportWidth={width} />
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
                className={cx(
                  css`
                    grid-column: 2 / span 1;
                    grid-row: 2 / span 1;
                    position: relative;
                    flex: 1;
                    height: 100px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=);
                    transition: height 0.16s;
                    overflow: hidden;
                  `,
                  height === undefined &&
                    css`
                      animation-duration: 2s;
                      animation-fill-mode: forwards;
                      animation-iteration-count: infinite;
                      animation-name: shimmer;
                      animation-timing-function: linear;
                      background-size: 150vw 100px;
                      background-image: linear-gradient(to right, #fafafa 0%, #f4f4f4 25%, #fafafa 40%);
                      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2);
                      border-radius: 1px;

                      @keyframes shimmer {
                        0% {
                          background-position: -60vw 0
                        }
                        40% {
                          background-position: 85vw 0
                        }
                        100% {
                          background-position: 85vw 0
                        }
                      }
                    `
                )}
                style={{ width, height }}
              >
                <iframe
                  ref={iframeRef}
                  frameBorder="0"
                  src={src}
                  onLoad={(ev) => {
                    const { height } = ev.currentTarget.contentDocument.body.getBoundingClientRect();
                    setHeight(height);
                  }}
                  className={css`
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transition: opacity 0.2s;
                  `}
                  style={{
                    opacity: height === undefined ? 0 : 1,
                    pointerEvents: height === undefined ? "none" : undefined,
                  }}
                />
              </div>

              <Handle gridColumn="1" lock={lock} edge="left" iframeRef={iframeRef} />
              <Handle gridColumn="3" lock={lock} edge="right" iframeRef={iframeRef} />
            </div>
          </div>
        </div>

        <Ruler containerWidth={svgROE?.contentRect.width} viewportWidth={width} />
      </Root>

      <Caption src={src} />
    </>
  );
}

export default React.forwardRef(Viewport);
