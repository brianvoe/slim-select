import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
    emptyOutDir: false, // package.json rimraf ./dist/*
    lib: {
      entry: path.resolve(__dirname, 'src/slim-select/react/index.tsx'),
      name: 'SlimSelectReact',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.js'}`
    },
    outDir: 'dist/react',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      include: ['src/slim-select/react/index.tsx'],
      exclude: ['src/slim-select/**/*.test.ts', 'src/docs/**/*']
    })
  ]
})
