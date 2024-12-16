"use client";

import { css, cx } from "@linaria/core";
import { fullWidth, useBlock } from "timvir/core";
import { useResizeObserver, useResizeObserverEntry } from "timvir/hooks";
import * as React from "react";
import { Caption, Handle, Ruler } from "./internal";
import { useImmer } from "use-immer";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  /**
   * URL that should be loaded in the viewport. Can be absolute or relative.
   */
  src: string;

  /**
   * TODO: Document
   */
  code?: string;
}

function Viewport(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const block = useBlock(props);

  const { src, code, className, ...rest } = block.props;

  const [state, mutate] = useImmer({
    settled: false,
  });

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
  const [maxHeight, setMaxHeight] = React.useState<undefined | number>(undefined);

  const [width, setWidth] = React.useState<undefined | number>(undefined);
  React.useEffect(() => {
    if (width === undefined && svgROE) {
      setWidth(svgROE.contentRect.width);
    } else if (svgROE) {
      const max = svgROE.contentRect.width - 2 * (56 + 8 + 8);
      if (width !== undefined && width > max) {
        setWidth(max);
      }
    }
  }, [containerROE, svgROE, setWidth, width]);

  const lock = React.useRef("");
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const onMouseMove = (ev: MouseEvent) => {
      if (lock.current && svgROE) {
        ev.preventDefault();
        const max = svgROE.contentRect.width - 2 * (56 + 8 + 8);
        setWidth((width) =>
          Math.min(max, Math.max(320, (width ?? 0) + 2 * ev.movementX * ({ left: -1, right: 1 }[lock.current] ?? 1)))
        );
      }
    };

    const onMouseUp = () => {
      lock.current = "";
      iframeRef.current!.style.userSelect = "";
      iframeRef.current!.style.pointerEvents = "";

      setHeight((height) => {
        setMaxHeight(height);
        return height;
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [svgROE]);

  const iframeRO = useResizeObserver((entries) => {
    const height = entries[entries.length - 1].contentRect.height;
    setHeight(height);
    setMaxHeight(Math.max(height, maxHeight ?? 0));
  });

  /*
   * Note this useEffect runs on each render. This is fine beause it doesn't do any
   * expensive computation, and the Viewport component only re-renders when the iframe
   * itself changes height or the user resizes the width of the Viewport.
   */
  React.useEffect(() => {
    const document = iframeRef.current?.contentDocument;
    if (document) {
      injectStyle(document);

      /*
       * The <body> element of the iframe document is the one which we observe and
       * measure. It should not have any margins (we remove them by injecting a simple
       * style reset into the iframe document).
       */
      iframeRO.observe(document.body);
    }
  });

  /*
   * Inject a simple style reset into the document.
   */
  function injectStyle(document: Document): void {
    if (document.querySelector("style#timvir-viewport-style")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "timvir-viewport-style";
    style.innerHTML = "body { margin: 0 }";
    document.head.appendChild(style);
  }

  /*
   * 20ms after the height has been set, we consider this block settled. This
   * time includes the 16ms CSS transition time, and a tiny bit more to allow
   * for the content in the iframe itself to finish rendering.
   */
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      mutate((draft) => {
        draft.settled = true;
      });
    }, 20);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [mutate, height]);

  return (
    <>
      <div ref={containerRef} />
      <Root
        ref={ref}
        {...rest}
        className={cx(
          "timvir-b-Viewport",
          !state.settled && "timvir-unsettled",
          className,
          fullWidth,
          css`
            contain: layout;
            margin-bottom: 0;
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
              font-variant-numeric: tabular-nums;
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
                          background-position: -60vw 0;
                        }
                        40% {
                          background-position: 85vw 0;
                        }
                        100% {
                          background-position: 85vw 0;
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
                    const document = ev.currentTarget.contentDocument;
                    if (document) {
                      injectStyle(document);

                      const { height } = document.body.getBoundingClientRect();
                      setHeight(height);
                      setMaxHeight(height);
                    }
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

      <Caption src={src} code={code} />

      <div style={{ height: (maxHeight ?? 0) - (height ?? 0), transition: "height 0.16s" }} />
    </>
  );
}

export default React.forwardRef(Viewport);
