import typescript from '@rollup/plugin-typescript'

export default {
    plugins: [typescript()],
    input: './index.ts',
    output: [{
        file: '../../dist/slimselect.umd.js',
        format: 'umd'
    }]
}