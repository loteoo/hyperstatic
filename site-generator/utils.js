import { h } from 'hyperapp'

// Load route FX
const loadRouteFx = (dispatch, { action, route, viewPromise }) => viewPromise.then(imported => dispatch([action, {route, view: imported.default}]))
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
    dispatch([props.action, window.location.pathname])
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

// Link component
export const Link = ({to, ...props}, children) => (
  <a
    href={to}
    onclick={[Navigate, ev => {
      ev.preventDefault()
      return to
    }]}
    {...props}
  >
    {children}
  </a>
)

// Router component
export const Router = state => {

  const match = state.routes[state.location.path]

  if (match) {
    if (match.view) {
      return match.view(state)
    } else {
      return 'loading...'
    }
  }
}




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

