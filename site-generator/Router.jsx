
import routes from '../src/routes'

export const getMatch = path => {
  if (routes[path]) {
    return routes[path]
  }
}

// Component
export default state => {
  const match = getMatch(state.location.path)

  if (match) {
    return match(state)
  }
}

