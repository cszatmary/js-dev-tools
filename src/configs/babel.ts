export default (useTypescript: boolean) => `module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: true,
          },
        },
      ],
      ${useTypescript ? `['@babel/preset-typescript'],` : ''}
    ],
    plugins: [
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      [
        'babel-plugin-module-resolver',
        {
          root: ['.'],
          alias: {},
        },
      ],
    ],
  };
};
`;
