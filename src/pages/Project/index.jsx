import markdown from './project.md'

export default state => (
  <div innerHTML={markdown}></div>
)
