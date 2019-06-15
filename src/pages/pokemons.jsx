import { h } from 'hyperapp'

import {FetchPokedex} from '../actions'
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


export const onLoad = FetchPokedex
