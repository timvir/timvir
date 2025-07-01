import * as React from "react";
import { Code } from "timvir/blocks";
import * as builtins from "timvir/builtins";

const mdxComponents = {
  pre: function pre(props: any) {
    const [, language = "markdown"] =
      (props.className ?? props.children?.props?.className ?? "").match(/^language-(.*)$/) || [];

    return <Code language={language}>{props.children?.props?.children ?? props.children ?? ""}</Code>;
  },
};

/**
 * This function defines the set of MDX components that are made available to *.mdx files
 * that are loaded by Next.js.
 *
 * Despite its name, this function is not a React Hook. It can be used from React Server
 * Components (which we currently don't use, but may in the near future).
 */
export function useMDXComponents() {
  return {
    ...builtins,
    ...mdxComponents,
  };
}
