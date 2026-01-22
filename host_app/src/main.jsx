import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const env = import.meta.env.MODE;
const host_one = import.meta.env.VITE_APP_ONE_HOST;

const remote_one_location = (env == 'development')
  ? `${host_one}/src/main.js`
  : 'remote_one/one';

const remote_one_loader = import(remote_one_location)
const remote_one_module = await remote_one_loader

remote_one_module.mountComponent({elementId: '#app_one'})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
