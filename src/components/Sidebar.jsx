
import {Link} from '../../site-generator/Link'

import {Invalid, Iddle, Loading, Ready} from './icons'


const LinkWithStatus = ({state, to, bundleSize, ...props}, children) => {


  const statusToSvg = {
    'invalid': Invalid,
    'iddle': () => <b>{bundleSize}</b>,
    'loading': Loading,
    'ready': Ready,
    'active': Ready
  }

  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(to))
  const active = to === state.location.path

  const status = !matchedRoute
    ? 'invalid'
    : !matchedRoute.view && !matchedRoute.loading
      ? 'iddle'
      : matchedRoute.loading
        ? 'loading'
        : active
          ? 'active'
          : 'ready'

  return (
    <Link class={'menu-link ' + status} state={state} to={to} {...props}>
      {children}
      {statusToSvg[status]()}
    </Link>
  )
}


export default ({state}) => (
  <aside class="aside">
    <div class="menu">
      <header role="banner">
        <h1>Hyperapp site generator</h1>
        <p>Static site boilerplate / framework with a fancy code splitting and navigation layer</p>
      </header>
      <nav role="navigation">
        <LinkWithStatus state={state} bundleSize="6kb" to="/">Home</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/project">The project</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/architecture">Architecture</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/counter">Counter</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/hurdles">Tech hurdles</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/pokemons">Pokemons</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/rickandmorty">Rick and morty characters</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/invalid">Invalid</LinkWithStatus>
      </nav>
    </div>
    <footer>
      Built with...
    </footer>
  </aside>
)
