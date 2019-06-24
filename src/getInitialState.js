import UrlPattern from 'url-pattern'

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



export const getInitialState = (routes, extraInit) => {

  const init = {
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

  return ParseUrl(init, window.location.pathname + window.location.search)

}

