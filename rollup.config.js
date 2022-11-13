import vue from "rollup-plugin-vue";
import css from "rollup-plugin-import-css";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        format: "esm",
        file: "dist/library.mjs",
        exports: "named",
      },
      {
        format: "cjs",
        file: "dist/library.js",
        exports: "named",
      },
    ],
    external: ["vue-router", "vue"],
    plugins: [
      vue(),
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: "ESNext",
      }),
      peerDepsExternal(),
      css({ minify: true, output: "dist/style.css" }),
      terser(),
      nodeResolve(),
    ],
  },
];
