import fs from "node:fs";
import kleur from "kleur";
import { mkdirp } from "mkdirp";
import { join } from "node:path";
import prompts from "prompts";
import { write } from "../stdlib";
import componentT from "../templates/component";
import docsT from "../templates/docs";
import indexT from "../templates/index";
import sampleT from "../templates/sample";
import { default as toc } from "./toc";

export default async function () {
  const response = await prompts(
    [
      {
        type: "text",
        name: "name",
        message: "What's the name of your component?",
        validate: (value) => (value === "" || value === "?" ? `HELP TEXT HERE` : true),
      },
      {
        type: "text",
        name: "Root",
        message: "What is the underlying DOM element (eg. div, span, input etc)",
        initial: "div",
      },
    ],
    {
      onCancel: () => {
        process.exit(1);
      },
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

  /*
   * If the project uses toc.timvir, update the components index and regenerate the TOC.
   */
  {
    const path = join("src", "pages", "docs", "components", "toc.timvir");
    if (!fs.promises.access(path).catch(() => true)) {
      const folders = await fs.promises.readdir(join("src", "components"));
      await write(
        path,
        folders
          .filter((x) => x !== "toc.timvir")
          .sort()
          .join("\n") + "\n",
        true
      );

      await toc();
    }
  }
}
