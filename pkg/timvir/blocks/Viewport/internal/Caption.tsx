import { useArticleComponents } from "timvir/core";
import { layoutStyles } from "../../../core/layout";
import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import * as Icons from "react-feather";
import { Code } from "timvir/blocks";

interface Props {
  src: string;
  code?: string;
}

function Caption(props: Props) {
  const components = useArticleComponents();

  const { src, code } = props;

  const [codeRef, setCodeRef] = React.useState<null | HTMLDivElement>(null);

  return (
    <>
      <figcaption {...stylex.props(layoutStyles.block, styles.figcaption)}>
        <div>
          Source:{" "}
          <components.a href={src} target="_blank">
            {src}
          </components.a>
        </div>

        {code && (
          <div
            {...stylex.props(styles.codeToggle)}
            onClick={() => {
              if (codeRef) {
                const infoParent = codeRef.parentElement!;

                if (infoParent.style.height === "0px") {
                  infoParent.style.height = `${codeRef.getBoundingClientRect().height}px`;
                  infoParent.style.opacity = "1";
                } else {
                  infoParent.style.height = "0px";
                  infoParent.style.opacity = "0";
                }
              }
            }}
          >
            <Icons.Code size={"1.6em"} {...stylex.props(styles.codeIcon)} />
          </div>
        )}
      </figcaption>

      {code && (
        <div {...stylex.props(styles.codeContainer)}>
          <div ref={setCodeRef} {...stylex.props(styles.codeRefWrapper)}>
            <Code language="jsx">{code}</Code>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Caption);

const styles = stylex.create({
  figcaption: {
    fontSize: "0.8125rem",
    lineHeight: 1.1875,
    color: "var(--timvir-secondary-text-color)",
    whiteSpace: "nowrap",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codeToggle: {
    cursor: "pointer",
    ":hover": {
      color: "var(--c-p-4)",
      opacity: 1,
    },
  },
  codeIcon: {
    display: "block",
  },
  codeContainer: {
    overflow: "hidden",
    transition: "height 0.2s, opacity 0.2s 0.1s",
    height: 0,
    opacity: 0,
  },
  codeRefWrapper: {
    marginTop: "12px",
  },
});
