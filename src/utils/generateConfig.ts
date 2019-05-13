import babelConfig from '../configs/babel';
import eslintConfig from '../configs/eslint';
import lintStagedConfig from '../configs/lintStaged';
import prettierConfig from '../configs/prettier';
import tsConfig from '../configs/tsconfig';
import createConfigFile from './createConfigFile';

const babel = (useTypescript: boolean): string =>
  babelConfig(useTypescript)
    .split('\n')
    .filter(line => !/^\s+$/gm.test(line))
    .join('\n');

const eslint = (
  useTypescript: boolean,
  useBabel: boolean,
  usePrettier: boolean,
): string =>
  createConfigFile(eslintConfig(useTypescript, useBabel, usePrettier));

const lintStaged = (
  useTypescript: boolean,
  useEslint: boolean,
  usePrettier: boolean,
): string =>
  createConfigFile(lintStagedConfig(useTypescript, useEslint, usePrettier));

const prettier = (): string => createConfigFile(prettierConfig);

const typescript = (): string => JSON.stringify(tsConfig, null, 2);

export default {
  babel,
  eslint,
  lintStaged,
  prettier,
  typescript,
};
