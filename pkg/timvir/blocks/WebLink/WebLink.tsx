"use client";

import { cx } from "@linaria/core";
import stylex from "@stylexjs/stylex";
import * as React from "react";
import { useContext } from "timvir/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "a";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  url: string;
}

function WebLink(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { url, className, ...rest } = props;

  const [state, setState] = React.useState({
    settled: false,
    metadata: undefined as any,
  });

  const { unfurl = defaultUnfurl } = useContext().blocks?.WebLink ?? {};

  React.useEffect(() => {
    unfurl(url).then((metadata) => {
      setState({
        settled: true,
        metadata: metadata,
      });
    });
  }, [unfurl, url]);

  const metadata = state.metadata;
  const image = metadata?.open_graph?.images?.[0]?.url;

  const rootStyleProps = stylex.props(styles.root);

  return (
    <Root
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      {...rootStyleProps}
      className={cx("timvir-b-WebLink", !state.settled && "timvir-unsettled", className, rootStyleProps.className)}
      style={{ margin: "1em 0", ...rootStyleProps.style, ...rest.style }}
    >
      <div {...stylex.props(styles.text)}>
        <div {...stylex.props(styles.title)}>{metadata?.open_graph?.title ?? metadata?.title ?? <>&nbsp;</>}</div>
        <div {...stylex.props(styles.description)}>{metadata?.open_graph?.description ?? metadata?.description}</div>
        <div {...stylex.props(styles.url)}>
          <img
            {...stylex.props(styles.favicon)}
            style={{ opacity: metadata?.favicon ? 1 : 0 }}
            src={metadata?.favicon}
          />
          <div>{metadata ? url : null}</div>
        </div>
      </div>
      {image && (
        <div {...stylex.props(styles.imageContainer)}>
          <img {...stylex.props(styles.image)} src={image} />
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(WebLink);

const styles = stylex.create({
  root: {
    transition: "all 0.16s",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--timvir-border-color)",
    backgroundColor: "var(--timvir-secondary-background-color)",
    borderRadius: "3px",
    display: "flex",
    cursor: "pointer",
    textDecoration: "none",

    ":hover": {
      borderColor: "var(--timvir-text-color)",
      backgroundColor: "var(--timvir-sidebar-highlight-color)",
    },
    ":active": {
      borderColor: "var(--timvir-text-color)",
      backgroundColor: "var(--timvir-sidebar-highlight-color)",
    },
  },

  text: {
    flex: "4 1 180px",
    padding: "12px 14px 14px",
    minWidth: 0,
  },

  title: {
    color: "var(--timvir-text-color)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minHeight: "24px",
    marginBottom: "6px",
  },

  description: {
    fontSize: "0.75rem",
    lineHeight: "1.1rem",
    color: "var(--timvir-secondary-text-color)",
    height: "2.2rem",
    overflow: "hidden",
  },

  url: {
    marginTop: "12px",
    display: "flex",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    color: "var(--timvir-text-color)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  favicon: {
    width: "1rem",
    height: "1rem",
    minWidth: "1rem",
    marginRight: "6px",
  },

  imageContainer: {
    flex: "1 1 180px",
    position: "relative",
    minWidth: "180px",
  },

  image: {
    display: "block",
    objectFit: "cover",
    borderRadius: "0 3px 3px 0",
    width: "calc(100% - 2px)",
    height: "calc(100% - 2px)",
    position: "absolute",
    top: "1px",
    left: "1px",
  },
});

async function defaultUnfurl(url: string) {
  return fetch(`https://timvir.vercel.app/api/unfurl?url=${encodeURIComponent(url)}`).then((res) => res.json());
}
