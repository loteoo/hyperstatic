

// Router component
export const Router = state => {

  const match = state.routes[state.location.route]

  if (!match) {
    return '404'
  }

  if (match.view) {
    return match.view(state)
  }

  if (match.firstRender) {
    console.log('Used first render')
    return match.firstRender
  }

  console.log('Loading view...')
  return 'loading...'
}





