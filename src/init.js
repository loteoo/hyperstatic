

import routes from './routes'

import {SetPath} from '../site-generator/utils'

const routesData = Object.keys(routes).reduce((pages, route) => ({
  ...pages,
  [route]: {
    route,
    viewPromise: routes[route]
  }
}), {})

// Initial state of the app
const init = {
  meta: {
    title: 'Hyperapp 2.0',
    description: '1 kB JavaScript micro-framework for building declarative web applications'
  },
  location: {
    path: '/',
    params: {},
    queryParams: {}
  },
  routes: routesData
}


export default SetPath(init, window.location.pathname)
