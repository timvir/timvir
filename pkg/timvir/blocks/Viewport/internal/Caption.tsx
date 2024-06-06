import { css, cx } from "@linaria/core";
import { useMDXComponents } from "@mdx-js/react";
import { Code } from "timvir/blocks";
import * as React from "react";
import * as Icons from "react-feather";

interface Props {
  src: string;
  code?: string;
}

function Caption(props: Props) {
  const components = { a: "a", ...useMDXComponents() };

  const { src, code } = props;

  const [codeRef, setCodeRef] = React.useState<null | HTMLDivElement>(null);

  return (
    <>
      <figcaption
        className={css`
          font-size: 0.8125rem;
          line-height: 1.1875;
          color: var(--timvir-secondary-text-color);
          white-space: nowrap;

          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div>
          Source:{" "}
          <components.a href={src} target="_blank">
            {src}
          </components.a>
        </div>

        {code && (
          <div
            className={css`
              cursor: pointer;
              &:hover {
                color: var(--c-p-4);
                opacity: 1;
              }

              & > svg {
                display: block;
              }
            `}
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
            <Icons.Code size={"1.6em"} />
          </div>
        )}
      </figcaption>

      {code && (
        <div
          className={cx(
            css`
              overflow: hidden;
              transition: height 0.2s, opacity 0.2s 0.1s;
            `
          )}
          style={{ height: 0, opacity: 0 }}
        >
          <div
            ref={setCodeRef}
            className={cx(
              css`
                margin-top: 12px;
              `
            )}
          >
            <Code language="jsx">{code}</Code>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Caption);
