
export default {
  '/': import('./pages/index'),
  '/about': import('./pages/about'),
  '/items/:id': import('./pages/item') // TODO: parse routes
}

