import { h } from 'hyperapp'

import {Http} from '../utils'
import { Link } from '../../site-generator/utils';

const container = {
  maxWidth: '1024px',
  margin: '0 auto',
  padding: '1rem'
}


const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gridGap: '1rem'
}


const card = {
  border: '1px solid var(--border-color)',
  borderRadius: '.5rem',
}


export default state => (
  <main style={container}>
    <h2>All pokemons:</h2>
    <div style={grid}>
      {state.pokemons && state.pokemons.map(pokemon => (
        <Link to={`/pokemons/${pokemon.id}`} style={card}>
          <img src={pokemon.img} alt={pokemon.name} />
          <span>{pokemon.name}</span>
        </Link>
      ))}
    </div>
  </main>
)


const preloadImage = (url) => {
  const img = new Image()
  img.src = url
}

const HandlePokedex = (state, response) => {
  response.pokemon.forEach(p => preloadImage(p.img))
  return {
    ...state,
    pokemons: response.pokemon
  }
}

export const onLoad = (state) => [
  state,
  Http.get({
    url: 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json',
    action: HandlePokedex
  })
]
