import { h } from 'hyperapp'

/**
 * Simple helper to add lifecycle events to v2
 * Thanks @sergey-shpak for this awesome hook!
 * https://codepen.io/sergey-shpak/pen/GbyOvx
 *
 */

export const Lifecycle = (elementName, props, children) => {
  const fn = (method, eventName) => function (el) {
    const event = new CustomEvent(eventName, { detail: el })
    setTimeout(() => el.dispatchEvent(event))
    return Object.getPrototypeOf(this)[method].call(this, el)
  }
  return h(
    elementName,
    {
      appendChild: fn('appendChild', 'create'),
      removeChild: fn('removeChild', 'remove'),
      ...props
    },
    children
  )
}
