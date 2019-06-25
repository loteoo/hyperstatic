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

  // TODO: find something better than this... (no oncreate event when re-hydrating)
  // Use init effect instead
  setTimeout(() => {
    document.querySelectorAll('a').forEach(link => {
      link.dispatchEvent(
        new CustomEvent('triggerrouteload')
      )
    })
  }, 50);

  return ParseUrl(init, window.location.pathname + window.location.search)
}
