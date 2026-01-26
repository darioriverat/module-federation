import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const basePath = env.VITE_PUBLIC_BASE_PATH || '/'

  return {
    base: basePath,
    plugins: [
      vue(),
      federation({
        name: 'federated_two',
        filename: 'two.js',
        exposes: {
          './main': path.resolve(__dirname, 'src/main.js')
        }
      })
    ],
    server: {
      port: 5182,
      host: '0.0.0.0'
    },
  }
})
