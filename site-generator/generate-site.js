
import fs from 'fs'
import path from 'path'
import { renderToString } from 'hyperapp-render'

import routes from '../src/routes'


import init from '../src/init'


const skelettonPath = path.join(__dirname, '..', 'dist', 'index.html')
const skeletton = fs.readFileSync(skelettonPath)

const createPages = async () => {

  const pages = await Promise.all(Object.keys(routes).map(route => routes[route]))

  pages.forEach((page, i) => {

    const route = routes[route]


    // Setup page state with proper route
    const state = {
      ...init,
      location: {
        ...init.location,
        path: route
      }
    }

    const pageName = `${route.replace('/', '')}.html`

    const pageBody = renderToString(page.default, state)

    const pageHtml = skeletton.replace('[INJECT_VIEW_HERE]', pageBody)

    fs.writeFile(`../dist/${pageName}`, pageHtml, (err) => {
      if (err) throw err
      console.log('Page created successfully.')
    })

  })
}


createPages().then(() => {
  console.log("All pages created")
})

