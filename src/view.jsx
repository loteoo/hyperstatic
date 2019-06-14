import { h } from 'hyperapp'

import Router from '../site-generator/Router'


import {ChangeLocation} from './utils'



// root view
export default state => {
  console.log(state)
  return (
    <div>
      {Object.keys(state.routes).map(route => (
        <button onmousedown={state => [state, ChangeLocation({to: route})]}>{route}</button>
      ))}
      <button onmousedown={state => [state, ChangeLocation({to: '404'})]}>404</button>
      Root app view.
      Pages:
      {Router(state)}
    </div>
  )
}
