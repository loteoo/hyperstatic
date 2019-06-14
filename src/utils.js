
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
