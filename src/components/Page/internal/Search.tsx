import * as React from "react";
import { css } from "linaria";
import { Node } from "../types";
import fuzzaldrin from "fuzzaldrin-plus";
import Link from "next/link";
import { useCombobox } from "downshift";
import { useRouter } from "next/router";

interface Props {
  toc: Node[];
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
            <div
              className={css`
                display: flex;
                align-items: center;
                border: none;
                padding: 0px 16px;
                width: 100%;
                background: transparent;
                font-size: 18px;
                line-height: inherit;
                height: 52px;
                flex-grow: 0;
                flex-shrink: 0;
                z-index: 1;
                box-shadow: rgba(55, 53, 47, 0.09) 0px 1px 0px;
              `}
            >
              <svg
                viewBox="0 0 17 17"
                className={css`
                  width: 18px;
                  height: 18px;
                  display: block;
                  fill: rgba(55, 53, 47, 0.4);
                  flex-shrink: 0;
                  backface-visibility: hidden;
                  margin-right: 10px;
                  flex-grow: 0;
                `}
              >
                <path d="M6.78027 13.6729C8.24805 13.6729 9.60156 13.1982 10.709 12.4072L14.875 16.5732C15.0684 16.7666 15.3232 16.8633 15.5957 16.8633C16.167 16.8633 16.5713 16.4238 16.5713 15.8613C16.5713 15.5977 16.4834 15.3516 16.29 15.1582L12.1504 11.0098C13.0205 9.86719 13.5391 8.45215 13.5391 6.91406C13.5391 3.19629 10.498 0.155273 6.78027 0.155273C3.0625 0.155273 0.0214844 3.19629 0.0214844 6.91406C0.0214844 10.6318 3.0625 13.6729 6.78027 13.6729ZM6.78027 12.2139C3.87988 12.2139 1.48047 9.81445 1.48047 6.91406C1.48047 4.01367 3.87988 1.61426 6.78027 1.61426C9.68066 1.61426 12.0801 4.01367 12.0801 6.91406C12.0801 9.81445 9.68066 12.2139 6.78027 12.2139Z"></path>
              </svg>
              <input
                autoFocus
                {...getInputProps()}
                className={css`
                  font-size: inherit;
                  line-height: inherit;
                  border: none;
                  background: none;
                  width: 100%;
                  display: block;
                  resize: none;
                  padding: 0px;
                  min-width: 0px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;

                  color: #383838;

                  &:focus {
                    outline: 0;
                  }
                `}
              />
            </div>
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
                  <div
                    role="button"
                    className={css`
                      display: flex;
                      align-items: center;
                      line-height: 120%;
                      width: 100%;
                      user-select: none;
                      min-height: 36px;
                      font-size: 14px;
                      padding-top: 8px;
                      padding-bottom: 8px;
                      padding-left: 14px;
                      cursor: pointer;

                      &:hover {
                        background: rgba(0, 0, 0, 0.05);
                      }
                    `}
                    style={{
                      background: highlightedIndex === index ? "rgba(0, 0, 0, 0.05)" : undefined
                    }}
                    {...getItemProps({ item, index })}
                  >
                    <Highlight string={item.path} query={value} />
                  </div>
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
