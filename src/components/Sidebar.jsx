import { h } from 'hyperapp'

import {Link} from '../../site-generator/utils'


export default ({state}) => (
  <aside class="side-bar">
    <header role="banner">
      <h1>This site is fast</h1>
      <p>very fucking fast</p>
    </header>
    <nav role="navigation">
      <ul>
        {Object.keys(state.routes).map(route => {

          const info = state.routes[route]
          const routeState = !info.view && !info.loading
            ? 'Not loaded'
            : info.loading
              ? 'Loading'
              : 'Loaded!'


          return (
            <li>
              <Link to={route}>{routeState} - {route}</Link>
            </li>
          )
        })}
        <Link to="/item/83">/item/83</Link>
      </ul>
    </nav>
    <footer>
      Built with...
    </footer>
  </aside>
)
