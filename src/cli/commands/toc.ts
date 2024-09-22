import fs from "fs";
import kleur from "kleur";
import { mkdirp } from "mkdirp";
import { join } from "path";
import prettier from "prettier";
import { write } from "../stdlib";

/**
 * Scan all the toc.timvir files and combine them into the toc.ts module.
 */
export default async function() {
  console.log("");
  console.log(`  ${kleur.white().bold("Writing files…")}`);
  console.log("");

  await mkdirp(join("src", "timvir"));
  const toc = await buildTableOfContents("/", join("src", "pages"));
  await write(
    join("src", "timvir", "toc.ts"),
    prettier.format(`export default ${JSON.stringify(toc)} as const`, {
      parser: "typescript",
      printWidth: Infinity
    }),
    true
  );
}

interface TOCE {
  label: string;
  path?: string;
  children?: Array<TOCE>;
}

async function buildTableOfContents(prefix: string, folder: string): Promise<Array<TOCE>> {
  const ret: Array<TOCE> = [];

  interface Line {
    label: string;
    path: string;
    flags: string[];
  }

  /**
   * Parses a single line from a "toc.timvir" file.
   *
   *  - "notes Notes" -> { path: "notes", label: "Notes", flags: [] }
   *  - ". Getting Started" -> { path: ".", label: "Getting Started", flags: [] }
   *  - "components Components [F]" -> { path: "components", label: "Components", flags: ["F"] }
   *  - "TextField" -> { path: "TextField", label: "TextField", flags: [] }
   */
  function parseLine(line: string): undefined | Line {
    const [path, ...rest0] = line.split(" ");
    if (!path) {
      return undefined;
    }

    const [rest, flags] = (() => {
      const last = rest0[rest0.length - 1];
      if (!last) {
        return [rest0, [] as string[]] as const;
      } else {
        const m = last.match(/\[([A-Z,]+)\]/);
        if (m) {
          return [rest0.slice(0, -1), m[1].split(",")] as const;
        } else {
          return [rest0, [] as string[]] as const;
        }
      }
    })();

    return { label: rest0.length === 0 ? path : rest.join(" "), path, flags };
  }

  try {
    const toc = await fs.promises.readFile(join(folder, "toc.timvir"), "utf-8");

    for (const str of toc.split("\n")) {
      const line = parseLine(str);
      if (!line) {
        continue;
      }

      const path = line.flags.includes("F") ? undefined : join(prefix, `${line.path === "." ? "" : `${line.path}`}`);

      const children =
        line.path === "."
          ? undefined
          : await (async () => {
              const children = await buildTableOfContents(
                join(prefix, `${line.path === "." ? "" : `${line.path}`}`),
                join(folder, line.path)
              );
              return children.length === 0 ? undefined : children;
            })();

      ret.push({ label: line.label, path, children });
    }
  } catch {}

  return ret;
}
