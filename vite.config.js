import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        thoughts: resolve(__dirname, 'thoughts.html'),
        pictures: resolve(__dirname, 'pictures.html'),
        calendar: resolve(__dirname, 'calendar.html')
      }
    }
  }
})