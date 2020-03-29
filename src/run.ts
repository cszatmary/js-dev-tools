import fs from "fs";
import chalk from "chalk";
import path from "path";
import { core, errors, fatal } from "@cszatma/node-stdlib";

import { chooseTranspiler } from "./prompts/chooseTranspiler";
import { chooseToolsPrompt } from "./prompts/chooseTools";
import { createConfig, Tool } from "./createConfigs";
import { getDependencies, getScripts, install } from "./dependencies";

function isSafeToRun(rootPath: string): boolean {
  const invalidFiles = new Set([
    ".babelrc.js",
    ".babelrc",
    ".eslintrc",
    ".eslintrc.js",
    ".lintstagedrc",
    "lint-staged.config.js",
    ".prettierrc",
    "prettier.config.js",
    "tsconfig.json",
  ]);

  const r = core.Result.of(() => fs.readdirSync(rootPath));
  if (r.isFailure()) {
    fatal.exitErr(
      errors.fromJSError(r.failure()),
      `Failed to get list of files from directory ${rootPath}`,
    );
  }

  const conflicts = r.success().filter((file) => invalidFiles.has(file));

  if (conflicts.length < 1) {
    return true;
  }

  console.log(
    `The directory ${chalk.cyan(
      path.basename(rootPath),
    )} contains files that could conflict:\n`,
  );

  conflicts.forEach((conflict) => console.log(`  ${conflict}`));

  console.log(
    '\nIf you wish to continue anyway rerun this program with "-f" or "--force".',
  );

  return false;
}

async function getTools(): Promise<Set<Tool>> {
  const transpiler = await chooseTranspiler();
  const selectedTools = await chooseToolsPrompt();

  const tools: Tool[] = [];

  if (transpiler === "babel" || transpiler === "typescript + babel") {
    tools.push(Tool.babel);
  }

  if (selectedTools.has("eslint")) {
    tools.push(Tool.eslint);
  }

  if (selectedTools.has("lint-staged")) {
    tools.push(Tool.lintStaged);
  }

  if (selectedTools.has("prettier")) {
    tools.push(Tool.prettier);
  }

  if (transpiler === "typescript" || transpiler === "typescript + babel") {
    tools.push(Tool.typescript);
  }

  return new Set(tools);
}

interface CliOptions {
  force: boolean;
}

export async function run(options: CliOptions): Promise<void> {
  const targetDir = process.env.INIT_CWD || process.cwd();

  // Make sure it's a clean directory
  if (!options.force && !isSafeToRun(targetDir)) {
    fatal.exit(
      chalk.red(
        "Error: Unable to setup tools without overwriting existing configs.",
      ),
    );
  }

  const packageJsonPath = path.join(targetDir, "package.json");

  // Make sure there is a package.json
  if (!fs.existsSync(packageJsonPath)) {
    fatal.exit(
      chalk.red("Error: No package.json file. Please create one first."),
    );
  }

  const useYarn = fs.existsSync(path.join(targetDir, "yarn.lock"));
  const tools = await getTools();

  console.log("Creating config files...");

  for (const tool of tools) {
    const r = createConfig(tool, tools);
    if (r.isFailure()) {
      fatal.exitErr(r.failure(), `Failed to create config for tool ${tool}`);
    }

    const { name, value } = r.success();
    fs.writeFileSync(path.join(targetDir, name), value);
  }

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, { encoding: "utf-8" }),
  );
  packageJson.scripts = {
    ...getScripts(tools),
    ...(packageJson.scripts || {}),
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log("Installing dependencies...");

  await install(useYarn, getDependencies(tools), targetDir);

  console.log(chalk.green("✅  Finished setting up tools. Enjoy!\n"));
}
