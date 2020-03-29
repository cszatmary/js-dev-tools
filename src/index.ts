#!/usr/bin/env node

/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-template */

var chalk = require("chalk");

var nodeVersion = process.versions.node;
var majorVersion = parseInt(nodeVersion.split(".")[0], 10);

if (majorVersion < 10) {
  console.log(
    chalk.red(
      "You are running Node " +
        nodeVersion +
        ".\n" +
        "config-gen requires Node 8 or higher.\n" +
        "Please update your version of Node.",
    ),
  );

  process.exit(1);
}

require("./js-dev-tools");
