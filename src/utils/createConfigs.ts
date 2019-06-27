import generateConfig from './generateConfig';
import ToolTypes from './ToolTypes';
import { Tools } from '../getTools';

export interface ConfigFile {
  name: string;
  value: string;
}

function parseName(name: string, tools: Tools): ConfigFile {
  switch (name) {
    case ToolTypes.babel:
      return {
        name: '.babelrc.js',
        value: generateConfig.babel(tools.typescript),
      };
    case ToolTypes.eslint:
      return {
        name: '.eslintrc.js',
        value: generateConfig.eslint(
          tools.typescript,
          tools.babel,
          tools.prettier,
        ),
      };
    case ToolTypes.lintStaged:
      return {
        name: 'lint-staged.config.js',
        value: generateConfig.lintStaged(
          tools.typescript,
          tools.eslint,
          tools.prettier,
        ),
      };
    case ToolTypes.prettier:
      return {
        name: 'prettier.config.js',
        value: generateConfig.prettier(),
      };
    case ToolTypes.typescript:
      return {
        name: 'tsconfig.json',
        value: generateConfig.typescript(),
      };
    case ToolTypes.typescriptBabel:
      return {
        name: 'tsconfig.json',
        value: generateConfig.typescriptBabel(),
      };
    default:
      throw new Error(`Invalid tool name: ${name}`);
  }
}

export default (tools: Tools): ConfigFile[] =>
  Object.keys(tools)
    .filter(name => tools[name])
    .map(name => parseName(name, tools));
