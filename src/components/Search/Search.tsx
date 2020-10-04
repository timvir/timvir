import { useCombobox } from "downshift";
import fuzzaldrin from "fuzzaldrin-plus";
import { css, cx } from "linaria";
import Link from "next/link";
import React from "react";
import { Node } from "../Page";
import { SearchBoxInput } from "../SearchBoxInput";
import { SearchBoxListItem } from "../SearchBoxListItem";
import { Highlight } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  location: { asPath: string; push: (path: string) => void };
  Link: typeof Link;

  open?: boolean;
  onClose?: (ev: React.SyntheticEvent<HTMLElement>) => void;

  q: (
    query: string
  ) => Promise<{
    totalCount: number;
    edges: Array<{ node: { path: string; label: string; context?: string } }>;
  }>;
}

function Search(props: Props, ref: any /* FIXME */) {
  const { location, Link, open, onClose, q, className, ...rest } = props;

  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState<
    | undefined
    | {
        totalCount: number;
        edges: Array<{ node: { path: string; label: string; context?: string } }>;
      }
  >(undefined);

  React.useEffect(() => {
    q(value).then((result) => {
      setResult(result);
    });
  }, [value, q, setResult]);

  const items = result?.edges ?? [];

  const { getMenuProps, getInputProps, highlightedIndex, getItemProps, closeMenu } = useCombobox({
    defaultHighlightedIndex: 0,
    items,
    itemToString: (item) => (item ? item.node.label : ""),
    onInputValueChange: ({ inputValue }) => {
      setValue(inputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        location.push(selectedItem.node.path);
      }
      closeMenu();
    },
  });

  if (!open) {
    return null;
  }

  return (
    <Root
      ref={ref}
      {...rest}
      className={cx(
        className,
        css`
          position: fixed;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          z-index: 999;
          pointer-events: none;
          overflow: hidden;

          font-family: "Menlo", "Meslo LG", monospace;
          font-feature-settings: "liga", "kern";
          text-rendering: optimizelegibility;
          font-size: 14px;
          line-height: 1.725;
          color: var(--c-text);
        `
      )}
    >
      <div
        className={css`
          pointer-events: auto;
          position: relative;
          z-index: 0;
        `}
      >
        <div
          className={css`
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0px;
            left: 0px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            pointer-events: auto;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              bottom: 0px;
              right: 0px;
              background: rgba(15, 15, 15, 0.6);
            `}
            onClick={onClose}
          />

          <div
            className={css`
              position: relative;
              z-index: 1;
              box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 5px 10px,
                rgba(15, 15, 15, 0.2) 0px 15px 40px;
              border-radius: 3px;
              background: white;
              top: 90px;
              overflow: hidden;
              width: 75%;
              max-width: 600px;
              min-height: 50px;
              max-height: 80vh;
            `}
          >
            <SearchBoxInput {...getInputProps()} />
            <main
              {...getMenuProps()}
              className={css`
                width: 100%;
                height: 100%;
                overflow: hidden auto;
              `}
            >
              {items.map((item, index) => (
                <Link href={item.node.path}>
                  <SearchBoxListItem
                    {...getItemProps({ item, index, onClick: onClose })}
                    icon={
                      <svg x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
                        <g fill="none" stroke="#444" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}>
                          <path data-color="color-2" d="M4.5 11.5L11.5 11.5" />
                          <path data-color="color-2" d="M4.5 8.5L11.5 8.5" />
                          <path data-color="color-2" d="M4.5 5.5L6.5 5.5" />
                          <path d="M9.5 0.5L1.5 0.5 1.5 15.5 14.5 15.5 14.5 5.5z" />
                          <path d="M9.5 0.5L9.5 5.5 14.5 5.5" />
                        </g>
                      </svg>
                    }
                    label={<Highlight string={item.node.path} query={value} />}
                    context={item.node.context}
                    style={{
                      background: highlightedIndex === index ? "rgba(0, 0, 0, 0.05)" : undefined,
                    }}
                  />
                </Link>
              ))}
            </main>
          </div>
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Search);

export function defaultSearch(toc: readonly Node[]) {
  return {
    q: async (query: string) => {
      const preparedQuery = fuzzaldrin.prepareQuery(query);
      const items = toc
        .flatMap((n) => flatten(n))
        .map((n) => ({
          ...n,
          score: fuzzaldrin.score(n.path, query, {
            preparedQuery,
          }),
        }))
        .filter((n) => (query ? n.score > 0 : true))
        .sort((a, b) => b.score - a.score);

      return {
        totalCount: items.length,
        edges: items.slice(0, 10).map((e) => ({
          node: {
            path: e.path,
            label: e.path,
            context: "Page",
          },
        })),
      };
    },
  };
}

function flatten(n: Node): Array<{ label: string; path: string }> {
  let ret: Array<{ label: string; path: string }> = [];

  if (n.path) {
    ret.push({ label: n.label, path: n.path });
  }

  if (n.children) {
    ret = [...ret, ...n.children.flatMap(flatten)];
  }

  return ret;
}
