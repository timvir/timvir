"use client";

import { cx } from "../../internal/cx";
import { useArticleComponents } from "timvir/core";
import { layoutStyles } from "../../core/layout";
import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  name: string;
  font: { style?: React.CSSProperties; className?: string };
  info?: React.ReactNode;
}

function Font(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const components = useArticleComponents();

  const { name, font, info, children, ...rest } = props;

  const [contentRef, setContentRef] = React.useState<null | HTMLDivElement>(null);
  const [fontSizeRef, setFontSizeRef] = React.useState<null | HTMLSpanElement>(null);
  const [infoRef, setInfoRef] = React.useState<null | HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef) {
      const computedStyle = window.getComputedStyle(contentRef);

      const intervalId = setInterval(() => {
        if (fontSizeRef) {
          const fontSize = Number.parseInt(computedStyle.fontSize, 10);
          const lineHeight = Number.parseInt(computedStyle.lineHeight, 10);

          const innerText = `${name} – ${Math.round(fontSize)}px / ${
            Math.round((lineHeight / fontSize) * 1000) / 1000
          }`;
          if (fontSizeRef.innerText !== innerText) {
            fontSizeRef.innerText = innerText;
          }
        }
      }, 250);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [name, contentRef, fontSizeRef]);

  const rootStyleProps = stylex.props(layoutStyles.block);
  const fontStyleProps = stylex.props(styles.fontSample);

  return (
    <Root
      ref={ref}
      {...rest}
      {...rootStyleProps}
      className={cx(rest.className, rootStyleProps.className)}
      style={{ ...rootStyleProps.style, ...rest.style }}
    >
      <div {...stylex.props(styles.meta)}>
        <components.h3 {...stylex.props(styles.h3)}>
          <span ref={setFontSizeRef}>{name}</span>
        </components.h3>

        {info && (
          <div
            {...stylex.props(styles.infoButton)}
            onClick={() => {
              if (infoRef && contentRef) {
                // const contentParent = contentRef.parentElement;
                const infoParent = infoRef.parentElement!;

                if (infoParent.style.height === "0px") {
                  infoParent.style.height = `${infoRef.getBoundingClientRect().height}px`;
                  infoParent.style.opacity = "1";

                  // contentParent.style.height = "0px";
                  // contentParent.style.opacity = "0";
                } else {
                  infoParent.style.height = "0px";
                  infoParent.style.opacity = "0";

                  // contentParent.style.height = window.getComputedStyle(contentRef).height;
                  // contentParent.style.opacity = "1";
                }
              }
            }}
          >
            <Icons.Info size={"1.1em"} {...stylex.props(styles.infoButtonIcon)} />
          </div>
        )}
      </div>
      <div {...stylex.props(styles.contentWrapper)}>
        {info && (
          <div {...stylex.props(styles.collapsibleContainer)} style={{ height: 0, opacity: 0 }}>
            <div ref={setInfoRef} {...stylex.props(styles.infoContent)}>
              {info}
            </div>
          </div>
        )}
        <div {...stylex.props(styles.collapsibleContainer)} style={{ height: "auto", opacity: 1 }}>
          <div
            ref={setContentRef}
            contentEditable
            spellCheck="false"
            {...fontStyleProps}
            className={cx(fontStyleProps.className, font.className)}
            style={{ ...fontStyleProps.style, ...font.style }}
          >
            {children || "The quick brown fox jumps over the lazy dog"}
          </div>
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Font);

const styles = stylex.create({
  meta: {
    display: "flex",
    alignItems: "baseline",

    fontSize: "0.9rem",
    fontWeight: "bold",

    transition: "all 0.2s",
  },

  h3: {
    margin: "0 auto 0 0",
  },

  infoButton: {
    cursor: "pointer",

    ":hover": {
      color: "var(--c-p-4)",
      opacity: 1,
    },
  },

  infoButtonIcon: {
    position: "relative",
    top: 2,
  },

  contentWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  collapsibleContainer: {
    overflow: "hidden",
    transition: "height 0.2s, opacity 0.2s 0.1s",
  },

  infoContent: {
    padding: "0 0 16px",
  },

  fontSample: {
    outline: "none",
    userSelect: "text",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
  },
});
