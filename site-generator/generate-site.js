
import fs from 'fs'
import path from 'path'
import Bundler from 'parcel-bundler'
import { renderToString } from 'hyperapp-render'

// import routes from '../src/routes'


import init from '../src/init'


// const skelettonPath = path.join(__dirname, '..', 'dist', 'index.html')
// const skeletton = fs.readFileSync(skelettonPath)



const pagesFolder = path.join(__dirname, '..', 'src', 'pages')
const pages = fs.readdirSync(pagesFolder)

console.log(pages)

const bundlePromises = pages.map(page => {
  const entryFile = path.join(__dirname, '..', 'src', 'pages', page)
  const bundler = new Bundler(entryFile)
  return bundler.bundle()
})

Promise.all(bundlePromises).then(() => {
  console.log('BUILD PAGES')
})

// const createPages = async () => {

//   const pages = await Promise.all(Object.keys(routes).map(route => routes[route]))

//   pages.forEach((page, i) => {

//     const route = routes[route]


//     // Setup page state with proper route
//     const state = {
//       ...init,
//       location: {
//         ...init.location,
//         path: route
//       }
//     }

//     const pageName = `${route.replace('/', '')}.html`

//     const pageBody = renderToString(page.default, state)

//     const pageHtml = skeletton.replace('[INJECT_VIEW_HERE]', pageBody)

//     fs.writeFile(`../dist/${pageName}`, pageHtml, (err) => {
//       if (err) throw err
//       console.log('Page created successfully.')
//     })

//   })
// }


