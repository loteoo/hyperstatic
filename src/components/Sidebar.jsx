import { h } from 'hyperapp'

import {Link} from '../../site-generator/utils'


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
            <Link to={route}>{route}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <footer>
      Built with...
    </footer>
  </aside>
)
