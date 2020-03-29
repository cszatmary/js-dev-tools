import { Command } from "commander";

import run from "./run";

const packageJson = require("../package.json");

const programName = packageJson.name;

const program = new Command(programName)
  .version(packageJson.version, "-v, --version")
  .option("-f,--force", "Do not check if it is safe to run.")
  .action(run);

program.parse(process.argv);
