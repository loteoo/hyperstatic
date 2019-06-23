import UrlPattern from 'url-pattern'

import routes from '../src/routes'
import extraInit from '../src/init'

import {ParseUrl} from './actions'

// Build routes object
const buildRoutesObject = (routes) => Object.keys(routes).reduce((routesObj, route) => ({
  ...routesObj,
  [route]: {
    ...routesObj[route],
    route,
    viewPromise: routes[route],
    pattern: new UrlPattern(route)
  }
}), window.initialState ? window.initialState.routes : {})

// Initial state of the app
const init = {
  meta: {
    title: 'Page title',
    description: 'Page description'
  },
  location: {
    path: '/',
    params: {},
    queryParams: {},
    route: null
  },
  ...extraInit,
  ...window.initialState,
  routes: buildRoutesObject(routes),
}

const withParsedUrl = ParseUrl(init, window.location.pathname + window.location.search)

export default withParsedUrl
