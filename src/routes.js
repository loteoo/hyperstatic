export default {
  '/': import('./pages/index'),
  '/about': import('./pages/about'),
  '/contact': import('./pages/contact'),
  '/pokemons': import('./pages/pokemons'),
  '/pokemons/:id': import('./pages/pokemon')
}
