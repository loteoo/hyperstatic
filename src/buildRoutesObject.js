import UrlPattern from 'url-pattern'

// Build routes object
export const buildRoutesObject = (routes) => Object.keys(routes).reduce((routesObj, route) => ({
  ...routesObj,
  [route]: {
    ...routesObj[route],
    route,
    bundlePromise: routes[route],
    pattern: new UrlPattern(route)
  }
}), window.initialState ? window.initialState.routes : {})
