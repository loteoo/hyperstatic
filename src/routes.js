export default {
  '/': import('./pages/index'),
  '/about': import('./pages/about'),
  '/architecture': import('./pages/architecture'),
  '/hurdles': import('./pages/hurdles'),
  '/rickandmorty': import('./pages/rickandmorty'),
  '/pokemons': import('./pages/pokemons'),
  '/pokemons/:id': import('./pages/pokemon')
}
