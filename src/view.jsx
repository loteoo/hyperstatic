import { h } from 'hyperapp'

import Router from '../site-generator/Router'



// root view
export default state => (
  <div>
    Root app view
    {Router(state)}
  </div>
)

