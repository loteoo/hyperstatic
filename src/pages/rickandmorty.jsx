import { h } from 'hyperapp'
import {Link} from '../../site-generator/utils'
import { Http, preloadImage } from '../utils'

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
  display: 'flex',
  alignItems: 'center',
  border: '1px solid var(--border-color)',
  borderRadius: '.5rem',
  overflow: 'hidden'
}


export default state => (
  <main style={container}>
    <h2>All pokemons:</h2>
    <div style={grid}>
      {state.rickAndMortyCharacters && state.rickAndMortyCharacters.map(character => (
        <Link state={state} to={`/rickandmorty/${character.id}`} style={card}>
          <img style={{maxWidth: '100px', marginRight: '1rem'}} src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
        </Link>
      ))}
    </div>
  </main>
)



export const HandleRickAndMortyCharacters = (state, response) => {
  response.results.forEach(char => preloadImage(char.image))
  return {
    ...state,
    rickAndMortyCharacters: response.results
  }
}

export const FetchRickAndMortyCharacters = (state) => {
  return state.rickAndMortyCharacters
    ? state
    : [
      state,
      Http.get({
        url: 'https://rickandmortyapi.com/api/character/',
        action: HandleRickAndMortyCharacters
      })
    ]
}


export const onLoad = FetchRickAndMortyCharacters
