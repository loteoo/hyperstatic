export default {
  '/': import('./pages/Home'),
  '/project': import('./pages/Project'),
  '/starter': import('./pages/Starter'),
  '/counter': import('./pages/Counter'),
  '/hurdles': import('./pages/Hurdles'),
  '/rickandmorty': import('./pages/RickAndMorty'),
  '/pokemons': import('./pages/Pokemons'),
  '/pokemons/:id': import('./pages/Pokemon')
}
