import { h } from 'hyperapp'


import {FetchPokedex} from '../actions'

export default state => {
  if (state.pokemons) {
    const pokemon = state.pokemons.find(pokemon => pokemon.id == state.location.params.id)
    return (
      <main class="container">
        <h2>{pokemon.name}</h2>
        <img src={pokemon.img} alt={pokemon.name} />
        <h4>Data: </h4>
        <pre>{JSON.stringify(pokemon, null, 2)}</pre>
      </main>
    )
  }
}


export const onLoad = FetchPokedex
