

import {Http, preloadImage} from './utils'


export const HandlePokedex = (state, response) => {
  const pokemons = response.pokemon.map(pokemon => ({
    ...pokemon,
    img: pokemon.img.replace('http://', 'https://')
  }))
  pokemons.forEach(p => preloadImage(p.img))
  return {
    ...state,
    pokemons
  }
}

export const FetchPokedex = (state) => {

  return state.pokemons
    ? state
    : [
      state,
      Http.get({
        url: 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json',
        action: HandlePokedex
      })
    ]

}
