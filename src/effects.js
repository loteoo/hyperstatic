
// Load route FX
const loadRouteFx = (dispatch, { action, route, viewPromise, path }) =>
  viewPromise.then(importedModule => {
    dispatch([action, {
      path,
      route,
      view: importedModule.default,
      Init: importedModule.Init
    }])
  })

export const LoadRoute = ({action, route, viewPromise, path}) => [loadRouteFx, { action, route, viewPromise, path }]









// Change location FX
const locationFx = (dispatch, { to }) => {
  history.pushState(null, '', to)
  dispatchEvent(new CustomEvent('pushstate'))
}
export const ChangeLocation = ({to}) => [locationFx, { to }]


