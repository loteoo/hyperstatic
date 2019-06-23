import { css } from 'emotion'
import { targetValue } from '../../utils'
import { Init as BookInit, SearchBooks } from './actions'
import BookPreview from './BookPreview'


const pageStyle = css`
  input {
    padding: 0.5rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
    margin: 1rem 0;
  }
`

export default (state) => {

  const results = state.books.books
    ? Object.keys(state.books.books).map(id => state.books.books[id])
    : []

  return (
    <div class={pageStyle}>
      <h2>Find a Book</h2>
      <label for="search">Search for a book</label>
      <input
        id="search"
        name="search"
        value={state.books.search}
        oninput={[SearchBooks, targetValue]}
      />
      <div>
        {!state.books.books
          ? <h4>Search for any existing book!</h4>
          : results.length === 0
            ? <h4>No results</h4>
            : (
              <div>
                <h4>{state.books.total} books found!</h4>
                <div class="grid">
                  {results.map(book => <BookPreview book={book} state={state} />)}
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}



export const Init = BookInit
