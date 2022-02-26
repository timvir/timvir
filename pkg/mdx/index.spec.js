import test from "ava";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { remarkPlugin } from "./index.js";

function process(doc) {
  const tree = fromMarkdown(doc, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  });

  remarkPlugin()(tree, { history: [`test/samples/index.mdx`] });

  return tree;
}

test("Sample variant=basic", (t) => {
  const tree = process(`<Sample variant="basic" />`);

  t.is(tree.type, "root");

  t.is(tree.children.at(0).type, "mdxjsEsm");

  t.is(tree.children.at(1).type, "mdxJsxFlowElement");
  t.is(tree.children.at(1).name, "CIBEfJwpOCZBzAhgVmaaNZUkovAEFETME");
});

test("Sample variant=basic props={{ variant }}", (t) => {
  const tree = process(`<Sample variant="basic" props={{ extra: 1 }} />`);

  t.is(tree.type, "root");

  t.is(tree.children.at(0).type, "mdxjsEsm");

  t.is(tree.children.at(1).type, "mdxJsxFlowElement");
  t.is(tree.children.at(1).name, "CIBEfJwpOCZBzAhgVmaaNZUkovAEFETME");

  t.is(tree.children.at(1).attributes.at(0).type, "mdxJsxExpressionAttribute");
  t.is(tree.children.at(1).attributes.at(0).value, "...{ extra: 1 }");
});
