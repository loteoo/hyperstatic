
import {LoadRoute} from './utils'


// Sets a value to the given key in the state
export const SetPath = (state, path) => {

  const next = {
    ...state,
    location: {
      ...state.location,
      path
    }
  }


  const match = state.routes[path]

  if (match) {
    return [
      next,
      LoadRoute({
        action: ViewLoaded,
        route: match.route,
        viewPromise: match.viewPromise
      })
    ]
  }

  return next
}







const ViewLoaded = (state, {route, view}) => ({
  ...state,
  routes: {
    ...state.routes,
    [route]: {
      ...state.routes[route],
      view
    }
  }
})




