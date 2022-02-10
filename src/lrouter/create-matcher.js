
import createRouteMap from './create-route-map'

function createRoute (route) {
  const matched = []
  while (route) {
    matched.unshift(route)
    route = route.parent
  }
  return matched
}

const createMatcher = (routes) => {
  const pathMap = createRouteMap(routes)
  const match = (path) => {
    return createRoute(pathMap[path])
  }
  return { match }
}


export default createMatcher