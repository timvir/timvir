import { mdx } from "@mdx-js/react";
import { send, useContext } from "../../Page/context";

export default function Sample({ language, children }) {
  const context = useContext();

  return mdx(
    "a",
    {
      href: "#",
      role: "button",
      onClick: () => {
        send(context, "code-1", "merge", {
          highlightedLines: undefined,
          language,
          children: code[language],
        });
      },
    },
    children
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
