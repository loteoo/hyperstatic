import fx from '../utils/fx'

/**
 * Every time the browser's location changes,
 * trigger the given action with the new location as params
 */
const onRouteChanged = fx((dispatch, action) => {
  const handleLocationChange = () => {
    dispatch(action, window.location.pathname + window.location.search)
  }
  addEventListener('pushstate', handleLocationChange)
  addEventListener('popstate', handleLocationChange)
  return () => {
    removeEventListener('pushstate', handleLocationChange)
    removeEventListener('popstate', handleLocationChange)
  }
})

export default onRouteChanged
