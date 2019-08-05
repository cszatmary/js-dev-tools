export default {
  compilerOptions: {
    target: 'esnext',
    moduleResolution: 'node',
    allowJs: true,
    noEmit: true,
    strict: true,
    isolatedModules: true,
    esModuleInterop: true,
    baseUrl: '.',
    paths: {
      '*': ['node_modules/*', 'src/types/*'],
      '~/*': ['src/*'],
    },
  },
  include: ['src'],
  exclude: ['node_modules', 'build'],
};
