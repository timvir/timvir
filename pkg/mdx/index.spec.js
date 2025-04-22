import test from "ava";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { remarkPlugin } from "./index.js";

async function process(doc) {
  const tree = fromMarkdown(doc, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  });

  await remarkPlugin()(tree, { history: ["test/samples/index.mdx"] });

  return tree;
}

test("Sample variant=basic", async (t) => {
  const tree = await process(`<Sample variant="basic" />`);

  t.is(tree.type, "root");

  t.is(tree.children.at(0).type, "mdxjsEsm");

  t.is(tree.children.at(1).type, "mdxJsxFlowElement");
  t.is(tree.children.at(1).name, "CIBEfJwpOCZBzAhgVmaaNZUkovAEFETME");
});

test("Sample variant=basic props={{ variant }}", async (t) => {
  const tree = await process(`<Sample variant="basic" props={{ extra: 1 }} />`);

  t.is(tree.type, "root");

  t.is(tree.children.at(0).type, "mdxjsEsm");

  t.is(tree.children.at(1).type, "mdxJsxFlowElement");
  t.is(tree.children.at(1).name, "CIBEfJwpOCZBzAhgVmaaNZUkovAEFETME");

  t.is(tree.children.at(1).attributes.at(0).type, "mdxJsxExpressionAttribute");
  t.is(tree.children.at(1).attributes.at(0).value, "...{ extra: 1 }");
});

test("Sample as inline", async (t) => {
  const tree = await process(`<Sample variant="basic" /> or <Sample variant="basic" />`);

  t.is(tree.type, "root");

  t.is(tree.children.at(0).type, "mdxjsEsm");

  t.is(tree.children.at(2).type, "paragraph");
  t.is(tree.children.at(2).children.at(0).type, "mdxJsxTextElement");
});
