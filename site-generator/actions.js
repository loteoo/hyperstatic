import {LoadRoute, ChangeLocation} from './effects'

import {getPathInfo} from './utils'

// Sets a value to the given key in the state
export const ParseUrl = (state, path) => {

  const location = getPathInfo(state, path)

  // Set location params
  const next = {
    ...state,
    location
  }

  return (location.route && !location.loaded) ? TriggerRouteLoad(next, location.path) : next
}


const ViewLoaded = (state, {route, view, Init, path}) => {

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

  const location = getPathInfo(loaded, path)

  return Init ? Init(loaded, location) : loaded
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
      path,
      action: ViewLoaded,
      route: matchedRoute.route,
      viewPromise: matchedRoute.viewPromise
    })
  ]
}
