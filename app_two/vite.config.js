import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'federated_two',
      filename: 'two.js',
      exposes: {
        './main.js': path.resolve(__dirname, 'src/main.js')
      }
    })
  ],
  server: {
    port: 5182,
    host: '0.0.0.0'
  },
})
