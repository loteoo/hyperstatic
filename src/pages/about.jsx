import { h } from 'hyperapp'


const container = {
  maxWidth: '1024px',
  margin: '0 auto',
  padding: '1rem'
}

// Home page
export default state => (
  <main style={container}>
    <h2>About page</h2>
    <p>{state.meta.title}</p>
  </main>
)
