export function babel(useTypescript: boolean): object {
  const config = {
    presets: [
      [
        "@babel/env",
        {
          targets: {
            node: "12",
          },
        },
      ],
    ],
  };

  if (useTypescript) {
    config.presets.push(["@babel/typescript"]);
  }

  return config;
}

export function eslint(): {
  extends: string[];
} {
  return {
    extends: ["@cszatma"],
  };
}

export function lintStaged(
  useTypescript: boolean,
  usePrettier: boolean,
): Record<string, string[]> {
  if (usePrettier) {
    return {
      [useTypescript ? "*.{js,ts,json}" : "*.{js,json}"]: ["prettier --write"],
    };
  }

  return {};
}

export function prettier(): {
  trailingComma: "all";
} {
  return {
    trailingComma: "all",
  };
}

interface TSConfig {
  compilerOptions: {
    esModuleInterop: boolean;
    moduleResolution: "node";
    strict: boolean;
    allowJs?: boolean;
    isolatedModules?: boolean;
    noEmit?: boolean;
    target?: "esnext" | "es2016";
    lib?: string[];
    module?: "commonjs";
    outDir?: string;
    rootDir?: string;
    sourceMap?: boolean;
  };
  include: string[];
  exclude: string[];
}

export function tsconfig(useBabel: boolean): TSConfig {
  const config: TSConfig = {
    compilerOptions: {
      esModuleInterop: true,
      moduleResolution: "node",
      strict: true,
    },
    include: ["src"],
    exclude: ["node_modules", "build"],
  };

  if (useBabel) {
    config.compilerOptions = {
      ...config.compilerOptions,
      allowJs: true,
      isolatedModules: true,
      noEmit: true,
      target: "esnext",
    };

    return config;
  }

  config.compilerOptions = {
    ...config.compilerOptions,
    lib: ["es7"],
    module: "commonjs",
    outDir: "build",
    rootDir: "src",
    sourceMap: false,
    target: "es2016",
  };

  return config;
}
