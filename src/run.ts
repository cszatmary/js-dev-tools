import fs from 'fs-extra';
import path from 'path';
import { cwd, exitFailure, exitSuccess } from '@cszatma/process-utils';

import isSafeToRun from './utils/isSafeToRun';
import createConfigs from './utils/createConfigs';
import getTools from './getTools';
import install from './utils/install';
import dependencies from './dependencies';
import addScripts from './addScripts';

interface CliOptions {
  force: boolean;
}

export default async function run(options: CliOptions): Promise<void> {
  const targetDir = cwd();

  // Make sure it's a clean directory
  if (!options.force && !isSafeToRun(targetDir)) {
    exitFailure(
      'Error: Unable to setup tools without overwriting existing configs.',
    );
  }

  const packageJsonPath = path.join(targetDir, 'package.json');

  // Make sure there is a package.json
  if (!fs.existsSync(packageJsonPath)) {
    exitFailure('Error: No package.json file. Please create one first.');
  }

  const useYarn = fs.existsSync(path.join(targetDir, 'yarn.lock'));
  const tools = await getTools();

  console.log('Creating config files...');

  createConfigs(tools).forEach(config => {
    const fileName = path.join(targetDir, config.name);
    fs.writeFileSync(fileName, config.value);
  });

  const packageJson = fs.readJsonSync(packageJsonPath);
  addScripts(packageJson, tools);
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

  console.log('Installing dependencies...');

  await install(useYarn, dependencies(tools), targetDir);

  exitSuccess('✅  Finished setting up tools. Enjoy!\n');
}
