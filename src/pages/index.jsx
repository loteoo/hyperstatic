import { h } from 'hyperapp'

// Import actions
const SetValue = (state, {key, value}) => ({
  ...state,
  meta: {
    ...state.meta,
    [key]: value
  }
})

const targetValue = event => event.target.value

const container = {
  maxWidth: '1024px',
  margin: '0 auto',
  padding: '1rem'
}

// Home page
export default state => (
  <main style={container}>
    <h2>Home page</h2>
    <h1>{state.meta.title}</h1>
    <p>{state.meta.description}</p>
    <input
      type="text"
      value={state.meta.title}
      oninput={[SetValue, ev => ({ key: 'title', value: targetValue(ev) })]}
    />
    <input
      type="text"
      value={state.meta.description}
      oninput={[SetValue, ev => ({ key: 'description', value: targetValue(ev) })]}
    />
    <h4>State: </h4>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </main>
)
