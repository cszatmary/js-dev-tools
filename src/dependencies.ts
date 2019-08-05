import { Tools } from './utils/tools';

const babelDependencies = (useTypescript: boolean): string[] => [
  '@babel/cli',
  '@babel/core',
  '@babel/node',
  '@babel/plugin-proposal-class-properties',
  '@babel/preset-env',
  'babel-plugin-module-resolver',
  ...(useTypescript ? ['@babel/preset-typescript'] : []),
];

const eslintDependencies = (
  useTypescript: boolean,
  useBabel: boolean,
  usePrettier: boolean,
): string[] => [
  'eslint',
  'eslint-config-airbnb',
  'eslint-plugin-import',
  ...(useBabel && !useTypescript
    ? ['babel-eslint', 'eslint-plugin-babel']
    : []),
  ...(useBabel ? ['eslint-import-resolver-babel-module'] : []),
  ...(usePrettier ? ['eslint-config-prettier', 'eslint-plugin-prettier'] : []),
  ...(useTypescript
    ? [
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-import-resolver-typescript',
      ]
    : []),
];

const lintStagedDependencies = ['husky', 'lint-staged'];

const prettierDependencies = ['prettier'];

const typescriptDependencies = ['typescript'];

export default (tools: Tools): string[] => [
  ...(tools.babel ? babelDependencies(tools.typescriptBabel) : []),
  ...(tools.eslint
    ? eslintDependencies(tools.typescript, tools.babel, tools.prettier)
    : []),
  ...(tools.lintStaged ? lintStagedDependencies : []),
  ...(tools.prettier ? prettierDependencies : []),
  ...(tools.typescript ? typescriptDependencies : []),
];
