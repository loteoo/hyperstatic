/**
 * Static GraphQL query
 * In development mode, will hit real APIs over HTTP.
 * Once built, your code will hit pre-rendered JSON files
 */

const graphQLEffect = (dispatch, { url, query, action, error }) => {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
    .then(data => {
      if (window.navigator.userAgent === 'puppeteer') {
        window.staticData = {
          ...window.staticData,
          [query]: data
        }
      }
      dispatch(action, data)
    })
    .catch(err => dispatch(error, err))
}

export const StaticQuery = ({ url, query, action, error }) => [graphQLEffect, { url, query, action, error }]
