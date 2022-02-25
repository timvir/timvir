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

<div>
  {'text'}
</div>

<div>
  <Sample variant="basic" component="../blocks/Arbitrary" as="source" />
</div>

after
`;

const tree = fromMarkdown(doc, {
  extensions: [mdxjs()],
  mdastExtensions: [mdxFromMarkdown()],
});

remarkPlugin()(tree, { history: [`${process.env.PWD}/index.mdx`] });

console.log(tree.children[5]);

const out = toMarkdown(tree, { extensions: [mdxToMarkdown()] });

console.log(out);
