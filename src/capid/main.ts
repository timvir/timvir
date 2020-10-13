import ts from "typescript";
import { emit } from "./emit";

export async function main() {
  const { program, typeChecker } = await initTypeScript();

  for (const sourceFile of program.getSourceFiles()) {
    const m = sourceFile.fileName.match(/src\/components\/(.*)\/(.*).tsx/);
    if (m && m[1] === m[2]) {
      const name = m[1];

      let writer = {};

      ts.forEachChild(
        sourceFile,
        visit({
          typeChecker,
          writer: o => {
            writer = o;
          }
        })
      );

      await emit({ typeChecker, name, ...writer });
    }
  }
}

/**
 * Initialize TypeScript by loading the tsconfig.json file in the current folder.
 */
async function initTypeScript() {
  const parseConfigHost: ts.ParseConfigHost = {
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    useCaseSensitiveFileNames: true
  };

  const configFileName = ts.findConfigFile(".", ts.sys.fileExists, "tsconfig.json");
  const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
  const { options, fileNames } = ts.parseJsonConfigFileContent(configFile.config, parseConfigHost, ".");

  const program = ts.createProgram({ rootNames: fileNames, options });

  return { program, typeChecker: program.getTypeChecker() };
}

function visit({ typeChecker, writer }: { typeChecker: ts.TypeChecker; writer: any }) {
  return (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === "Props") {
      const symbol = typeChecker.getSymbolAtLocation(node.name);

      writer({
        propsDeclaration: node,
        documentation: ts.displayPartsToString(symbol.getDocumentationComment(typeChecker)),
        tags: symbol.getJsDocTags(),
        props: {
          name: symbol.escapedName,
          fields: [...node.members.entries()].map(([_, v]) => {
            const s = typeChecker.getSymbolAtLocation(v.name);
            const t = typeChecker.getTypeOfSymbolAtLocation(s, s.valueDeclaration);

            const type = {
              optional: !!v.questionToken,
              name: typeChecker.typeToString(t),
              module: ""
            };

            const tags = s.getJsDocTags();
            const def = tags.find(x => x.name === "default");
            const example = tags.find(x => x.name === "example");

            return {
              name: (v.name as any).escapedText,
              type,
              def: def ? def.text : undefined,
              example: example ? example.text : undefined,
              comment: {
                shortText: ts.displayPartsToString(s.getDocumentationComment(typeChecker))
              }
            };
          })
        }
      });
    }
  };
}
