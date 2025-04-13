import * as builtins from "timvir/builtins";
import { Code } from "timvir/blocks";

export function useMDXComponents() {
  return {
    ...builtins,

    pre: function pre(props: any) {
      const [, language = "markdown"] =
        (props.className ?? props.children?.props?.className ?? "").match(/^language-(.*)$/) || [];

      return <Code language={language}>{props.children?.props?.children ?? props.children ?? ""}</Code>;
    },
  };
}
