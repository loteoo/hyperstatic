import { h } from 'hyperapp'


const container = {
  maxWidth: '1024px',
  margin: '0 auto',
  padding: '1rem'
}


export default state => (
  <main style={container}>
    <h2>Item page</h2>
    <p>Item id: <b>{state.location.params.id}</b></p>
  </main>
)
