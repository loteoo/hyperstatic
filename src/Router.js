import { h } from 'hyperapp'

// import serialize from 'serialize-javascript'
import htmlToVdom from './htmlToVdom'

// Router component
export const Router = state => {
  // State pre-fetching testing
  // if (window.navigator.userAgent === 'puppeteer') {

  //   let scriptTag = document.getElementById('initial-state')

  //   if (!scriptTag) {
  //     scriptTag = document.createElement('script')
  //     document.body.appendChild(scriptTag)
  //   }

  //   scriptTag.id = 'initial-state'
  //   scriptTag.text = `
  //     window.initialState = ${serialize(state)}
  //   `
  // }

  const matchedRoute = state.routes[state.location.route]

  if (!matchedRoute) {
    return '404'
  }


  const pageData = state.pageData[state.location.path]

  if (matchedRoute.view) {
    if (!matchedRoute.initAction) {
      return h('div', { id: 'router-outlet' }, [
        matchedRoute.view(state)
      ])
    } else {
      if (pageData && pageData.initiated) {
        return h('div', { id: 'router-outlet' }, [
          matchedRoute.view(state)
        ])
      }
    }
  }

  const previousOutlet = document.getElementById('router-outlet')
  if (previousOutlet) {
    // console.log('Keeping existing HTML while view loads...')
    return h('div', { id: 'router-outlet' }, [
      htmlToVdom(previousOutlet.innerHTML)
    ])
  }

  // console.log('Loading view...')
  return 'Loading...'
}
