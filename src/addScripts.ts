import { Tools } from "./utils/tools";

export default function (packageJson: any, tools: Tools): void {
  const scripts = {
    ...(tools.babel
      ? {
          build: `babel src -d build ${
            tools.typescriptBabel ? "--extensions '.js,.ts'" : ""
          }`,
        }
      : {}),
    ...(tools.typescript
      ? {
          build: "tsc",
        }
      : {}),
    ...(tools.typescriptBabel ? { "check-types": "tsc" } : {}),
    ...(tools.eslint
      ? {
          lint: `eslint ${
            tools.typescript || tools.typescriptBabel ? "--ext=js,ts" : ""
          } ./src`,
          "lint:fix": `eslint --fix ${
            tools.typescript || tools.typescriptBabel ? "--ext=js,ts" : ""
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
