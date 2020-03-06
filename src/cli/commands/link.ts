import fs from "fs";
import kleur from "kleur";
import mkdirp from "mkdirp";
import { join, dirname, basename } from "path";
import prettier from "prettier";
import { write } from "../stdlib";

/**
 * Scan all the toc.timvir files and combine them into the toc.ts module.
 */
export default async function() {
  console.log("");
  console.log(`  ${kleur.white().bold("Linking component documentation…")}`);
  console.log("");

  const components = await fs.promises.readdir(join("src", "components"));
  for (const component of components) {
    const docs = await fs.promises.readdir(join("src", "components", component, "docs"));
    for (const file of docs) {
      link(
        join("..", "..", "..", "..", "components", component, "docs", file),
        join("src", "pages", "docs", "components", component, file)
      );
    }

    const samples = await fs.promises.readdir(join("src", "components", component, "samples"));
    for (const file of samples) {
      const path = join("src", "pages", "docs", "components", component, "samples", file);
      await mkdirp(dirname(path));
      write(
        path,
        `export { default } from "../../../../../components/${component}/samples/${basename(file, ".tsx")}";\n`,
        true
      );
    }
  }
}

async function link(target: string, path: string) {
  const ps = kleur.gray("".padEnd(Math.max(0, 70 - path.length), "."));

  try {
    const p = await fs.promises.readlink(path);
    if (p !== target) {
      await fs.promises.unlink(path);
      throw new Error("write");
    }
  } catch (err) {
    console.log(`  - ${path} ${ps} ${kleur.green("link")}`);

    await mkdirp(dirname(path));
    await fs.promises.symlink(target, path, "file");
  }
}
