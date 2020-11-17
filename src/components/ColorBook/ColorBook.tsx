import React from "react";
import { css, cx } from "linaria";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  chapters: Array<{ values: Array<string> }>;
  selectedChapter?: number;
  onSelectChapter?: (i: number) => void;
}

function ColorBook({ chapters, selectedChapter, onSelectChapter, ...props }: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  return (
    <Root
      ref={ref}
      {...props}
      className={css`
        display: grid;
        grid-gap: 16px;
        grid-auto-columns: 1fr;
        align-items: start;
        width: 100%;
      `}
    >
      {chapters.map(({ values }, i) => (
        <div
          key={i}
          style={{ gridColumn: i + 1 }}
          className={cx(chapter, i === selectedChapter && activeChapter)}
          onClick={() => {
            if (onSelectChapter) {
              onSelectChapter(i);
            }
          }}
        >
          {values.map(value => (
            <div
              key={value}
              style={{ background: value }}
              className={css`
                flex-grow: 1;

                &:first-child {
                  border-radius: 3px 3px 0 0;
                }
                &:last-child {
                  border-radius: 0 0 3px 3px;
                }
              `}
            />
          ))}
        </div>
      ))}
    </Root>
  );
}

export default React.forwardRef(ColorBook);

const chapter = css`
  position: relative;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  height: 200px;

  &::before {
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border-radius: 4px;
    box-shadow: 0 0 0 0 rgba(19, 124, 189, 0);
    content: "";
    transition: all 0.16s cubic-bezier(0.4, 1, 0.75, 0.9);
  }

  &:hover::before {
    box-shadow: 0 0 0 2px #00000040;
    opacity: 1;
  }
`;

const activeChapter = css`
  &:hover::before,
  &::before {
    box-shadow: 0 0 0 2px #137cbd;
    opacity: 1;
  }
`;
