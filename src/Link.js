import { h } from 'hyperapp'
import { Lifecycle } from './Lifecycle'
import { Navigate, TriggerPageLoad, TriggerPageLoadIfGoodConnection } from './actions'

// Link component
export const Link = ({ to, ...props }, children) => {
  return Lifecycle('a', {
      href: to,
      onclick: [
        Navigate, ev => {
          ev.preventDefault()
          return to
        }],
      onmouseover: [TriggerPageLoad, to],
      oncreate: [TriggerPageLoadIfGoodConnection, to],
      ontriggerpageload: [TriggerPageLoadIfGoodConnection, to],
      ...props
    }, children)
}
