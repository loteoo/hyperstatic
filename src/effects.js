
// Load bundle FX
const loadBundleFx = (dispatch, { action, bundlePromise, path }) =>
  bundlePromise.then(importedModule => {
    dispatch(action, {
      path,
      bundle: importedModule
    })
  })

export const LoadBundle = ({ action, bundlePromise, path }) => [loadBundleFx, { action, bundlePromise, path }]

// Change location FX
const historyFx = (dispatch, { to }) => {
  history.pushState(null, '', to)
}
export const UpdateHistory = ({ to }) => [historyFx, { to }]
