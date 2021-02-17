import fx from '../utils/fx'

export const navigate = fx((_dispatch, to) => {
  history.pushState(null, '', to)
  dispatchEvent(new CustomEvent("pushstate"))
  window.scroll({
    top: 0
  })
})
