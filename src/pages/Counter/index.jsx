import intro from './counter.md'

export const Init = (state) => ({
  ...state,
  counter: 0
})

const Increment = (state) => ({
  ...state,
  counter: state.counter + 1
})

const Decrement = (state) => ({
  ...state,
  counter: state.counter - 1
})

export default (state) => (
  <div key="counter">
    <div innerHTML={intro}></div>
    <div class="counter">
      <h2>Counter</h2>
      <h1>{state.counter}</h1>
      <button onclick={Decrement}>-</button>
      <button onclick={Increment}>+</button>
    </div>
  </div>
)
