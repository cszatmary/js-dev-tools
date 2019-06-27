import chooseTranspiler from './prompts/chooseTranspiler';
import chooseToolsPrompt from './prompts/chooseTools';
import ToolTypes from './utils/ToolTypes';

export interface Tools {
  babel: boolean;
  eslint: boolean;
  lintStaged: boolean;
  prettier: boolean;
  typescript: boolean;
  typescriptBabel: boolean;
  [key: string]: boolean;
}

export default async function(): Promise<Tools> {
  const transpiler = await chooseTranspiler();
  const selectedTools = await chooseToolsPrompt();

  return {
    babel:
      transpiler === ToolTypes.babel ||
      transpiler === ToolTypes.typescriptBabel,
    eslint: selectedTools.includes(ToolTypes.eslint),
    lintStaged: selectedTools.includes(ToolTypes.lintStaged),
    prettier: selectedTools.includes(ToolTypes.prettier),
    typescript: transpiler === ToolTypes.typescript,
    typescriptBabel: transpiler === ToolTypes.typescriptBabel,
  };
}
