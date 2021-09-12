import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import analyze from 'rollup-plugin-analyzer'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const banner = `/*!
 * structs v${pkg.version}
 * ${pkg.description}
 * Copyright (c) ${new Date().getFullYear()} Mayank Verma
 * Released under the MIT License
 */`

const plugins = [
  typescript({ tsconfig: './tsconfig.json' }),
  cleanup({ comments: false, lineEndings: 'unix' }),
  analyze({ summaryOnly: true }),
]

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  // UMD builds
  // lib/index.min.js
  // lib/index.js
  {
    input: 'src/index.ts',
    plugins,
    output: {
      name: 'structs',
      file: 'lib/index.js',
      format: 'umd',
      banner,
    },
  },
  {
    input: 'src/index.ts',
    plugins: [
      ...plugins,
      terser({
        format: { comments: false, preamble: banner },
        mangle: { keep_classnames: true, keep_fnames: true },
      }),
    ],
    output: {
      name: 'structs',
      file: 'lib/index.min.js',
      format: 'umd',
    },
  },
  // CJS and ESM builds
  // lib/index.cjs.js
  // lib/index.esm.js
  {
    input: 'src/index.ts',
    plugins,
    output: [
      { file: 'lib/index.cjs.js', format: 'cjs', banner },
      { file: 'lib/index.esm.js', format: 'esm', banner },
    ],
  },
  // Type definition file
  // lib/index.d.ts
  {
    input: 'lib/dts/index.d.ts',
    plugins: [dts()],
    output: [{ file: 'lib/index.d.ts', format: 'esm', banner }],
  },
]

export default config
