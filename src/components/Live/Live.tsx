import { css } from "@linaria/core";
import theme from "prism-react-renderer/themes/github";
import * as React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { Exhibit } from "../Exhibit";
import { Swatch } from "../Swatch";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Live({ ...props }: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  return (
    <Root ref={ref} {...props}>
      <LiveProvider theme={theme} code={`<Swatch value="#ff5511" contrastValue="white" />`} scope={{ Swatch }}>
        <Exhibit
          bleed={8}
          className={css`
            margin-bottom: 12px;
          `}
        >
          <LivePreview />
        </Exhibit>

        <LiveEditor
          className={css`
            margin: -8px;
            & textarea:focus {
              outline: none;
            }
          `}
        />

        <LiveError />
      </LiveProvider>
    </Root>
  );
}

export default React.forwardRef(Live);
