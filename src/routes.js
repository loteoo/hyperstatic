export default {
  '/': import('./pages/index'),
  '/about': import('./pages/about'),
  '/contact': import('./pages/contact'),
  '/item/:id': import('./pages/item')
}
