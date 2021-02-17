export const provide = (value, node) =>
  !node
    ? node
    : Array.isArray(node)
      ? node.map((n) => provide(value, n)).flat()
      : typeof node === 'function'
        ? provide(value, node(value))
        : node.children
          ? { ...node, children: provide(value, node.children) }
          : node

