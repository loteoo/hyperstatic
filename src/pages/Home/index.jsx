import markdown from './home.md'

export default state => (
  <div class="page" innerHTML={markdown}></div>
)
