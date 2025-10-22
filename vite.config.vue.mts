import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    emptyOutDir: false, // package.json rimraf ./dist/*
    lib: {
      entry: path.resolve(__dirname, 'src/slim-select/vue/index.ts'),
      name: 'SlimSelectVue',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.js'}`
    },
    outDir: path.resolve(__dirname, 'dist/vue'),
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      include: ['src/slim-select/vue/**/*'],
      exclude: ['src/slim-select/**/*.test.ts', 'src/docs/**/*']
    })
  ]
})
