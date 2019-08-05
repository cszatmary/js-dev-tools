#!/usr/bin/env node

/* eslint-disable */

var chalk = require('chalk');
var semver = require('semver');

var currentNodeVersion = process.versions.node;

if (semver.lt(currentNodeVersion, '8.0.0')) {
  console.log(
    chalk.red(
      `You are running Node ${currentNodeVersion}.\n` +
      'config-gen requires Node 8 or higher.\n' +
      'Please update your version of Node.',
    ),
  );

  process.exit(1);
}

require('./js-dev-tools');
