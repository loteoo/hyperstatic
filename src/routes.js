export default {
  '/': import('./pages/Home'),
  '/about': import('./pages/About'),
  '/architecture': import('./pages/Architecture'),
  '/hurdles': import('./pages/Hurdles'),
  '/rickandmorty': import('./pages/RickAndMorty'),
  '/pokemons': import('./pages/Pokemons'),
  '/pokemons/:id': import('./pages/Pokemon')
}
