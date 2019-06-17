import { h } from 'hyperapp'

import {Link} from '../../site-generator/utils'

import {Invalid, Iddle, Loading, Ready} from './icons'

const statusToSvg = {
  'invalid': Invalid,
  'iddle': Iddle,
  'loading': Loading,
  'ready': Ready
}

const LinkWithStatus = ({state, to, ...props}, children) => {

  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(to))

  const status = !matchedRoute
    ? 'invalid'
    : !matchedRoute.view && !matchedRoute.loading
      ? 'iddle'
      : matchedRoute.loading
        ? 'loading'
        : 'ready'

  return (
    <Link class={'menu-link ' + status} state={state} to={to} {...props}>
      {statusToSvg[status]()}
      {children}
    </Link>
  )
}


export default ({state}) => (
  <aside class="aside">
    <div class="menu">
      <header role="banner">
        <h1>Hyperapp site generator</h1>
        <p>Hyperapp based static site generator + routing / code splitting layer</p>
      </header>
      <nav role="navigation">
        <ul>
          <li><LinkWithStatus state={state} to="/">Home</LinkWithStatus></li>
          <li><LinkWithStatus state={state} to="/project">The project</LinkWithStatus></li>
          <li><LinkWithStatus state={state} to="/architecture">Architecture</LinkWithStatus></li>
          <li><LinkWithStatus state={state} to="/counter">Counter</LinkWithStatus></li>
          <li><LinkWithStatus state={state} to="/hurdles">Tech hurdles</LinkWithStatus></li>
          <li><LinkWithStatus state={state} to="/pokemons">Pokemons</LinkWithStatus></li>
          <li><LinkWithStatus state={state} to="/rickandmorty">Rick and morty characters</LinkWithStatus></li>
          <li><LinkWithStatus state={state} to="/invalid">Invalid</LinkWithStatus></li>
        </ul>
      </nav>
    </div>
    <footer>
      Built with...
    </footer>
  </aside>
)
