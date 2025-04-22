import * as path from "node:path";
import * as globby from "globby";

function main() {
  const files = globby.globbySync("**/*.(tsx|mdx)", {
    cwd: path.resolve(process.cwd(), "src", "pages"),
    ignore: ["api", "_*.tsx"],
  });

  const cleandUp = files.map((r) => `/${r.replace(/(\/?index)?\.(tsx|mdx)$/, "")}`);
  cleandUp.sort((a, b) => {
    function score(r) {
      return [100 + r.split("[...").length, 100 + r.split("[").length, 999 - r.split("/").length, r].join("-");
    }

    return score(b) - score(a);
  });

  console.log("export default {");

  for (const r of cleandUp) {
    console.log(
      `  '${r}': new RegExp("^${r.replace(/\[\.{3}[\w-]+]/g, "([^\\/]+)").replace(/\[([\w-]+)]/g, "(?<$1>.+)")}$"),`
    );
  }

  console.log("}");
}

main();
