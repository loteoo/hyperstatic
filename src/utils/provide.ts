/**
 * Recursively walk the vnode tree, if a function is found,
 * call it with the given value and repeat
 */
const provide = (value, node) =>
  !node
    ? node
    : Array.isArray(node)
      ? node.map((n) => provide(value, n)).flat()
      : typeof node === 'function'
        ? provide(value, node(value))
        : node.children
          ? { ...node, children: provide(value, node.children) }
          : node

export default provide
