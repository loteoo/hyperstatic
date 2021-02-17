const parseQueryString = (qs: string) => {
  return Object.fromEntries(new URLSearchParams(qs))
}

export default parseQueryString
