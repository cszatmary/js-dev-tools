module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb/base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-explicit-any': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/order': ['off'],
    'prettier/prettier': ['error'],
    'no-console': ['off'],
  },
};
