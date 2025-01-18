import { css } from "@linaria/core";
import { useResizeObserverEntry } from "timvir/hooks";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  url: string;
}

function Figma(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { url, ...rest } = props;

  const [roRef, roe] = useResizeObserverEntry();

  return (
    <Root ref={ref} {...rest}>
      <div
        ref={roRef}
        className={css`
          position: relative;

          &::before {
            display: block;
            content: "";
            padding-top: 75%;
          }
        `}
      >
        <iframe
          className={css`
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            transition: opacity 0.2s;
          `}
          style={{ height: roe?.contentRect.height || 100 }}
          frameBorder="0"
          allowFullScreen
          src={`https://www.figma.com/embed?embed_host=timvir&url=${encodeURIComponent(url)}`}
        />
      </div>
    </Root>
  );
}

export default React.forwardRef(Figma);
