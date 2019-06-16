import { h } from 'hyperapp'

import markdown from './home.md'

// Home page
export default state => (
  <div innerHTML={markdown}></div>
)
