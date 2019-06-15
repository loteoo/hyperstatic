import { h } from 'hyperapp'


const container = {
  maxWidth: '1024px',
  margin: '0 auto',
  padding: '1rem'
}


export default state => {
  if (state.pokemons) {
    const pokemon = state.pokemons.find(pokemon => pokemon.id == state.location.params.id)
    return (
      <main style={container}>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.img} alt={pokemon.name} />
        <h4>Data: </h4>
        <pre>{JSON.stringify(pokemon, null, 2)}</pre>
      </main>
    )
  }
}
