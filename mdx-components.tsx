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

export function useMDXComponents() {
  return {
    ...builtins,
    ...mdxComponents,
  };
}
