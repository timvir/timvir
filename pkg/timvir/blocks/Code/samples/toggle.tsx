import * as builtins from "timvir/builtins";
import { useContext } from "timvir/context";
import { send } from "timvir/bus";
import * as React from "react";

export default function Sample({ language, children }: any) {
  const context = useContext();

  const components = { ...builtins, ...useContext().mdxComponents };

  return (
    <components.a
      href="#"
      role="button"
      onClick={(ev: React.SyntheticEvent) => {
        ev.preventDefault();
        send(context.bus, "code", "merge", {
          highlightedLines: undefined,
          language,
          children: code[language as any as keyof typeof code],
          caption: null,
        });
      }}
    >
      {children}
    </components.a>
  );
}

const code = {
  javascript: "function foo() {\n  const answer = 42;\n}",
  markdown: "# Lorem\n\nipsum dolor",
  html: `<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>

<p>My first paragraph.</p>

</body>
</html>
  `,
  haskell: `primes = filterPrime [2..]
where filterPrime (p:xs) =
        p : filterPrime [x | x <- xs, x \`mod\` p /= 0]`,
  css: `.gwbiq5k>:not(.nnbogi4) {
    grid-column: lc/rc;
    min-width: 0;
}`,
};
