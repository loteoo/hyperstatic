import { LoadBundle, ChangeLocation } from './effects'

import { getPathInfo } from './utils'

// Sets a value to the given key in the state
export const ParseUrl = (state, path) => {
  const pathInfo = getPathInfo(state, path)

  // Set location params
  const next = {
    ...state,
    location: pathInfo
  }

  return (pathInfo.route && !pathInfo.loaded) ? TriggerPageLoad(next, pathInfo.path) : next
}

const BundleLoaded = (state, { path, bundle }) => {

  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(path))

  if (path === '/counter') {
    console.log(bundle);
  }

  const withBundleLoaded = {
    ...state,
    routes: {
      ...state.routes,
      [matchedRoute.route]: {
        ...matchedRoute,
        view: bundle.default,
        initAction: bundle.Init,
        loading: false
      }
    }
  }


  if (bundle.Init) {
    const pathInfo = getPathInfo(withBundleLoaded, path)
    const withPageInitiated = {
      ...withBundleLoaded,
      pageData: {
        ...withBundleLoaded.pageData,
        [path]: {
          ...withBundleLoaded.pageData[path],
          initiated: true
        }
      }
    }
    return bundle.Init(withPageInitiated, pathInfo)
  }

  return withBundleLoaded
}

// Navigate action
export const Navigate = (state, to) => [
  state,
  ChangeLocation({ to })
]

export const TriggerPageLoadIfGoodConnection = (state, path) => {
  if (state.goodConnection) {
    return TriggerPageLoad(state, path)
  }

  return state
}

export const TriggerPageLoad = (state, path) => {
  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(path))

  const pageData = state.pageData[path]


  // console.log('TriggerPageLoad', state)

  if (matchedRoute && !matchedRoute.view && !matchedRoute.loading) {
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
      LoadBundle({
        path,
        action: BundleLoaded,
        bundlePromise: matchedRoute.bundlePromise
      })
    ]
  }


  if (matchedRoute && matchedRoute.view && !pageData && matchedRoute.initAction) {
    return matchedRoute.initAction({
      ...state,
      pageData: {
        ...state.pageData,
        [path]: {
          ...pageData,
          initiated: true
        }
      }
    })
  }

  return state

}
