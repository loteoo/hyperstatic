
import {Router} from '../site-generator/utils'
import Sidebar from './components/Sidebar'

// root view
export default state => {
  console.log(state)
  return (
    <div id="app" class="layout" role="document">
      <Sidebar state={state} />
      <main role="main" class="main-content">
        {Router(state)}
      </main>
    </div>
  )
}
