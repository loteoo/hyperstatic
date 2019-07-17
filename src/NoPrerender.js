/**
 * Disables rendering of child nodes while pre-rendering
 */
export const NoPrerender = (props, children) => {
  if (window.navigator.userAgent !== 'puppeteer') {
    return children
  }
}
