export const enum ToolTypes {
  babel = 'babel',
  eslint = 'eslint',
  lintStaged = 'lintStaged',
  prettier = 'prettier',
  typescript = 'typescript',
  typescriptBabel = 'typescriptBabel',
}

export interface Tools {
  babel: boolean;
  eslint: boolean;
  lintStaged: boolean;
  prettier: boolean;
  typescript: boolean;
  typescriptBabel: boolean;
  [key: string]: boolean;
}
