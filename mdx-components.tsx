import { Code } from "timvir/blocks";
import * as builtins from "timvir/builtins";

const overrides = {
  /**
   * The default style of a `pre` block in Timvir is… unstyled. We override
   * the component with the `Code` component from `timvir/blocks`, to
   * enable syntax highlighting and other features.
   */
  pre: function pre(props: any) {
    const [, language = "markdown"] =
      (props.className ?? props.children?.props?.className ?? "").match(/^language-(.*)$/) || [];

    return <Code language={language}>{props.children?.props?.children ?? props.children ?? ""}</Code>;
  },
};

const mdxComponents = {
  ...builtins,
  ...overrides,
};

/**
 * This function defines the set of MDX components that are made available
 * to *.mdx files that are loaded by Next.js.
 *
 * Despite its name, this function (in its current form) is not a React
 * Hook. It can be used from React Server Components (which we currently
 * don't use, but may in the near future).
 */
export function useMDXComponents() {
  return mdxComponents;
}
