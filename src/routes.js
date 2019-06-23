export default {
  '/': import('./pages/Home'),
  '/project': import('./pages/Project'),
  '/starter': import('./pages/Starter'),
  '/counter': import('./pages/Counter'),
  '/pokedex': import('./pages/Pokedex'),
  '/apod': import('./pages/Apod'),
  '/books': import('./pages/Books/BookSearch'),
  '/books/:id': import('./pages/Books/Book'),
}
