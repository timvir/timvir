import program from "commander";
import * as cmd from "./commands";

program
  .command("component")
  .description("generate a new component")
  .action(cmd.component);

program
  .command("toc")
  .description("generate table-of-contents")
  .action(cmd.toc);

program.parse(process.argv);
