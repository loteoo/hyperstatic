import { h } from 'hyperapp'

import { Navigate, TriggerRouteLoad } from './actions'

// Link component
export const Link = ({ to, ...props }, children) => {
  return h('a', {
    href: to,
    onclick: [
      state => state,
      ev => {
        ev.preventDefault()
      }
    ],
    onmousedown: [Navigate, to],
    onmouseover: [TriggerRouteLoad, to],
    ...props
  }, children)
}
