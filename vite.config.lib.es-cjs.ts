import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    minify: true,
    sourcemap: true,
    emptyOutDir: false, // package.json rimraf ./dist/*
    lib: {
      entry: path.resolve(__dirname, 'src/slim-select/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'slimselect.es.js' : 'slimselect.cjs.js')
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
      exclude: [path.resolve(__dirname, 'src/slim-select/**/*.test.ts')]
    })
  ]
})
