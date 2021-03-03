/**
 * Turn a query string into an object
 *
 * Ex: ?a=2&b=3 becomes:
 *
 * {
 *    a: 2,
 *    b: 3
 * }
 *
 */
const parseQueryString = (qs: string) => {
  return Object.fromEntries(new URLSearchParams(qs))
}

export default parseQueryString
