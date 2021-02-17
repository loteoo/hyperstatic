import fx from '../utils/fx'

/**
 * Trigger a page navigation
 */
const navigate = fx((_dispatch, to) => {
  history.pushState(null, '', to)
  dispatchEvent(new CustomEvent("pushstate"))
  window.scroll({
    top: 0
  })
})

export default navigate
