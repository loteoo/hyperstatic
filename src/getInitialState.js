import UrlPattern from 'url-pattern'

import { ParseUrl } from './actions'

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


 // TODO: use something more reliable
const connSpeed = navigator.connection ? navigator.connection.downlink : 10
const goodConnection = window.navigator.userAgent === 'puppeteer'
  ? false
  : connSpeed > 2


export const getInitialState = (routes, extraInit) => {
  const init = {
    goodConnection,
    location: {
      path: '/',
      params: {},
      queryParams: {},
      route: null
    },
    ...extraInit,
    ...window.initialState,
    routes: buildRoutesObject(routes)
  }

  return ParseUrl(init, window.location.pathname + window.location.search)
}
