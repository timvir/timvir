import * as React from "react";
import { send, useContext } from "../../Page/context";

export default function Sample() {
  const context = useContext();

  return (
    <div style={{ margin: "20px 0", display: "flex", gap: 10 }}>
      <button
        onClick={() => {
          send(context, "code-1", { type: "MERGE", props: { children: "foo();\nbar();" } });
        }}
      >
        change code
      </button>
      <button
        onClick={() => {
          send(context, "code-1", { type: "MERGE", props: { highlightedLines: [7] } });
        }}
      >
        change highlighted lines
      </button>
    </div>
  );
}
