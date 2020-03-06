import kleur from "kleur";
import { main } from "../../capid/main";

/**
 * Scan all the toc.timvir files and combine them into the toc.ts module.
 */
export default async function() {
  console.log("");
  console.log(`  ${kleur.white().bold("Generating Component API Documentation…")}`);
  console.log("");

  await main();
}
