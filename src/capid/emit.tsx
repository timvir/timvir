import * as fs from "node:fs";
import * as path from "node:path";
import ts from "typescript";
import { write } from "../cli/stdlib";
import template from "./template";

export async function emit({ typeChecker, propsDeclaration, name }: any) {
  const docPathBase = path.join("src", "components", name, "docs");
  try {
    fs.mkdirSync(docPathBase);
  } catch {
    // Ignore
  }

  const outFile = path.join(docPathBase, "api.mdx");
  await write(
    outFile,
    template({
      Props: JSON.stringify(Props(typeChecker, propsDeclaration)),
    }),
    true
  );
}

function Props(typeChecker: any, propsDeclaration: any) {
  const fields = [...propsDeclaration.members.entries()].map(([_, v]) => {
    const s = typeChecker.getSymbolAtLocation(v.name);
    const t = typeChecker.getTypeOfSymbolAtLocation(s, s.valueDeclaration);

    const type = {
      optional: !!v.questionToken,
      name: typeChecker.typeToString(t),
      module: "",
    };

    const tags = s.getJsDocTags();
    const def = tags.find((x: any) => x.name === "default");
    const example = tags.find((x: any) => x.name === "example");

    return {
      name: v.name.escapedText,
      type,
      def: def ? def.text : undefined,
      example: example ? example.text : undefined,
      comment: {
        shortText: ts.displayPartsToString(s.getDocumentationComment(typeChecker)),
      },
    };
  });

  return { fields };
}
