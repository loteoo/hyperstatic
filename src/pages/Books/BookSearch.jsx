import { css } from 'emotion'
import { targetValue } from '../../utils'
import { Init as BookInit, SearchBooks } from './actions'
import BookPreview from './BookPreview'
import description from './description.md'


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


  return (
    <div class={pageStyle}>
      <div innerHTML={description}></div>
      <label for="search">Search for a book</label>
      <input
        id="search"
        name="search"
        value={state.books.search}
        oninput={[SearchBooks, targetValue]}
      />
      <div>
        {!state.books.results
          ? <h4>Search for any existing book!</h4>
          : state.books.results === 0
            ? <h4>No results</h4>
            : (
              <div>
                <h4>{state.books.total} books found!</h4>
                <div class="grid">
                  {state.books.results.map(id => <BookPreview book={state.books.books[id]} state={state} />)}
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}



export const Init = BookInit
