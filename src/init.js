

import routes from './routes'


const routesData = Object.keys(routes).reduce((pages, route) => ({
  ...pages,
  [route]: {
    route,
    viewPromise: routes[route]
  }
}), {})

// Initial state of the app
export default {
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
