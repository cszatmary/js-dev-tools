// eslint-disable-next-line
'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const fs = require('fs-extra');
// eslint-disable-next-line
const spawnSync = require('child_process').spawnSync;

const paths = require('./paths');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Please specify either development or production.');
  process.exit(1);
}

// eslint-disable-next-line
process.env.NODE_ENV = args[0];

const targetDir = path.join(process.cwd(), 'test-dir');
const joinPath = name => path.join(targetDir, name);

fs.ensureDirSync(targetDir);

if (!args.includes('--no-clean')) {
  fs.emptyDirSync(targetDir);
}

process.env.INIT_CWD = targetDir;

fs.writeJsonSync(joinPath('package.json'), {});
fs.createFileSync(joinPath('yarn.lock'));

let command;
let commandArgs;

const force = args.includes('-f') || args.includes('--force');

if (process.env.NODE_ENV === 'development') {
  command = require.resolve(`${paths.appNodeModules}/.bin/ts-node`);
  commandArgs = [paths.appIndex, ...(force ? ['--force'] : [])];
} else {
  command = 'node';
  commandArgs = [paths.appBuildIndex, ...(force ? ['--force'] : [])];
}

const result = spawnSync(command, commandArgs, {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status);
