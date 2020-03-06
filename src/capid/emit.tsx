import * as fs from "fs";
import * as path from "path";
import prettier from "prettier";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ts from "typescript";
import { write } from "../cli/stdlib";
import template from "./template";

export async function emit({ typeChecker, propsDeclaration, name, props }: any) {
  const docPathBase = path.join("src", "components", name, "docs");
  try {
    fs.mkdirSync(docPathBase);
  } catch (e) {
    // Ignore
  }

  const outFile = path.join(docPathBase, `api.mdx`);
  await write(
    outFile,
    template({
      Props: JSON.stringify(Props(typeChecker, propsDeclaration))
    }),
    true
  );
}

function Props(typeChecker, propsDeclaration) {
  const required = (
    <svg
      x="0px"
      y="0px"
      width="10px"
      height="10px"
      viewBox="0 0 16 16"
      style={{ position: "relative", top: 0, display: "inline-block", marginRight: 8 }}
    >
      <g transform="translate(0, 0)">
        <circle cx="8" cy="8" r="8" fill="#444444"></circle>
      </g>
    </svg>
  );

  const optional = (
    <svg
      x="0px"
      y="0px"
      width="10px"
      height="10px"
      viewBox="0 0 16 16"
      style={{ position: "relative", top: 0, display: "inline-block", marginRight: 8 }}
    >
      <g transform="translate(0, 0)">
        <circle
          cx="8"
          cy="8"
          r="7.5"
          fill="none"
          stroke="#444444"
          strokeLinecap="round"
          strokeLinejoin="round"
          data-cap="butt"
        ></circle>
      </g>
    </svg>
  );

  const fields = [...propsDeclaration.members.entries()].map(([k, v]) => {
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
      name: v.name.escapedText,
      type,
      def: def ? def.text : undefined,
      example: example ? example.text : undefined,
      comment: {
        shortText: ts.displayPartsToString(s.getDocumentationComment(typeChecker))
      }
    };
  });

  return { fields };

  return (
    <div style={{ marginTop: 16, display: "grid", gridGap: 24 }}>
      {fields.map(({ name, type, def, example, comment }) => (
        <div key={name}>
          <div style={{ marginLeft: -18 }}>
            {type.optional ? optional : required}
            <span style={{ fontWeight: "bold" }}>{name}</span>
            <span style={{ fontWeight: "bold" }}>{type.name}</span>
            {def && (
              <>
                = <span style={{ fontWeight: "bold" }}>{def}</span>
              </>
            )}
          </div>

          <div style={{ marginLeft: 0 }}>{comment.shortText}</div>

          {example && (
            <div style={{ marginLeft: 0, marginTop: 8, color: "rgb(153, 153, 153)", fontSize: "0.8rem" }}>
              Example: <span style={{ fontWeight: "bold" }}>{example}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
