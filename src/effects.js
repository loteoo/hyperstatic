
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
const locationFx = (dispatch, { to }) => {
  if (to !== window.location.pathname) {
    // window.scrollTo(0, 0)
    history.pushState(null, '', to)
    dispatchEvent(new CustomEvent('pushstate'))
  }
}
export const ChangeLocation = ({ to }) => [locationFx, { to }]
