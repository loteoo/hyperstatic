import queryString from 'query-string'
import {LoadRoute, ChangeLocation} from './effects'


// Sets a value to the given key in the state
export const ParseUrl = (state, {path, query}) => {

  // console.log('ParseURL', state);

  // Ignore trailing slashes EXPEPT for home page
  const withoutTrailingSlash = path !== '/' ? path.replace(/\/$/, '') : path
  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(withoutTrailingSlash))
  const matchParams = matchedRoute && matchedRoute.pattern.match(withoutTrailingSlash)
  const loaded = matchedRoute && matchedRoute.view

  // Set location params
  const next = {
    ...state,
    location: {
      route: matchedRoute && matchedRoute.route,
      params: matchParams || {},
      queryParams: queryString.parse(query),
      path: withoutTrailingSlash
    }
  }

  return (matchedRoute && !loaded) ? TriggerRouteLoad(next, withoutTrailingSlash) : next
}


const ViewLoaded = (state, {route, view, Init}) => {

  const loaded = {
    ...state,
    routes: {
      ...state.routes,
      [route]: {
        ...state.routes[route],
        view,
        loading: false
      }
    }
  }

  return Init ? Init(loaded) : loaded
}


// Navigate action
export const Navigate = (state, to) => {

  return to
    ? [state, ChangeLocation({to})]
    : state
}

export const TriggerRouteLoad = (state, path) => {

  const routes = Object.keys(state.routes).map(route => state.routes[route])

  const matchedRoute = routes.find(route => route.pattern.match(path))

  // console.log('TriggerRouteLoad', state)

  return [
    {
      ...state,
      routes: {
        ...state.routes,
        [matchedRoute.route]: {
          ...matchedRoute,
          loading: true
        }
      }
    },
    LoadRoute({
      action: ViewLoaded,
      route: matchedRoute.route,
      viewPromise: matchedRoute.viewPromise
    })
  ]
}
