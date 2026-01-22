import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

const env = process.env.NODE_ENV;

const remote_one_path = (env == 'development')
  ? 'src/main.js'
  : 'one.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'federation_host',
      remotes: {
        remote_one: `http://localhost:5181/${remote_one_path}`
      }
    })
  ],
  server: {
    port: 5180,
    host: '0.0.0.0'
  },
})
