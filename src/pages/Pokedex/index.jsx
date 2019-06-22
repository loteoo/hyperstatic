import description from './description.md'
import {targetValue} from '../../utils'
import {grid, card, searchField} from './styles'
import {SetPokeSearch, ClearSearch, Init as PokedexInit} from './actions'

export default state => (
  <div>
    <div innerHTML={description}></div>
    <label for="searchField">Search pokemons</label>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <input
        id="searchField"
        name="searchField"
        style={searchField}
        value={state.pokeSearch}
        oninput={[SetPokeSearch, targetValue]}
        placeholder="Type here..."
      />
      {state.pokeSearch && <a style={{margin: '1rem', cursor: 'pointer', textDecoration: 'underline'}} onclick={ClearSearch}>Clear</a>}
    </div>
    <div style={grid}>
      {state.pokemons
        ? state.pokemons
        .filter(pokemon => pokemon.name.toLowerCase().includes(state.pokeSearch.toLowerCase()))
        .map(pokemon => (
          <div style={card}>
            <img src={pokemon.img} alt={pokemon.name} />
            <div style={{padding: '0 1rem'}}>
              <h3 style={{margin: '0'}}>{pokemon.name}</h3>
              <p style={{margin: '0'}}><small>Height:</small> {pokemon.height}</p>
              <p style={{margin: '0'}}><small>Weight:</small> {pokemon.weight}</p>
              <p style={{margin: '0'}}><small>Types: {pokemon.type.map(type => <b>{type}, </b>)}</small></p>
            </div>
          </div>
        ))
        : 'Pokemons are loading!'
      }
    </div>
  </div>
)

export const Init = PokedexInit
