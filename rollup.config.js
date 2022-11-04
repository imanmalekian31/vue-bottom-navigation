import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-import-css'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/library.mjs',
        exports: 'named'
      },
      {
        format: 'cjs',
        file: 'dist/library.js',
        exports: 'named'
      }
    ],
    external: ['vue-router'],
    plugins: [
      vue(),
      peerDepsExternal(),
      css({ minify: true, output: 'dist/style.css' }),
      terser(),
      nodeResolve()
    ]
  }
]
