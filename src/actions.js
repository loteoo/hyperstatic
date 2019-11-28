import { LoadBundle, UpdateHistory } from './effects'

import { getPathInfo } from './utils'

export const ParseUrl = (state, path) => {
  // Set location params
  const pathInfo = getPathInfo(state, path)
  const next = {
    ...state,
    location: pathInfo
  }

  // If route exists and isn't loaded, load it
  return (pathInfo.route && !pathInfo.loaded)
    ? TriggerPageLoad(next, pathInfo.path)
    : next
}

const BundleLoaded = (state, { path, bundle }) => {
  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(path))

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
    const markedAsInitiated = {
      ...withBundleLoaded,
      pageData: {
        ...withBundleLoaded.pageData,
        [path]: {
          ...withBundleLoaded.pageData[path],
          initiated: true
        }
      }
    }

    return bundle.Init(
      markedAsInitiated,
      getPathInfo(withBundleLoaded, path)
    )
  }

  return withBundleLoaded
}

// Navigate action
export const Navigate = (state, to) => window.location.pathname === to
  ? state
  : [ParseUrl(state, to), UpdateHistory({ to })]

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
