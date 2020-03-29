import { Command } from "commander";

import { run } from "./run";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("../package.json");

const program = new Command(packageJson.name)
  .version(packageJson.version, "-v, --version")
  .option("-f,--force", "Do not check if it is safe to run.")
  .action(run);

program.parse(process.argv);
