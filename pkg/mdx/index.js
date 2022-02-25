import * as fs from "fs";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxjs } from "micromark-extension-mdxjs";
import * as crypto from "node:crypto";
import * as path from "node:path";
import { visit } from "unist-util-visit";

export function remarkPlugin(options) {
  let counter = 0;

  return (tree, file) => {
    const filename = file.history[0];

    visit(tree, "mdxJsxFlowElement", (node) => {
      if (node.name === "Sample") {
        const { attributes: attrs } = node;

        const component = findAttrValue(attrs, "component") || "..";
        const variant = findAttrValue(attrs, "variant");

        const as = findAttrValue(attrs, "as") || "component";
        const props = findAttrValue(attrs, "props");

        const otherAttributes = attrs.filter(
          ({ type, name }) => type === "mdxJsxAttribute" && !(name in { component: 1, variant: 1, as: 1, props: 1 })
        );

        // console.log(attrs);
        // console.log({ component, variant, as, props, otherAttributes });

        /*
         * The module which holds the sample.
         */
        const module = path.join(path.dirname(filename), component, "samples", variant);

        ({
          component: () => {
            /*
             * Genrate a unique name that will be used to hold the reference
             * to the sample component.
             */
            const name = `C${genName(filename, component, variant, "" + counter)}`;
            counter = counter + 1;

            /*
             * Construct the import declaration and insert into the very
             * beginning of the tree.
             */
            const { children } = fromMarkdown(`import ${name} from "${module}";`, {
              extensions: [mdxjs()],
              mdastExtensions: [mdxFromMarkdown()],
            });
            tree.children.unshift(...children);

            /*
             * Update the mdxJsxFlowElement node:
             *
             *  - Update name (no longer <Sample> but the generated name).
             *  - Tweak props.
             */
            node.name = name;
            node.attributes = [...otherAttributes];
            if (props?.value) {
              node.attributes.push({ type: "mdxJsxExpressionAttribute", value: `...${props.value}` });
            }
          },
          source: () => {
            const source = (() => {
              if (fs.existsSync(module)) {
                return fs.readFileSync(module, "utf8");
              } else {
                return fs.readFileSync(module + ".tsx", "utf8");
              }
            })();

            const { children } = fromMarkdown(`{${JSON.stringify(source)}}`, {
              extensions: [mdxjs()],
              mdastExtensions: [mdxFromMarkdown()],
            });

            for (const [k] of Object.keys(node)) {
              delete node[k];
            }

            for (const [k, v] of Object.entries(children[0])) {
              node[k] = v;
            }
          },
        }[as]());

        // const code = toMarkdown(node, { extensions: [mdxToMarkdown()] });
      }
    });

    if (file.history[0].match(/snippets/)) {
      console.log(tree.children[7]);
      const out = toMarkdown(tree, { extensions: [mdxToMarkdown()] });
      console.log(out);
    }
  };
}

const matchAttr =
  (t, n) =>
  ({ type, name }) =>
    type === t && name === n;

const findAttrValue = (attrs, n) => {
  return attrs.find(matchAttr("mdxJsxAttribute", n))?.value;
};

const genName = (...buffers) => {
  const hash = crypto.createHash("sha256");
  for (const buffer of buffers) {
    hash.update(buffer);
  }
  const ret = hash.digest();
  const alpha = (x) => {
    if (x < 26) return x + 65;
    if (x < 52) return x - 26 + 97;
    throw new Error(`alnum: value out of range: ${x}`);
  };
  for (const [index, value] of ret.entries()) {
    ret[index] = alpha(value % 52);
  }
  return ret.toString("utf8");
};
