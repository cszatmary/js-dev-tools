import { core, errors } from "@cszatma/node-stdlib";

import * as configs from "./configs";

type error = errors.error;

export const enum Tool {
  babel = "babel",
  eslint = "eslint",
  lintStaged = "lint-staged",
  prettier = "prettier",
  typescript = "typescript",
}

const stringify = (obj: unknown): string => JSON.stringify(obj, null, 2);

export interface ConfigFile {
  name: string;
  value: string;
}

export function createConfig(
  name: string,
  tools: Set<Tool>,
): core.Result<ConfigFile, error> {
  switch (name) {
    case Tool.babel:
      return core.Result.success({
        name: ".babelrc",
        value: stringify(configs.babel(tools.has(Tool.typescript))),
      });
    case Tool.eslint:
      return core.Result.success({
        name: ".eslintrc",
        value: stringify(configs.eslint()),
      });
    case Tool.lintStaged:
      return core.Result.success({
        name: ".lintstagedrc",
        value: stringify(
          configs.lintStaged(
            tools.has(Tool.typescript),
            tools.has(Tool.prettier),
          ),
        ),
      });
    case Tool.prettier:
      return core.Result.success({
        name: ".prettierrc",
        value: stringify(configs.prettier()),
      });
    case Tool.typescript:
      return core.Result.success({
        name: "tsconfig.json",
        value: stringify(configs.tsconfig(tools.has(Tool.babel))),
      });
    default:
      return core.Result.failure(errors.newError(`Invalid tool name: ${name}`));
  }
}
