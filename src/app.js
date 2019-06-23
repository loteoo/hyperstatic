import { app } from 'hyperapp'
import {LocationChanged} from '../site-generator/subscriptions'
import {ParseUrl} from '../site-generator/actions'

// Import CSS
import 'sanitize.css'
import './global.css'

// Import app
import init from '../site-generator/init'
import view from './view'

// Initialize the app
app({
  init,
  view,
  subscriptions: state => [
    LocationChanged({action: ParseUrl})
  ],
  node: document.getElementById('app')
})

// Enable the service worker in production
// if (process.env.NODE_ENV === 'production') {
//   navigator.serviceWorker.register(`${window.location.origin}/sw.js`)
// }
