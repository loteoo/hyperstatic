
import {Link} from '../../site-generator/Link'

import {Invalid, Loading, Check} from './icons'


const LinkWithStatus = ({state, to, bundleSize, ...props}, children) => {


  const statusToSvg = {
    'invalid': Invalid,
    'iddle': () => <span>{bundleSize}</span>,
    'loading': Loading,
    'ready': Check,
    'active': Check
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
    <Link scrollToTop class={'menu-link ' + status} state={state} to={to} {...props}>
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
        <p>Static site generator with a fancy code splitting and navigation layer</p>
      </header>
      <nav role="navigation">
        <LinkWithStatus state={state} bundleSize="6kb" to="/">Home</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/project">The project</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/starter">Starter template</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/counter">Counter</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/todo-list">Todo list</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/pokemons">Pokemons</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/rickandmorty">Rick and morty characters</LinkWithStatus>
        <LinkWithStatus state={state} bundleSize="6kb" to="/invalid">Invalid</LinkWithStatus>
      </nav>
    </div>
  </aside>
)
