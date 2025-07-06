import * as stylex from "@stylexjs/stylex";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  chapters: Array<Chapter>;
  selectedChapter?: number;
  onSelectChapter?: (i: number) => void;
}

interface Chapter {
  name?: string;
  values: Array<string>;
}

function ColorBook(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { chapters, selectedChapter, onSelectChapter, ...rest } = props;

  return (
    <Root ref={ref} {...rest} {...stylex.props(styles.root)}>
      {chapters.map(({ name, values }, i) => (
        <div key={i} style={{ gridColumn: i + 1 }}>
          <div
            {...stylex.props(styles.chapter, i === selectedChapter && styles.activeChapter)}
            onClick={() => {
              if (onSelectChapter) {
                onSelectChapter(i);
              }
            }}
          >
            {values.map((value, i) => (
              <div
                key={value}
                style={{ background: value }}
                {...stylex.props(
                  styles.colorValue,
                  i === 0 && styles.colorValueFirst,
                  i === values.length - 1 && styles.colorValueLast
                )}
              />
            ))}
          </div>
          {name && (
            <div {...stylex.props(styles.chapterName, i === selectedChapter && styles.activeChapterName)}>{name}</div>
          )}
        </div>
      ))}
    </Root>
  );
}

export default React.forwardRef(ColorBook);

const styles = stylex.create({
  root: {
    display: "grid",
    gridGap: "16px",
    gridAutoColumns: "1fr",
    alignItems: "start",
    width: "100%",
  },
  chapter: {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    height: "200px",
    "::before": {
      position: "absolute",
      top: "-2px",
      right: "-2px",
      bottom: "-2px",
      left: "-2px",
      borderRadius: "4px",
      boxShadow: "0 0 0 0 rgba(19, 124, 189, 0)",
      content: "",
      transition: "all 0.16s cubic-bezier(0.4, 1, 0.75, 0.9)",
    },
    ":hover::before": {
      boxShadow: "0 0 0 2px #00000040",
      opacity: 1,
    },
  },
  activeChapter: {
    ":hover::before": {
      boxShadow: "0 0 0 2px var(--c-p-5)",
      opacity: 1,
    },
    "::before": {
      boxShadow: "0 0 0 2px var(--c-p-5)",
      opacity: 1,
    },
  },
  colorValue: {
    flexGrow: 1,
  },
  colorValueFirst: {
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  },
  colorValueLast: {
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
  },

  chapterName: {
    textAlign: "center",
    fontSize: "0.75rem",
    color: "var(--timvir-secondary-text-color)",
    marginTop: "0.8em",
    lineHeight: "1",
  },
  activeChapterName: {
    color: "var(--timvir-text-color)",
  },
});
