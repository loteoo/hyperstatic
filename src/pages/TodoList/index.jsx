

export default (state) => (
  <div key="counter">
    <div innerHTML={markdown}></div>
    <div class="counter">
      <h2>Counter</h2>
      <h1>{state.counter}</h1>
      <button onclick={Decrement}>-</button>
      <button onclick={Increment}>+</button>
    </div>
  </div>
)
