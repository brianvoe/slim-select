import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './index.ts',
  output: [
    // Default umd
    {
      name: 'SlimSelect',
      file: '../../dist/slimselect.js',
      format: 'umd',
      sourcemap: true,
    },
    {
      name: 'SlimSelect',
      file: '../../dist/slimselect.es.js',
      format: 'es',
      sourcemap: true,
    },
    {
      name: 'SlimSelect',
      file: '../../dist/slimselect.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      name: 'SlimSelect',
      file: '../../dist/slimselect.global.js',
      format: 'iife',
      sourcemap: true,
    },
    {
      name: 'SlimSelect',
      file: '../../dist/slimselect.umd.js',
      format: 'umd',
      sourcemap: true,
    },
  ],
  plugins: [typescript(), terser()],
}
