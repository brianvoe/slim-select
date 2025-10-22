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
    lib: {
      entry: path.resolve(__dirname, 'src/slim-select/index.ts'),
      name: 'SlimSelect',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'slimselect.es.js'
        if (format === 'cjs') return 'slimselect.cjs.js'
        if (format === 'iife') return 'slimselect.iife.js'
        return 'slimselect.js' // UMD minified (default)
      }
    },
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'slimselect.css'
          return assetInfo.name || 'asset'
        },
        // Prevent Rollup from automatically splitting the library into multiple chunks
        // This ensures we get single files per format (UMD, ES, CJS, IIFE)
        manualChunks: undefined
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
