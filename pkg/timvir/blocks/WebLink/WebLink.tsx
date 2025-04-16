"use client";

import * as React from "react";
import { cx, css } from "@linaria/core";
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
  }, [url]);

  const metadata = state.metadata;
  const image = metadata?.open_graph?.images?.[0]?.url;

  return (
    <Root
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx("timvir-b-WebLink", !state.settled && "timvir-unsettled", className, classes.root)}
      {...rest}
    >
      <div className={classes.text}>
        <div className={classes.title}>{metadata?.open_graph?.title ?? metadata?.title ?? <>&nbsp;</>}</div>
        <div className={classes.description}>{metadata?.open_graph?.description ?? metadata?.description}</div>
        <div className={classes.url}>
          <img style={{ opacity: metadata?.favicon ? 1 : 0 }} className={classes.favicon} src={metadata?.favicon} />
          <div>{metadata ? url : null}</div>
        </div>
      </div>
      {image && (
        <div className={classes.imageContainer}>
          <img className={classes.image} src={image} />
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(WebLink);

const classes = {
  root: css`
    transition: all 0.16s;

    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2);
    border-radius: 3px;
    display: flex;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: rgba(55, 53, 47, 0.08);
      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.1),
        0 8px 24px rgba(16, 22, 26, 0.2);
    }
    &:active {
      background: rgba(55, 53, 47, 0.08);
      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 1px 1px rgba(16, 22, 26, 0.2);
    }

    :global(:root[data-timvir-theme="dark"]) & {
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      &:active {
        background: rgba(255, 255, 255, 0.08);
      }
    }
  `,

  text: css`
    flex: 4 1 180px;
    padding: 12px 14px 14px;
    min-width: 0;
  `,

  title: css`
    color: var(--timvir-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 24px;
    margin-bottom: 6px;
  `,
  description: css`
    font-size: 0.75rem;
    line-height: 1.1rem;
    color: var(--timvir-secondary-text-color);
    height: 2.2rem;
    overflow: hidden;
  `,

  url: css`
    margin-top: 12px;
    display: flex;

    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--timvir-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  favicon: css`
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
    margin-right: 6px;
  `,

  imageContainer: css`
    flex: 1 1 180px;
    position: relative;
    min-width: 180px;
  `,
  image: css`
    display: block;
    object-fit: cover;
    border-radius: 0 3px 3px 0;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: absolute;
    top: 1px;
    left: 1px;
  `,
};

async function defaultUnfurl(url: string) {
  return fetch(`https://timvir.vercel.app/api/unfurl?url=${encodeURIComponent(url)}`).then((res) => res.json());
}
