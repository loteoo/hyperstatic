
import {Router} from '../site-generator/Router'
import Sidebar from './components/Sidebar'

// root view
export default state => {
  console.log('State', state)
  return (
    <div id="app" class="layout" role="document">
      <Sidebar state={state} />
      <main role="main" class="main-content">
        <div key={state.location.path} class="box">
          {Router(state)}
        </div>
      </main>
    </div>
  )
}
