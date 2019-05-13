import { Tools } from './getTools';

const babelDependencies = [
  '@babel/cli',
  '@babel/core',
  '@babel/node',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-async-to-generator',
  '@babel/preset-env',
];

const eslintDependencies = (
  useTypescript: boolean,
  useBabel: boolean,
  usePrettier: boolean,
): string[] => [
  'eslint',
  'eslint-config-airbnb',
  'eslint-plugin-import',
  ...(useBabel ? ['babel-eslint', 'eslint-plugin-babel'] : []),
  ...(usePrettier ? ['eslint-config-prettier', 'eslint-plugin-prettier'] : []),
  ...(useTypescript
    ? ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']
    : []),
];

const lintStagedDependencies = ['husky', 'lint-staged'];

const prettierDependencies = ['prettier'];

const typescriptDependencies = ['@babel/preset-typescript', 'typescript'];

export default (tools: Tools): string[] => [
  ...babelDependencies,
  ...eslintDependencies(tools.typescript, tools.babel, tools.prettier),
  ...lintStagedDependencies,
  ...prettierDependencies,
  ...typescriptDependencies,
];
