

// Router component
export const Router = state => {

  // TODO: move this somewhere else
  if (window.navigator.userAgent === 'puppeteer') {
    let scriptTag = document.getElementById('initialState')

    if (!scriptTag) {
      scriptTag = document.createElement('script')
      document.body.appendChild(scriptTag)
    }

    scriptTag.id = 'initialState'
    scriptTag.text = `
      window.initialState = ${JSON.stringify(state)}
    `
  }

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





