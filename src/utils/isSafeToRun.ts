import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

export default function isSafeToRun(rootPath: string): boolean {
  const invalidFiles = [
    '.babelrc.js',
    '.eslintignore',
    '.eslintrc.js',
    '.prettierignore',
    'lint-staged.config.js',
    'prettier.config.js',
    'tsconfig.json',
  ];

  const conflicts = fs
    .readdirSync(rootPath)
    .filter(file => invalidFiles.includes(file));

  if (conflicts.length < 1) {
    return true;
  }

  console.log(
    `The directory ${chalk.cyan(
      path.dirname(rootPath),
    )} contains files that could conflict:\n`,
  );

  conflicts.forEach(conflict => console.log(`  ${conflict}`));

  console.log(
    '\nIf you wish to continue anyway rerun this program with "-f" or "--force".',
  );

  return false;
}
