import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: false,
  build: {
    target: 'es2020',
    lib: {
      entry: path.resolve(__dirname, 'src/slim-select/index.ts'),
      name: 'SlimSelect',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'slimselect.es.js'
        if (format === 'cjs') return 'slimselect.cjs.js'
        return 'slimselect.umd.js'
      }
    },
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'slimselect.css'
          return assetInfo.name || 'asset'
        }
      }
    }
  },
  plugins: [
    dts({
      rollupTypes: true,
      outDir: path.resolve(__dirname, 'dist'),
      entryRoot: path.resolve(__dirname, 'src/slim-select'),
      tsconfigPath: path.resolve(__dirname, 'src/slim-select/tsconfig.json'),
      exclude: [path.resolve(__dirname, 'src/slim-select/**/*.test.ts')]
    })
  ]
})
