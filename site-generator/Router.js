import { h } from 'hyperapp'

// import serialize from 'serialize-javascript'
import htmlToVdom from './htmlToVdom'

// Router component
export const Router = state => {

  // window.state = state

  // // TODO: move this somewhere else
  // if (window.navigator.userAgent === 'puppeteer') {


  //   let scriptTag = document.getElementById('initialState')

  //   if (!scriptTag) {
  //     scriptTag = document.createElement('script')
  //     document.body.appendChild(scriptTag)
  //   }

  //   scriptTag.id = 'initialState'
  //   scriptTag.text = `
  //     window.initialState = ${serialize(state)}
  //   `
  // }

  const match = state.routes[state.location.route]

  if (!match) {
    return '404'
  }

  if (match.view) {
    // console.log('Used view function')
    return h('div', {id: 'router-outlet'}, [
      match.view(state)
    ])
  }

  const previousOutlet = document.getElementById('router-outlet')
  if (previousOutlet) {
    // console.log('Keeping existing HTML while view loads...')
    return h('div', {id: 'router-outlet'}, [
      htmlToVdom(previousOutlet.innerHTML)
    ])
  }

  // console.log('Loading view...')
  return 'Loading...'
}





