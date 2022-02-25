import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxjs } from "micromark-extension-mdxjs";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { remarkPlugin } from "./index.js";

const doc = `
import { Exhibit } from "@timvir/blocks";

# Heading

before

<Sample variant="basic" props={{ variant: "info" }} color="black" {...spread} />

after
`;

const tree = fromMarkdown(doc, {
  extensions: [mdxjs()],
  mdastExtensions: [mdxFromMarkdown()],
});

remarkPlugin()(tree, { history: ["path/to/docs.mdx"] });

console.log(tree);

const out = toMarkdown(tree, { extensions: [mdxToMarkdown()] });

console.log(out);
