/**
 * This is documentation for the Code component.
 */

import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React from "react";
import { css, cx } from "linaria";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "pre";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentPropsWithoutRef<typeof Component> {
  /**
   * The code that should be highlighted.
   */
  children: string;

  /**
   * Language in which the code is.
   *
   * @default "markup"
   */
  language?: Language;
}

function Code({ children, language, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Highlight {...defaultProps} code={children.trim()} language={language ?? "markup"}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Component
          ref={ref}
          {...props}
          className={cx(
            className,
            css`
              border-radius: 3px;
              padding: 16px 24px;
              margin: 0;
            `
          )}
          style={style}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Component>
      )}
    </Highlight>
  );
}

export default React.forwardRef(Code);
