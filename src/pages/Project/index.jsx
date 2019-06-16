import { h } from 'hyperapp'

import markdown from './project.md'


// Home page
export default state => (
  <div innerHTML={markdown}></div>
)
