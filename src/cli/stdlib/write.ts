import fs from "fs";
import kleur from "kleur";

export async function write(path: string, content0: string, force: boolean = false) {
  const content = content0.trim() + "\n";
  const ps = kleur.gray("".padEnd(Math.max(0, 70 - path.length), "."));

  if (force) {
    console.log(`  - ${path} ${ps} ${kleur.red("update")}`);
    await fs.promises.writeFile(path, content);
  } else {
    try {
      await fs.promises.stat(path);
      console.log(`  - ${path} ${ps} ${kleur.gray("skip")}`);
    } catch (err) {
      console.log(`  - ${path} ${ps} ${kleur.green("write")}`);
      await fs.promises.writeFile(path, content);
    }
  }
}
