// ==================
// Global routes
// ==================



// Sets a value to the given key in the state
export const SetPath = (state, path) => {

  console.log('SetPath');
  console.log(state);



  const next = {
    ...state,
    location: {
      ...state.location,
      path
    }
  }


  console.log(state);

  const match = state.routes[path]

  if (match) {
    return [
      next,
      LoadRoute(match)
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




const fx = (dispatch, { route, viewPromise }) => viewPromise.then(imported => dispatch([ViewLoaded, {route, view: imported.default}]))

const LoadRoute = ({route, viewPromise}) => [fx, { route, viewPromise }]
