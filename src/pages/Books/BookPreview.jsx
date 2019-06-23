import { css } from 'emotion'

import {Link} from '../../../site-generator/Link'

const style = css`
  display: block;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  .top {
    display: flex;
    align-items: center;
    .img {
      max-width: 96px;
      img {
        width: 100%;
      }
    }
  }
  .info {
    margin-left: 1rem;
    .title {
      margin: 0;
    }
    .author {
      margin-top: 1rem;
      p {
        margin: 0;
      }
    }
  }
`




export default ({book, state}) => (
  <Link to={`/books/${book.id}`} state={state} class={style}>
    <div class="top">
      <div class="img">
        {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />}
      </div>
      <div class="info">
        <h3 class="title">{book.volumeInfo.title}</h3>
        <small>{book.volumeInfo.subtitle}</small>
        <div class="author">
          <p>Written By: </p>
          {book.volumeInfo.authors && book.volumeInfo.authors.map((author => (
            <span>{author}, </span>
          )))}
        </div>
      </div>
    </div>
    <p class="description">{book.volumeInfo.description && book.volumeInfo.description.substring(0, 150)}...</p>
  </Link>
)
