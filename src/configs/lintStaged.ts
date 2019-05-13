export default (
  useTypescript: boolean,
  useEslint: boolean,
  usePrettier: boolean,
) => ({
  ...(useEslint
    ? { [useTypescript ? '*.{js,ts}' : '*.js']: ['eslint --fix', 'git add'] }
    : {}),
  ...(usePrettier && !useEslint
    ? {
        [useTypescript ? '*.{js,ts,json}' : '*.{js,json}']: [
          'prettier --write',
          'git add',
        ],
      }
    : {}),
  ...(usePrettier && useEslint
    ? { '*.json': ['prettier --write', 'git add'] }
    : {}),
});
