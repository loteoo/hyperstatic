import { h } from 'hyperapp'

import Home from './pages/index'



// Root view
export default state => (
  <div>
    App here
    {state.location.path === '' && Home(state)}
  </div>
)
