import fs from "node:fs";
import kleur from "kleur";
import { mkdirp } from "mkdirp";
import { basename, dirname, join } from "node:path";
import { write } from "../stdlib";
import { template } from "../template";

/**
 * Scan all the toc.timvir files and combine them into the toc.ts module.
 */
export default async function () {
  console.log("");
  console.log(`  ${kleur.white().bold("Linking component documentation…")}`);
  console.log("");

  const components = await fs.promises.readdir(join("src", "components"));
  for (const component of components) {
    {
      const dir = join("src", "components", component, "docs");
      if (fs.existsSync(dir)) {
        const docs = await fs.promises.readdir(dir);
        for (const file of docs) {
          const path = join("src", "pages", "docs", "components", component, `${basename(file, ".mdx")}.tsx`);
          await mkdirp(dirname(path));
          write(path, `${tmpl({ component, file }).trim()}\n`, true);
        }
      }
    }

    {
      const dir = join("src", "components", component, "samples");
      if (fs.existsSync(dir)) {
        const samples = await fs.promises.readdir(dir);
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
  }
}

const tmpl = template(`
import * as React from "react";
import Wrapper from "../../../../timvir/wrapper";
import Content from "../../../../components/{{= it.component }}/docs/{{= it.file }}";

export default () => (
  <Wrapper>
    <Content />
  </Wrapper>
)
`);
