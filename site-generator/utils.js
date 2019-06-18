import { h } from 'hyperapp'


import queryString from 'query-string'


// Load route FX
const loadRouteFx = (dispatch, { action, route, viewPromise }) =>
  viewPromise.then(importedModule => {
    dispatch([action, {
      route,
      view: importedModule.default,
      Init: importedModule.Init
    }])
  })

export const LoadRoute = ({action, route, viewPromise}) => [loadRouteFx, { action, route, viewPromise }]


// Change location FX
const locationFx = (dispatch, { to }) => {
  history.pushState(null, '', to)
  dispatchEvent(new CustomEvent('pushstate'))
}
export const ChangeLocation = ({to}) => [locationFx, { to }]





// Location Subscription
const subFx = a => b => [a, b]
export const LocationChanged =  subFx((dispatch, props) => {
  const handleLocationChange = ev => {
    dispatch([props.action, {
      path: window.location.pathname,
      query: window.location.search
    }])
  }
  addEventListener('pushstate', handleLocationChange)
  addEventListener('popstate', handleLocationChange)
  return () => {
    removeEventListener('pushstate', handleLocationChange)
    removeEventListener('popstate', handleLocationChange)
  }
})




// Navigate action
const Navigate = (state, to, ev) => {
  return [
    state,
    ChangeLocation({to})
  ]
}

const TriggerRouteLoad = (state, path) => {

  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(path))

  console.log('TriggerRouteLoad')

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

// Link component
export const Link = ({to, state, ...props}, children) => {

  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(to))
  const loaded = matchedRoute && matchedRoute.view

  const attributes = {
    href: to,
    onmousedown: [Navigate, to],
    onclick: [
      state => state,
      ev => {
        ev.preventDefault()
      }
    ],
    ...(matchedRoute && !loaded && {onmouseover: [TriggerRouteLoad, to]}),
    ...props
  }

  return h('a', attributes, children)
}

// Router component
export const Router = state => {

  const match = state.routes[state.location.route]

  if (match) {
    if (match.view) {
      return match.view(state)
    } else {
      return 'loading...'
    }
  }

  return '404'
}




// Sets a value to the given key in the state
export const ParseUrl = (state, {path, query}) => {

  // Ignore trailing slashes EXPEPT for home page
  const withoutTrailingSlash = path !== '/' ? path.replace(/\/$/, '') : path

  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(withoutTrailingSlash))
  const match = matchedRoute && matchedRoute.pattern.match(withoutTrailingSlash)
  const loaded = matchedRoute && matchedRoute.view

  // Set
  const next = {
    ...state,
    location: {
      route: matchedRoute && matchedRoute.route,
      params: match || {},
      queryParams: queryString.parse(query),
      path: withoutTrailingSlash
    }
  }



  return matchedRoute && !loaded ? TriggerRouteLoad(next, path) : next
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



