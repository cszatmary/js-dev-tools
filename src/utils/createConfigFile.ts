import { stringify } from 'javascript-stringify';

// Like JSON.stringify but returns a exported js object
export default (data: any): string =>
  `module.exports = ${stringify(data, undefined, 2)};`;
