import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.join(__dirname, 'src')
      }
    ]
  }
})
