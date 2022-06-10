import vue from "rollup-plugin-vue";
import css from "rollup-plugin-import-css";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: [
      {
        format: "esm",
        file: "dist/library.mjs",
      },
      {
        format: "cjs",
        file: "dist/library.js",
      },
    ],
    plugins: [
      vue(),
      peerDepsExternal(),
      css({ minify: true, output: "dist/style.css" }),
      terser(),
    ],
  },
];
