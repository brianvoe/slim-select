import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default [
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: './index.ts',
    output: {
      file: '../../dist/slimselect.cjs.js',
      format: 'cjs',
      exports: 'default',
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          [
            '@babel/env',
            {
              modules: false,
              useBuiltIns: 'usage',
              targets: 'maintained node versions',
            },
          ],
        ],
      }),
    ],
  },

  // UMD build for browsers
  {
    input: './index.ts',
    output: [
      {
        name: 'SlimSelect',
        file: '../../dist/slimselect.js',
        format: 'umd',
      },
      {
        name: 'SlimSelect',
        file: '../../dist/slimselect.umd.js',
        format: 'umd',
      },
    ],
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
  },

  // UMD build for browsers minified with terser
  {
    input: './index.ts',
    output: [
      {
        name: 'SlimSelect',
        file: '../../dist/slimselect.min.js',
        format: 'umd',
      },
      {
        name: 'SlimSelect',
        file: '../../dist/slimselect.umd.min.js',
        format: 'umd',
      },
    ],
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },

  // ES module build for modern browsers
  {
    input: './index.ts',
    output: {
      file: '../../dist/slimselect.es.js',
      format: 'es',
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
  },

  // IIFE build for modern browsers
  {
    input: './index.ts',
    output: {
      name: 'SlimSelect',
      file: '../../dist/slimselect.global.js',
      format: 'iife',
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
  },
]
