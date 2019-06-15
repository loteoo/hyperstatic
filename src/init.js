

import UrlPattern from 'url-pattern'

import routes from './routes'

import {ParseUrl} from '../site-generator/utils'

const routesData = Object.keys(routes).reduce((pages, route) => ({
  ...pages,
  [route]: {
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
  routes: routesData
}


export default ParseUrl(init, {
  path: window.location.pathname,
  query: window.location.search
})
