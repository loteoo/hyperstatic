
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


