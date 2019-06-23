
import {Http} from '../../utils'

// Nested setter helper
const Setter = (state, fragment) => ({
  ...state,
  books: {
    ...state.books,
    ...fragment
  }
})

export const Init = (state) => Setter(state, {
  search: '',
  isFetching: false,
  total: 0
})

export const SearchBooks = (state, search) => {
  if (search) {
    return [
      Setter(state, {
        search,
        isFetching: true
      }),
      Http.get({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + search,
        action: HandleResults
      })
    ]
  }
  return state
}

const HandleResults = (state, response) => Setter(state, {
  isFetching: false,
  books: response.items.reduce((books, book) => ({...books, [book.id]: book}), state.books.books),
  total: response.totalItems
})


export const LoadBookIfNeeded = (state, location) => {
  if (state.books && state.books.books && state.books.books[location.params.id]) {
    return state
  }
  return [
    state,
    Http.get({
      url: 'https://www.googleapis.com/books/v1/volumes/' + location.params.id,
      action: HandleBook
    })
  ]
}

const HandleBook = (state, response) => Setter(state, {
  books: {
    ...(state.books ? state.books.books : {}),
    [response.id]: response
  }
})
