


// Component
export default state => {
  console.log(state)

  const match = state.routes[state.location.path]

  if (match) {
    console.log("matched");
    if (match.view) {
      return match.view(state)
    } else {
      return 'loading...'
    }
  }
}

