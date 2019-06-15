import { h } from 'hyperapp'

import {Router} from '../site-generator/utils'
import Sidebar from './components/Sidebar'

// root view
export default state => {
  console.log(state)
  return (
    <div id="app" class="page" role="document">
      <Sidebar state={state} />

      <main role="main" class="main-content">
        <h2>Page:</h2>
        {Router(state)}
      </main>

    </div>
  )
}
