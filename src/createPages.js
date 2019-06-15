import fetch from 'node-fetch'

export default async () => {

  const data = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    .then(response => response.json())

  return data.pokemon.map(pokemon => `/pokemons/${pokemon.id}`)

}
