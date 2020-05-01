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
        setWidth((width) => Math.max(0, width + 2 * ev.movementX * ({ left: -1, right: 1 }[lock.current] ?? 1)));
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
  }, []);

  const iframeRO = useResizeObserver((entries) => {
    // console.log('iframeRO', entries)
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
                padding-top: 16px;
                grid-template-columns: 16px auto 16px;
                grid-template-rows: auto 16px;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=);
              `}
            >
              <div
                ref={viewportRef}
                className={css`
                  grid-column: 2 / span 1;
                  grid-row: 1 / span 1;
                  position: relative;
                  flex: 1;
                  height: 100px;
                  min-height: 10px;
                `}
                style={{ width, height }}
              >
                <iframe
                  ref={iframeRef}
                  frameBorder="0"
                  src={src}
                  onLoad={() => {
                    if (height === undefined) {
                      const { height } = iframeRef.current.contentDocument.body.getBoundingClientRect();
                      setHeight(height);
                    }
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
                  grid-row: 1 / span 1;
                  cursor: pointer;

                  &:hover {
                    background: rgba(0, 0, 0, 0.1);
                  }
                `}
                onMouseDown={() => {
                  lock.current = "left";
                  iframeRef.current.style.userSelect = "none";
                  iframeRef.current.style.pointerEvents = "none";
                }}
              />
              <div
                className={css`
                  grid-column: 3 / span 1;
                  grid-row: 1 / span 1;
                  cursor: pointer;

                  &:hover {
                    background: rgba(0, 0, 0, 0.1);
                  }
                `}
                onMouseDown={() => {
                  lock.current = "right";
                  iframeRef.current.style.userSelect = "none";
                  iframeRef.current.style.pointerEvents = "none";
                }}
              />
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
            <figcaption
              style={{
                fontSize: "0.75rem",
                color: "#999",
                marginTop: 6,
                width: 0,
                marginLeft: 16,
                whiteSpace: "nowrap",
              }}
            >
              Source:{" "}
              <pageComponents.a href={src} target="_blank">
                {src}
              </pageComponents.a>
            </figcaption>
          </div>
        </div>
      </Root>
    </>
  );
}

export default React.forwardRef(Viewport);
