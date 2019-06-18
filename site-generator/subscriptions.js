

// LocationChanged Subscription
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

