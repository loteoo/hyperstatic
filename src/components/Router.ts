import { h, text } from 'hyperapp'
import { ViewContext } from '../types';

/**
 * Router component to import in user code.
 *
 * Renders the correct view depending on the location state
 *
 */
const Router = () => ({ state, meta, options }: ViewContext) => {
  const { route, path } = state.location
  const view = meta[route]?.bundle?.default;

  if (view) {
    if (state.paths[path] === 'ready') {

      // @ts-expect-error
      if (window.pathRendered) {

        // Wait after render
        setTimeout(() => {
          requestAnimationFrame(() => {
            // @ts-expect-error
            window.pathRendered(path)
          })
        });
      }

      return view(state)
    }
  }

  // Display custom loader if specified
  if (options.loader && typeof options.loader === 'function') {
    return options.loader(state)
  }

  // Default loader
  return (
    h('div', { style: { padding: '1rem' } }, [
      h('h2', { style: { textAlign: 'center' } }, text('Loading...'))
    ])
  )
}

export default Router
