import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const env = import.meta.env.MODE;
const host_one = import.meta.env.VITE_DEV_APP_ONE_HOST;
const host_one_port = import.meta.env.VITE_DEV_APP_ONE_HOST_PORT;
const host_two = import.meta.env.VITE_DEV_APP_TWO_HOST;
const host_two_port = import.meta.env.VITE_DEV_APP_TWO_HOST_PORT;

/**
 * Remote number one
 *
 * This dynamic import cannot be analyzed by Vite.
 * See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations for supported dynamic import formats.
 * The comment inside the import() call to suppress this warning.
 */
const remote_one_url = host_one + (host_one_port ? `:${host_one_port}` : '');
const remote_one_loader = (env == 'development')
  ? () => import(/* @vite-ignore */ `${remote_one_url}/src/main.js`)
  : () => import('remote_one/main');

let remote_one_module = await remote_one_loader()
remote_one_module = (env == 'production') ? remote_one_module.default : remote_one_module
remote_one_module.mountComponent({elementId: '#app_one'})

/**
 * Remote number two
 */
const remove_two_url = host_two + (host_two_port ? `:${host_two_port}` : '');
const remote_two_loader = (env == 'development')
  ? () => import(/* @vite-ignore */ `${remove_two_url}/src/main.js`)
  : () => import('remote_two/main');

let remote_two_module = await remote_two_loader()
remote_two_module = (env == 'production') ? remote_two_module.default : remote_two_module
remote_two_module.mountComponent({elementId: '#app_two'})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
