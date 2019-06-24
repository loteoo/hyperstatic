import { h } from 'hyperapp'

/**
 * Html to hyperapp VDOM converter
 * Implemented by gungorkocak
 * https://github.com/gungorkocak
 * (shared on the hyperapp slack)
 */

const mapProps = attrs => (
  [...attrs].reduce(
    (props, attr) => (
      attr.nodeName === 'style'
        ? props // ignore string style definitions for now.
        : { ...props, [attr.nodeName]: attr.nodeValue }
    ),
    {}
  )
)

const mapChildren = (childNodes) => {
  if (!!childNodes && childNodes.length > 0) {
    return [...childNodes].map(node => mapVNode(node))
  } else {
    return []
  }
}

const mapVNode = (node) => {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return node.nodeValue
    case Node.ELEMENT_NODE:
      return h(node.tagName, mapProps(node.attributes), mapChildren(node.childNodes))
    default:
      throw new Error(`${node.nodeType} is not supported`)
  }
}

export default (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const node = doc.body.firstChild
  return mapVNode(node)
}
