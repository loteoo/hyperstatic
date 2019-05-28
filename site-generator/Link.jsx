import { h } from 'hyperapp'


export default ({to, ...props}, children) => (
  <a href={to} {...props}>
    {children}
  </a>
)
