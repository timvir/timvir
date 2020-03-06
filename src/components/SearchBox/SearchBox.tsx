import { useCombobox } from "downshift";
import fuzzaldrin from "fuzzaldrin-plus";
import { css } from "linaria";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Node } from "../Page";
import { SearchBoxInput } from "../SearchBoxInput";
import { SearchBoxListItem } from "../SearchBoxListItem";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "div";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentProps<typeof Component> {
  toc: Node[];
}

function SearchBox({ toc, ...props }: Props, ref: any /* FIXME */) {
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
    <Component ref={ref} {...props}>
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
              label={<Highlight string={item.path} query={value} />}
              context="Page"
              style={{
                background: highlightedIndex === index ? "rgba(0, 0, 0, 0.05)" : undefined
              }}
            />
          </Link>
        ))}
      </main>
    </Component>
  );
}

export default React.forwardRef(SearchBox);

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
