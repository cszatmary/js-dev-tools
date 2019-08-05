import { Tools, ToolTypes } from './tools';
import babelConfig from '../configs/babel';
import eslintConfig from '../configs/eslint';
import lintStagedConfig from '../configs/lintStaged';
import prettierConfig from '../configs/prettier';
import tsConfig from '../configs/tsconfig';
import tsConfigBabel from '../configs/tsconfig.babel';

const stringify = (obj: any): string => JSON.stringify(obj, null, 2);

export interface ConfigFile {
  name: string;
  value: string;
}

function parseName(name: string, tools: Tools): ConfigFile {
  switch (name) {
    case ToolTypes.babel:
      return {
        name: '.babelrc',
        value: stringify(babelConfig(tools.typescript)),
      };
    case ToolTypes.eslint:
      return {
        name: '.eslintrc',
        value: stringify(
          eslintConfig(tools.typescript, tools.babel, tools.prettier),
        ),
      };
    case ToolTypes.lintStaged:
      return {
        name: '.lintstagedrc',
        value: stringify(
          lintStagedConfig(tools.typescript, tools.eslint, tools.prettier),
        ),
      };
    case ToolTypes.prettier:
      return {
        name: '.prettierrc',
        value: stringify(prettierConfig),
      };
    case ToolTypes.typescript:
      return {
        name: 'tsconfig.json',
        value: stringify(tsConfig),
      };
    case ToolTypes.typescriptBabel:
      return {
        name: 'tsconfig.json',
        value: stringify(tsConfigBabel),
      };
    default:
      throw new Error(`Invalid tool name: ${name}`);
  }
}

export default (tools: Tools): ConfigFile[] =>
  Object.keys(tools)
    .filter(name => tools[name])
    .map(name => parseName(name, tools));
