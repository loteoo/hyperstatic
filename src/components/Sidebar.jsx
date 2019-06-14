import { h } from 'hyperapp'

import {ChangeLocation} from '../utils'


const Navigate = (state, to, ev) => {
  console.log(to)
  return [
    state,
    ChangeLocation({to})
  ]
}

export default ({routes}) => (
  <aside class="side-bar">
    <header role="banner">
      <h1>This site is fast</h1>
      <p>very fucking fast</p>
    </header>
    <nav role="navigation">
      <ul>
        {Object.keys(routes).map(route => (
          <li>
            <button onmousedown={[Navigate, route, ev => ev.preventDefault()]}>{route}</button>
          </li>
        ))}
      </ul>
    </nav>
    <footer>
      Built with...
    </footer>
  </aside>
)
