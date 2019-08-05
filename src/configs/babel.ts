export default (useTypescript: boolean) => ({
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '12',
        },
      },
    ],
    ...(useTypescript ? ['@babel/typescript'] : []),
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '~': './src',
        },
        extensions: ['.js', ...(useTypescript ? ['.ts'] : [])],
      },
    ],
  ],
});
