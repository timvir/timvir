import { useMDXComponents } from "@mdx-js/react";
import { useContext } from "@timvir/core";
import { send } from "@timvir/core/bus";
import * as React from "react";

export default function Sample({ language, children }: any) {
  const context = useContext();

  const components = { a: "a", ...useMDXComponents() };

  return (
    <components.a
      href="#"
      role="button"
      onClick={() => {
        send(context.bus, "code-1", "merge", {
          highlightedLines: undefined,
          language,
          children: code[language as any as keyof typeof code],
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
};
