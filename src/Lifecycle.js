
import { h } from 'hyperapp'

/**
 * Simple helper to emulate Hyperapp#2 lifecycle events
 * Thanks @sergey-shpak for this gist!
 * https://gist.github.com/sergey-shpak/ff87e56e03dc16c8ee24dc562c6f7dff
 *
 */

const dispatchEvent = (event, target) =>
  setTimeout(() => target.dispatchEvent(
    new CustomEvent(event, { detail: target })
  ))

const defineElement = name => {
  customElements.get(name) ||
  customElements.define(name, class extends HTMLElement {
    appendChild (child) {
      super.appendChild(child)
      dispatchEvent('create', child)
      return child
    }
    removeChild (child) {
      super.removeChild(child)
      dispatchEvent('remove', child)
      return child
    }
  })
}

// eslint-disable-next-line no-sequences
export const Lifecycle = (props, child) => (defineElement('ha-lifecycle'), h('ha-lifecycle', props, [child]))
