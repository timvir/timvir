import generate from "@babel/generator";
import { parse } from "@babel/parser";
import * as t from "@babel/types";
import * as crypto from "node:crypto";
import * as espree from "espree";
import * as fs from "node:fs";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import * as path from "node:path";
import prettier from "prettier";
import { visit } from "unist-util-visit";

export function remarkPlugin() {
  let counter = 0;

  return async (tree, file) => {
    const filename = file.history[0];

    visit(tree, ["mdxJsxTextElement", "mdxJsxFlowElement"], (node) => {
      if (node.name === "Sample") {
        const { attributes: attrs } = node;

        const component = findAttrValue(attrs, "component") || "..";
        const variant = findAttrValue(attrs, "variant");

        const as = findAttrValue(attrs, "as") || "component";
        const props = findAttrValue(attrs, "props");

        const otherAttributes = attrs.filter(
          ({ type, name }) => type === "mdxJsxAttribute" && !(name in { component: 1, variant: 1, as: 1, props: 1 })
        );

        /*
         * The module which holds the sample.
         */
        const module = path.join(component, "samples", variant);

        function loadSource() {
          if (fs.existsSync(module)) {
            return fs.readFileSync(module, "utf8");
          } else {
            return fs.readFileSync(`${module}.tsx`, "utf8");
          }
        }

        ({
          component: () => {
            /*
             * Genrate a unique name that will be used to hold the reference
             * to the sample component.
             */
            const name = `C${genName(filename, component, variant, `${counter}`)}`;
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
              const estree = espree.parse(`export default { ...${props.value} }`, {
                ecmaVersion: 2020,
                sourceType: "module",
              });

              node.attributes.push({
                type: "mdxJsxExpressionAttribute",
                value: `...${props.value}`,
                data: {
                  estree: {
                    body: [
                      {
                        type: "ExpressionStatement",
                        expression: {
                          type: "ObjectExpression",
                          properties: [
                            {
                              type: "SpreadElement",
                              argument: estree.body[0].declaration.properties[0].argument,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              });
            }
          },
          source: () => {
            const source = loadSource();

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
          "source/component": () => {
            const source = (() => {
              const file = parse(loadSource(), {
                sourceType: "module",
                plugins: ["jsx", "typescript"],
              });

              const exportDefaultDeclaration = file.program.body.find((node) => t.isExportDefaultDeclaration(node));
              const { declaration } = exportDefaultDeclaration;
              const { code } = generate.default(declaration);
              return prettier
                .format(code, {
                  parser: "typescript",
                  printWidth: 80,
                })
                .trim()
                .slice(0, -1);
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
          "source/markup": () => {
            const source = (() => {
              const file = parse(loadSource(), {
                sourceType: "module",
                plugins: ["jsx", "typescript"],
              });

              const exportDefaultDeclaration = file.program.body.find((node) => t.isExportDefaultDeclaration(node));
              const { declaration } = exportDefaultDeclaration;
              const body = declaration.body.body;
              const returnStatement = body.find((node) => t.isReturnStatement(node));
              const { code } = generate.default(returnStatement.argument);
              return prettier
                .format(code, {
                  parser: "typescript",
                  printWidth: 80,
                })
                .trim()
                .slice(0, -1);
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
      }
    });

    return tree;
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
