export default {
  '/': import('./pages/Home'),
  '/project': import('./pages/Project'),
  '/starter': import('./pages/Starter'),
  '/counter': import('./pages/Counter'),
  '/pokedex': import('./pages/Pokedex'),
  '/books': import('./pages/Books/BookSearch'),
  '/books/:id': import('./pages/Books/Book')
}
