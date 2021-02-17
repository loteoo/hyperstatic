import SetPathStatus from './SetPathStatus';

interface InitializePathArgs {
  location: LocationState
  bundle: any;
}

const InitializePath = (state: State, { location, bundle }: InitializePathArgs) => {
  const { path } = location;

  // If current path is already initiated, do nothing
  if (state.paths[path] === 'ready') {
    return state;
  }

  // If current path doesn't have an "init" to run
  if (typeof bundle?.init !== 'function') {

    // Set as ready
    return SetPathStatus(state, { path, status: 'ready' })
  }

  // Compute next state or action tuple using the provided "init" action
  const action = bundle?.init(
    state,
    location
  )

  // If has init has side-effects
  if (Array.isArray(action)) {

    // Get only the "loadStatic" effect tuples
    const loadEffects = action.slice(1).filter((fx => fx[0].fxName === 'loadStatic'))

    // If this page has data requirements
    if (loadEffects.length > 0) {

      // Set path as fetching
      action[0] = SetPathStatus(action[0], { path, status: 'fetching' })

      // Set the path for the effect
      loadEffects.forEach(fx => fx[1].path = path)
    }

    return action
  }

  return SetPathStatus(action, { path, status: 'ready' })
}

export default InitializePath
