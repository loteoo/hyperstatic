import routes from '../src/routes'

import { renderToString } from 'hyperapp-render'

import { getMatch } from './Router'

import fs from 'fs'
import init from '../src/init'


const skeletton = fs.readFileSync('../dist/index.html')


Object.keys(routes).forEach(route => {


  // For each route, generate page

  // Setup page state with proper route
  const state = {
    ...init,
    meta: {
      ...init.meta,
      path: route
    }
  }

  // Get view
  const pageView = getMatch(route)

  const pageName = `${route.replace('/', '')}.html`

  const pageBody = renderToString(pageView, state)

  const pageHtml = skeletton.replace('[INJECT_VIEW_HERE]', pageBody)

  fs.writeFile(pageName, pageHtml, (err) => {
    if (err) throw err
    console.log('Page created successfully.')
  })

})
