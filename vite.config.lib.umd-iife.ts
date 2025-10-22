import { defineConfig } from 'vite'
import path from 'path'

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
      entry: path.resolve(__dirname, 'src/slim-select/index.umd.ts'),
      name: 'SlimSelect',
      formats: ['umd', 'iife'],
      fileName: (format) => (format === 'iife' ? 'slimselect.iife.js' : 'slimselect.js')
    },
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        exports: 'default',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'slimselect.css'
          return assetInfo.name || 'asset'
        },
        banner: '/*! SlimSelect - Advanced select dropdown */',
        footer: '/*! End SlimSelect */'
      }
    }
  }
})
