import { useCombobox } from "downshift";
import fuzzaldrin from "fuzzaldrin-plus";
import { css } from "linaria";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SearchBoxInput } from "../../SearchBoxInput";
import { SearchBoxListItem } from "../../SearchBoxListItem";
import { Node } from "../types";

interface Props {
  toc: ReadonlyArray<Node>;
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

function Search({ toc }: Props) {
  const router = useRouter();

  const [value, setValue] = React.useState("");

  const preparedQuery = fuzzaldrin.prepareQuery(value);
  const items = toc
    .flatMap(n => flatten(n))
    .map(n => ({
      ...n,
      score: fuzzaldrin.score(n.path, value, {
        preparedQuery
      })
    }))
    .filter(n => (value ? n.score > 0 : true))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const { getMenuProps, getInputProps, highlightedIndex, getItemProps, closeMenu } = useCombobox({
    defaultHighlightedIndex: 0,
    items,
    itemToString: item => (item ? item.path : ""),
    onInputValueChange: ({ inputValue }) => {
      setValue(inputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        router.push(selectedItem.path);
      }
      closeMenu();
    }
  });

  return (
    <div
      className={css`
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
        color: #383838;
      `}
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
                <Link href={item.path}>
                  <SearchBoxListItem
                    {...getItemProps({ item, index })}
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
                    label={<Highlight string={item.path} query={value} />}
                    context="Page"
                    style={{
                      background: highlightedIndex === index ? "rgba(0, 0, 0, 0.05)" : undefined
                    }}
                  />
                </Link>
              ))}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

interface HighlightProps {
  string: string;
  query: string;
}

const Highlight = ({ string, query }: HighlightProps) => {
  const match = fuzzaldrin.wrap(string, query);
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: match.length === 0 ? string : match
      }}
    />
  );
};
