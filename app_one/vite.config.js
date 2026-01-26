import federation from '@originjs/vite-plugin-federation'
import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const basePath = env.VITE_PUBLIC_BASE_PATH || '/'

  return {
    base: basePath,
    plugins: [
      federation({
        name: 'federated_one',
        filename: 'one.js',
        // exposed modules
        exposes: {
          './main': path.resolve(__dirname, 'src/main.js'),
        }
      })
    ],
    server: {
      port: 5181,
      host: '0.0.0.0'
    },
  }
})
