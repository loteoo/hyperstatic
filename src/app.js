import { app } from 'hyperapp'
import {LocationChanged, ParseRoute} from '../site-generator/utils'

// Import CSS
import 'sanitize.css'
import './global.css'

// Import app
import init from './init'
import view from './view'

// Initialize the app
app({
  init,
  view,
  subscriptions: state => [LocationChanged({action: ParseRoute})],
  node: document.getElementById('app')
})

// Enable the service worker in production
if (process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register(`${window.location.origin}/sw.js`)
}
