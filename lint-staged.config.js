module.exports = {
  '*.{js,ts}': ['eslint --fix', 'git add'],
  '*.json': ['prettier --write', 'git add'],
  'yarn.lock': ['git rm --cached'],
};
