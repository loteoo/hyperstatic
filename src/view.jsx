import { h } from 'hyperapp'

import Router from '../site-generator/Router'


import {SetPath} from './actions'



// root view
export default state => (
  <div>
    {Object.keys(state.routes).map(route => (
      <button onmousedown={[SetPath, route]}>{route}</button>
    ))}
    <button onmousedown={[SetPath, "404"]}>404</button>
    Root app view.
    Pages:
    {Router(state)}
  </div>
)

