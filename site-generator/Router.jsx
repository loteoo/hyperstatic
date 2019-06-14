


// Component
export default state => {

  const match = state.routes[state.location.path]

  if (match) {
    if (match.view) {
      return match.view(state)
    } else {
      return 'loading...'
    }
  }
}

