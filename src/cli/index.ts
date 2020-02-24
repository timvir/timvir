import fs from "fs";
import mkdirp from "mkdirp";
import { join } from "path";
import prompts from "prompts";
import prettier from "prettier";
import kleur from "kleur";

import indexT from "./templates/index";
import componentT from "./templates/component";
import sampleT from "./templates/sample";
import docsT from "./templates/docs";

async function main() {
  const response = await prompts(
    [
      {
        type: "text",
        name: "name",
        message: "What's the name of your component?",
        validate: value => (value === "" || value === "?" ? `HELP TEXT HERE` : true)
      },
      {
        type: "text",
        name: "Component",
        message: "What is the underlying DOM element (eg. div, span, input etc)",
        initial: "div"
      }
    ],
    {
      onCancel: () => {
        process.exit(1);
      }
    }
  );

  const baseDir = join("src", "components", response.name);

  console.log("");
  console.log(`  ${kleur.white().bold("Writing files…")}`);
  console.log("");

  await mkdirp(baseDir);
  await write(join(baseDir, `index.ts`), indexT(response));
  await write(join(baseDir, `${response.name}.tsx`), componentT(response));

  await mkdirp(join(baseDir, `docs`));
  await write(join(baseDir, `docs`, `index.mdx`), docsT(response));

  await mkdirp(join(baseDir, `samples`));
  await write(join(baseDir, `samples`, `basic.tsx`), sampleT(response));

  await mkdirp(join("src", "pages", "docs", "components", response.name));
  await write(
    join("src", "pages", "docs", "components", response.name, "index.tsx"),
    `export { default } from "../../../../components/${response.name}/docs/index.mdx";`
  );

  await mkdirp(join("src", "pages", "docs", "components", response.name, "samples"));
  await write(
    join("src", "pages", "docs", "components", response.name, "samples", "basic.tsx"),
    `export { default } from "../../../../../components/${response.name}/samples/basic";`
  );

  /*
   * Generate the TOC for the components folder.
   */
  await (async () => {
    const folders = await fs.promises.readdir(join("src", "pages", "docs", "components"));
    await write(
      join("src", "pages", "docs", "components", "toc.timvir"),
      folders
        .filter(x => x !== "toc.timvir")
        .sort()
        .join("\n") + "\n",
      true
    );
  })();

  /*
   * Scan all the toc.timvir files and combine them into the toc.ts module.
   */
  await (async () => {
    await mkdirp(join("src", "docs"));
    const toc = await buildTableOfContents("/docs", join("src", "pages", "docs"));
    await write(
      join("src", "docs", "toc.ts"),
      prettier.format(`export default ${JSON.stringify(toc)} as const`, {
        parser: "typescript",
        printWidth: Infinity
      }),
      true
    );
  })();
}

main();

async function write(path: string, content: string, force: boolean = false) {
  const ps = kleur.gray("".padEnd(Math.max(0, 50 - path.length), "."));

  if (force) {
    console.log(`  - ${path}${ps} ${kleur.red("update")}`);
    await fs.promises.writeFile(path, content);
  } else {
    try {
      await fs.promises.stat(path);
      console.log(`  - ${path}${ps} ${kleur.gray("skip")}`);
    } catch (err) {
      console.log(`  - ${path}${ps} ${kleur.green("write")}`);
      await fs.promises.writeFile(path, content);
    }
  }
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

      const path = line.flags.includes("F") ? undefined : `${prefix}${line.path === "." ? "" : `/${line.path}`}`;

      const children =
        line.path === "."
          ? undefined
          : await (async () => {
              const children = await buildTableOfContents(
                `${prefix}${line.path === "." ? "" : `/${line.path}`}`,
                join(folder, line.path)
              );
              return children.length === 0 ? undefined : children;
            })();

      ret.push({ label: line.label, path, children });
    }
  } catch (e) {}

  return ret;
}
