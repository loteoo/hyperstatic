/**
 * Static fetch effect
 * In development mode, will hit real APIs over HTTP.
 * Once built, your code will hit pre-rendered JSON files
 */

const fetchFx = (dispatch, { url, action, error }) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (window.navigator.userAgent === 'puppeteer') {
        window.staticData = {
          ...window.staticData,
          [url]: data
        }
      }
      dispatch(action, data)
    })
    .catch(err => dispatch(error, err))
}

export const StaticFetch = ({ url, action, error }) => [fetchFx, { url, action, error }]
