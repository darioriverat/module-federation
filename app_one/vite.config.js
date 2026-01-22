import federation from '@originjs/vite-plugin-federation'
import { defineConfig } from 'vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'federated_one',
      filename: 'one.js',
      // exposed modules
      exposes: {
        './main.js': path.resolve(__dirname, 'src/main.js'),
      }
    })
  ],
  server: {
    port: 5181,
    host: '0.0.0.0'
  },
})
