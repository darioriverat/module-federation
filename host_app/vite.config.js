import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd())
  const host_one = env.VITE_APP_ONE_HOST;
  const host_one_port = env.VITE_APP_ONE_HOST_PORT;
  const host_two = env.VITE_APP_TWO_HOST;
  const host_two_port = env.VITE_APP_TWO_HOST_PORT;
  const remote_one_url = host_one + (host_one_port ? `:${host_one_port}` : '');
  const remote_two_url = host_two + (host_two_port ? `:${host_two_port}` : '');

  return {
    plugins: [
      react(),
      federation({
        name: 'federation_host',
        remotes: {
          remote_one: `${remote_one_url}/one.js`,
          remote_two: `${remote_two_url}/two.js`
        }
      })
    ],
    server: {
      port: 5180,
      host: '0.0.0.0'
    },
  }
})
