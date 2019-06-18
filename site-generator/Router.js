

// Router component
export const Router = state => {

  const match = state.routes[state.location.route]

  if (match) {
    if (match.view) {
      return match.view(state)
    } else {
      return 'loading...'
    }
  }

  return '404'
}





