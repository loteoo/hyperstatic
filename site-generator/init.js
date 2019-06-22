import UrlPattern from 'url-pattern'

import routes from '../src/routes'
import userInit from '../src/init'

import {ParseUrl} from './actions'

// Build routes object
const routesData = Object.keys(routes).reduce((pages, route) => ({
  ...pages,
  [route]: {
    ...(window.firstRenders && window.firstRenders[route] && {
      firstRender: window.firstRenders[route]
    }),
    route,
    viewPromise: routes[route],
    pattern: new UrlPattern(route)
  }
}), {})

// Initial state of the app
const init = {
  meta: {
    title: 'Page title',
    description: 'Page description'
  },
  location: {
    path: '/',
    params: {},
    queryParams: {},
    route: null
  },
  routes: routesData,
  ...userInit
}

const withParsedUrl = ParseUrl(init, {
  path: window.location.pathname,
  query: window.location.search
})

export default withParsedUrl
