import * as React from "react";
import { send, useContext } from "../../Page/context";

export default function Sample() {
  const context = useContext();

  return (
    <>
      <button
        onClick={() => {
          send(context, "code-1", { type: "MERGE", props: { children: "foo();\nbar();" } });
        }}
      >
        click me
      </button>
      <button
        onClick={() => {
          send(context, "code-1", { type: "MERGE", props: { highlightedLines: [1] } });
        }}
      >
        click me
      </button>
    </>
  );
}
