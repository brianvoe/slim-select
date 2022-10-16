import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
    input: './index.ts',
    output: [{
        name: 'SlimSelect',
        file: '../../dist/slimselect.umd.js',
        format: 'umd',
        sourcemap: true
    }],
    plugins: [typescript(), terser()]
}