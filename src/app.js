import { app } from 'hyperapp'

// Import CSS
import 'sanitize.css'
import './global.css'

// Import app
import init from './init'
import view from './view'

// Initialize the app
app({ init, view, node: document.body })

// Enable the service worker in production
if (process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register(`${window.location.origin}/sw.js`)
}
