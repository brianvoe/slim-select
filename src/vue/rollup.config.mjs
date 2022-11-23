import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: './slimselect.vue',
    output: {
      format: 'es',
      file: './dist/slimselectvue.es.js',
    },
    external: ['vue', 'slim-select'],
    plugins: [resolve(), typescript({ clean: true }), vue()],
  },

  // SSR build.
  {
    input: './slimselect.vue',
    output: {
      exports: 'auto',
      format: 'cjs',
      file: './dist/slimselectvue.ssr.js',
    },
    external: ['vue', 'slim-select'],
    plugins: [resolve(), typescript({ clean: true }), vue({ template: { optimizeSSR: true } })],
  },

  // Browser build.
  {
    input: './slimselect.vue',
    output: {
      name: 'SlimSelectVue',
      format: 'iife',
      file: './dist/slimselectvue.global.js',
      globals: {
        vue: 'vue',
        'slim-select': 'slim-select',
      },
    },
    external: ['vue', 'slim-select'],
    plugins: [resolve(), typescript({ clean: true }), vue()],
  },
]
