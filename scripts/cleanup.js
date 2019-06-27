// eslint-disable-next-line
'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const fs = require('fs-extra');

const targetDir = path.join(process.cwd(), 'test-dir');

fs.removeSync(targetDir);
