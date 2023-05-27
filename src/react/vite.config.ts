import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'vite-plugin-dts'

const formatNameMap = {
  iife: 'global',
  cjs: 'ssr',
  es: 'es',
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      skipDiagnostics: true,
    }),
  ],
  build: {
    target: 'modules',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/index.ts',
      formats: ['es', 'cjs', 'iife'],
      name: 'SlimSelectReact',
      // the proper extensions will be added
      fileName: (format) => `slimselectreact.${formatNameMap[format]}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['react', 'react-dom'],
      plugins: [
        peerDepsExternal(),
        babel({
          babelHelpers: 'bundled',
          presets: ['@babel/preset-env', '@babel/preset-react'],
          exclude: '../../node_modules/',
        }),
        commonjs(),
      ],
      output: {
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
