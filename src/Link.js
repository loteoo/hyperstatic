import { h } from 'hyperapp'
import {Lifecycle} from './Lifecycle'
import { Navigate, TriggerRouteLoad, TriggerRouteLoadIfGoodConnection } from './actions'

// Link component
export const Link = ({ to, ...props }, children) => {
  return Lifecycle({}, [
    h('a', {
      href: to,
      onclick: [
        state => state,
        ev => {
          ev.preventDefault()
        }
      ],
      onmousedown: [Navigate, ev => {
        if (ev.button === 0) {
          return to
        }
      }],
      onmouseover: [TriggerRouteLoad, to],
      oncreate: [TriggerRouteLoadIfGoodConnection, to],
      ontriggerrouteload: [TriggerRouteLoadIfGoodConnection, to],
      ...props
    }, children)
  ])
}
