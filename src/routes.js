
import Home from './pages/index'
import About from './pages/about'
import Item from './pages/item'


export default {
  '/': Home,
  '/about': About,
  '/items/:id': Item // TODO: parse routes
}

