import { spawn } from "child_process";

import { Tool } from "./createConfigs";

export function getDependencies(tools: Set<Tool>): string[] {
  const deps: string[] = [];

  if (tools.has(Tool.babel)) {
    deps.push(
      "@babel/cli",
      "@babel/core",
      "@babel/node",
      "@babel/plugin-proposal-class-properties",
      "@babel/preset-env",
    );

    if (tools.has(Tool.typescript)) {
      deps.push("@babel/preset-typescript");
    }
  }

  if (tools.has(Tool.typescript)) {
    deps.push("typescript");
  }

  if (tools.has(Tool.eslint)) {
    deps.push(
      "eslint",
      "@cszatma/eslint-config",
      "eslint-plugin-import",
      "eslint-plugin-prettier",
    );

    if (tools.has(Tool.babel) && !tools.has(Tool.typescript)) {
      deps.push("babel-eslint", "eslint-plugin-babel");
    } else if (tools.has(Tool.typescript)) {
      deps.push(
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint-import-resolver-typescript",
      );
    }
  }

  if (tools.has(Tool.prettier)) {
    deps.push("prettier");
  }

  if (tools.has(Tool.lintStaged)) {
    deps.push("husky", "lint-staged");
  }

  return deps;
}

export function getScripts(tools: Set<Tool>): Record<string, string> {
  const scripts: Record<string, string> = {};

  if (tools.has(Tool.babel)) {
    scripts.build = "babel src -d build";

    if (tools.has(Tool.typescript)) {
      scripts.build += " --extensions '.js,.ts'";
      scripts["check-types"] = "tsc";
    }
  } else if (tools.has(Tool.typescript)) {
    scripts.build = "tsc";
  }

  if (tools.has(Tool.eslint)) {
    const exts = tools.has(Tool.typescript) ? " --exts=js,ts" : "";
    scripts.lint = `eslint${exts} ./src`;
    scripts["lint:fix"] = `eslint --fix${exts} ./src`;
  }

  return scripts;
}

export async function install(
  useYarn: boolean,
  dependencies: string[],
  dir: string,
): Promise<void> {
  const packageManager = useYarn ? "yarn" : "npm";
  const args = useYarn
    ? ["add", ...dependencies, "-D"]
    : ["install", ...dependencies, "--save-dev"];

  return new Promise<void>((resolve, reject) => {
    const child = spawn(packageManager, args, { stdio: "inherit", cwd: dir });
    child.on("close", (code) => {
      if (code !== 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ command: `${packageManager} ${args.join(" ")}` });
      }

      return resolve();
    });
  });
}
