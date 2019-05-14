import { Tools } from './getTools';

export default function(packageJson: any, tools: Tools): void {
  const scripts = {
    ...(tools.babel
      ? {
          build: `babel src -d build ${
            tools.typescript ? "--extensions '.js,.ts'" : ''
          }`,
        }
      : {}),
    ...(tools.typescript ? { 'check-types': 'tsc' } : {}),
    ...(tools.eslint
      ? {
          lint: `eslint ${tools.typescript ? '--ext=js,ts' : ''} ./src`,
          'lint:fix': `eslint --fix ${
            tools.typescript ? '--ext=js,ts' : ''
          } ./src`,
        }
      : {}),
  };

  // eslint-disable-next-line no-param-reassign
  packageJson.scripts = {
    ...scripts,
    ...(packageJson.scripts || {}),
  };
}
