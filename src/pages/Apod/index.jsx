import { css } from 'emotion'
import description from './description.md'
import {Http, preloadImage} from '../../utils'

const style = css`
  .viewer {
    img {
      width: 100%;
    }
  }
`

export default (state) => (
  <div class={style}>
    <div innerHTML={description}></div>
    {state.apod
      ? (
        <div class="viewer">
          <h1>{state.apod.title}</h1>
          <img src={state.apod.url} alt={state.apod.title} />
          <p>{state.apod.explanation}</p>
        </div>
      )
      : <p>Loading picture...</p>
    }
  </div>
)


const HandlePicture = (state, data) => {
  preloadImage
  return {
    ...state,
    apod: data
  }
}

export const Init = (state) => [
  state,
  Http.get({
    url: 'https://api.nasa.gov/planetary/apod?api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2',
    action: HandlePicture
  })
]

