import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

export function mountComponent({ elementId }) {
    createApp(App).mount(elementId)
}
