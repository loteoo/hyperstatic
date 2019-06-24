import queryString from 'query-string'

export const getPathInfo = (state, path) => {
  const parts = path.split('?')
  const pathName = parts[0]
  const query = parts[1]

  // Ignore trailing slashes EXPEPT for home page
  const withoutTrailingSlash = pathName !== '/' ? pathName.replace(/\/$/, '') : pathName
  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(withoutTrailingSlash))
  const matchParams = matchedRoute && matchedRoute.pattern.match(withoutTrailingSlash)
  const loaded = matchedRoute && matchedRoute.view

  return {
    path: withoutTrailingSlash,
    params: matchParams || {},
    query: query || '',
    queryParams: queryString.parse(query),
    route: matchedRoute && matchedRoute.route, // Route pattern, ex: /products/:id
    loaded: !!loaded
  }
}
