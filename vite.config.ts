import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/plugin.ts'),
      name: 'OrnamentUI',
      fileName: (format) => `ornament.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.join(__dirname, 'src')
      }
    ]
  }
})
