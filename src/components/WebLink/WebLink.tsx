import * as React from "react";
import { cx, css } from "@linaria/core";
import { useContext } from "@timvir/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "a";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  url: string;
}

function WebLink(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { url, className, ...rest } = props;

  const [metadata, setMetadata] = React.useState(undefined);

  const {
    unfurl = async function unfurl(url: string) {
      return fetch(`https://timvir.now.sh/api/unfurl?url=${encodeURIComponent(url)}`).then((res) => res.json());
    },
  } = useContext().blocks?.WebLink ?? {};

  React.useEffect(() => {
    unfurl(url).then(setMetadata);
  }, [url, setMetadata]);

  const image = metadata?.open_graph?.images?.[0]?.url;

  return (
    <Root
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className={cx(
        className,
        css`
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
        `
      )}
    >
      <div
        className={css`
          flex: 4 1 180px;
          padding: 12px 14px 14px;
        `}
      >
        <div
          className={css`
            color: rgb(55, 53, 47);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 24px;
            margin-bottom: 6px;
          `}
        >
          {metadata?.title}
        </div>
        <div
          className={css`
            font-size: 0.75rem;
            line-height: 1.1rem;
            color: rgba(55, 53, 47, 0.6);
            height: 2.2rem;
            overflow: hidden;
          `}
        >
          {metadata?.description}
        </div>
        <div
          className={css`
            margin-top: 12px;
            display: flex;
          `}
        >
          <img
            style={{ opacity: metadata?.favicon ? 1 : 0 }}
            className={css`
              width: 1rem;
              height: 1rem;
              min-width: 1rem;
              margin-right: 6px;
            `}
            src={metadata?.favicon}
          />
          <div
            className={css`
              font-size: 0.75rem;
              line-height: 1rem;
              color: rgb(55, 53, 47);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {metadata ? url : null}
          </div>
        </div>
      </div>
      {image && (
        <div
          className={css`
            flex: 1 1 180px;
            position: relative;
          `}
        >
          <img
            className={css`
              display: block;
              object-fit: cover;
              border-radius: 0 3px 3px 0;
              width: calc(100% - 2px);
              height: calc(100% - 2px);
              position: absolute;
              top: 1px;
              left: 1px;
            `}
            src={image}
          />
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(WebLink);
