import fetch from 'node-fetch'

// Return URLs that need to be rendered
export default async (pages) => {

  // Omit specific pages
  pages = pages.filter(page => page !== '/apod')

  // Fetch pokemons
  const pokemonPages = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    .then(response => response.json())
    .then(data => data.pokemon.map(pokemon => `/pokemons/${pokemon.id}`))

  // Add to array
  pages = pages.concat(pokemonPages)

  return pages
}
