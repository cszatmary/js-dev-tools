export default (
  useTypescript: boolean,
  useBabel: boolean,
  usePrettier: boolean,
) => ({
  ...(useBabel || useTypescript
    ? {
        parser: useTypescript ? '@typescript-eslint/parser' : 'babel-eslint',
        parserOptions: {
          ecmaVersion: 2018,
          sourceType: 'module',
          ...(useTypescript ? { project: 'tsconfig.json' } : {}),
        },
      }
    : {}),
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb/base',
    ...(usePrettier ? ['prettier'] : []),
    'plugin:import/errors',
    'plugin:import/warnings',
    ...(useTypescript
      ? ['plugin:import/typescript', 'plugin:@typescript-eslint/recommended']
      : []),
    ...(useTypescript && usePrettier ? ['prettier/@typescript-eslint'] : []),
  ],
  plugins: [
    ...(useTypescript ? ['@typescript-eslint'] : []),
    ...(usePrettier ? ['prettier'] : []),
  ],
  rules: {
    ...(useTypescript
      ? {
          '@typescript-eslint/no-var-requires': ['off'],
          '@typescript-eslint/explicit-function-return-type': [
            'error',
            { allowExpressions: true, allowTypedFunctionExpressions: true },
          ],
          '@typescript-eslint/no-explicit-any': ['off'],
        }
      : {}),
    'import/no-extraneous-dependencies': ['off'],
    'import/order': ['off'],
    ...(usePrettier ? { 'prettier/prettier': ['error'] } : {}),
    'no-console': ['off'],
  },
  ...(useBabel
    ? {
        settings: {
          'import/resolver': {
            'babel-module': {
              extensions: ['.js', ...(useTypescript ? ['.ts'] : [])],
            },
          },
        },
      }
    : {}),
});
