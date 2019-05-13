// eslint-disable-next-line
'use strict';

const fs = require('fs');
const path = require('path');

// Resolve paths relative to the root project directory
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('build'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/index'),
  appBuildIndex: resolveApp('build/index'),
  appNodeModules: resolveApp('node_modules'),
  yarnLockFile: resolveApp('yarn.lock'),
  appTsConfig: resolveApp('tsconfig.json'),
};
