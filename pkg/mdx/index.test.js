import { test } from "node:test";
import assert from "node:assert";
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

test("Sample variant=basic", async () => {
  const tree = await process(`<Sample variant="basic" />`);

  assert.strictEqual(tree.type, "root");

  assert.strictEqual(tree.children.at(0).type, "mdxjsEsm");

  assert.strictEqual(tree.children.at(1).type, "mdxJsxFlowElement");
  assert.strictEqual(tree.children.at(1).name, "CIBEfJwpOCZBzAhgVmaaNZUkovAEFETME");
});

test("Sample variant=basic props={{ variant }}", async () => {
  const tree = await process(`<Sample variant="basic" props={{ extra: 1 }} />`);

  assert.strictEqual(tree.type, "root");

  assert.strictEqual(tree.children.at(0).type, "mdxjsEsm");

  assert.strictEqual(tree.children.at(1).type, "mdxJsxFlowElement");
  assert.strictEqual(tree.children.at(1).name, "CIBEfJwpOCZBzAhgVmaaNZUkovAEFETME");

  assert.strictEqual(tree.children.at(1).attributes.at(0).type, "mdxJsxExpressionAttribute");
  assert.strictEqual(tree.children.at(1).attributes.at(0).value, "...{ extra: 1 }");
});

test("Sample as inline", async () => {
  const tree = await process(`<Sample variant="basic" /> or <Sample variant="basic" />`);

  assert.strictEqual(tree.type, "root");

  assert.strictEqual(tree.children.at(0).type, "mdxjsEsm");

  assert.strictEqual(tree.children.at(2).type, "paragraph");
  assert.strictEqual(tree.children.at(2).children.at(0).type, "mdxJsxTextElement");
});
