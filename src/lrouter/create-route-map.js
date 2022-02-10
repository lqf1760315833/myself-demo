

function addRouteRecord (routes, pathMap, parent) {
  routes.forEach(route => {
    const { path, children, ...rest } = route
    const normalizedPath = parent ? parent.path + '/' + path : path
    pathMap[normalizedPath] = { ...rest, path: normalizedPath, parent }
    if (children) addRouteRecord(children, pathMap, route)
  })
}

const createRouteMap = (routes, pathMap = {}) => {
  addRouteRecord(routes, pathMap)
  return pathMap
}

export default createRouteMap