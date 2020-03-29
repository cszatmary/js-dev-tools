export default {
  compilerOptions: {
    module: "commonjs",
    esModuleInterop: true,
    target: "es2016",
    lib: ["es7"],
    strict: true,
    moduleResolution: "node",
    sourceMap: false,
    rootDir: "src",
    outDir: "build",
    baseUrl: ".",
    paths: {
      "*": ["node_modules/*", "src/types/*"],
    },
  },
  include: ["src"],
  exclude: ["node_modules", "build"],
};
