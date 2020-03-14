const { join, dirname } = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { createMacro } = require("babel-plugin-macros");

let counter = 0;

module.exports = createMacro(({ references, babel, state }) => {
  const t = babel.types;

  if (references.Sample) {
    references.Sample.forEach(referencePath => {
      if (referencePath.parent.type === "JSXClosingElement") return;

      const attrs = referencePath.parent.attributes;
      const { filename } = referencePath.hub.file.opts;

      const component = findAttrValue(attrs, "component") || "..";
      const variant = findAttrValue(attrs, "variant");

      const as = findAttrValue(attrs, "as") || "component";
      const props = findAttrExpression(attrs, "props") || t.objectExpression([]);

      const otherAttributes = attrs.filter(
        ({ name }) => name.type === "JSXIdentifier" && !(name.name in { component: 1, variant: 1, as: 1, props: 1 })
      );

      /*
       * The module which holds the sample.
       */
      const module = join(dirname(filename), component, "samples", variant);

      ({
        component: () => {
          /*
           * Genrate a unique name that will be used to hold the reference
           * to the sample component.
           */
          const name = `C${genName(filename, component, variant, "" + counter)}`;
          counter = counter + 1;

          state.file.path.node.body.unshift(
            t.importDeclaration([t.importDefaultSpecifier(t.identifier(name))], t.stringLiteral(module))
          );

          referencePath.parentPath.parentPath.replaceWith(
            t.jsxElement(
              t.jsxOpeningElement(t.jsxIdentifier(name), [...otherAttributes, t.jsxSpreadAttribute(props)], true),
              null,
              referencePath.parentPath.parentPath.node.children,
              true
            )
          );
        },
        source: () => {
          const source = fs.readFileSync(module + ".tsx", "utf8");
          referencePath.parentPath.parentPath.replaceWith(
            t.jsxExpressionContainer(t.templateLiteral([t.templateElement({ raw: source, cooked: source })], []))
          );
        }
      }[as]());
    });
  }
});

const genName = (...buffers) => {
  const hash = crypto.createHash("sha256");
  for (const buffer of buffers) {
    hash.update(buffer);
  }
  const ret = hash.digest();
  const alpha = x => {
    if (x < 26) return x + 65;
    if (x < 52) return x - 26 + 97;
    throw new Error(`alnum: value out of range: ${x}`);
  };
  for (const [index, value] of ret.entries()) {
    ret[index] = alpha(value % 52);
  }
  return ret.toString("utf8");
};

const matchAttr = n => ({ name }) => name.type === "JSXIdentifier" && name.name === n;

const findAttrValue = (attrs, n) => {
  const attr = attrs.find(matchAttr(n));
  return attr ? attr.value.value : undefined;
};

const findAttrExpression = (attrs, n) => {
  const attr = attrs.find(matchAttr(n));
  return attr ? attr.value.expression : undefined;
};
