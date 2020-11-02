const puppeteer = require('puppeteer')
const fse = require('fs-extra')
const path = require('path')
const crypto = require('crypto')
const replace = require('replace-in-file')
const renderer = require('./renderer')
const createStaticServer = require('./createStaticServer')

/**
 *
 * @param {Array} routes // List of URLs to render
 * @param {int} port // port number for the rendering script to use
 */
const renderPages = async (allPages, port = 54321) => {
  let allStaticData = {}

  const buildPath = process.cwd() + '/dist'

  await createStaticServer(port, buildPath)

  const baseUrl = `http://localhost:${port}`

  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--single-process']
  })

  console.log(`Rendering ${allPages.length} pages...`)

  for (let i = 0; i < allPages.length; i++) {
    const pagePath = allPages[i]

    console.log(`Creating page: ${pagePath} ...`)

    // Render HTML
    const { html, staticData } = await renderer({
      url: `${baseUrl}${pagePath}`,
      browser
    })

    // Keep track of all that good stuff
    allStaticData = {
      ...allStaticData,
      ...staticData
    }

    // Invalid pages return empty strings as HTML. Do not save those.
    if (!html) {
      console.log('Empty page: ' + pagePath)
      continue
    }

    // Convert URI path to absolute disk path in the output dir
    const pageFilePath = pagePath === '/' ? '/index.html' : `${pagePath}/index.html`
    const pageFileAbsolutePath = path.join(buildPath, pageFilePath)

    // Remove basepath from rendered HTML
    // Ex: <script src="http://localhost/about" /> becomes just <script src="/about" />
    const cleanedUpHtml = html.replace(new RegExp(baseUrl, 'gi'), '')
    

    try {
      await fse.outputFile(pageFileAbsolutePath, cleanedUpHtml)

      console.log(`Page created: ${pageFileAbsolutePath}`)
    } catch (err) {
      console.error(err)
    }
  }

  await browser.close()

  console.log('Pages rendered!')

  console.log('Saving static data...')

  const fetchUrls = Object.keys(allStaticData)

  let newFetchUrls = []

  for (let i = 0; i < fetchUrls.length; i++) {
    const url = fetchUrls[i]
    const data = allStaticData[url]
    const fileName = crypto.createHash('md5').update(url).digest('hex') + '.json'
    const filePath = '/data/' + fileName

    newFetchUrls.push(filePath)

    try {
      const dataAbsolutePath = path.join(buildPath, filePath)
      await fse.outputFile(dataAbsolutePath, JSON.stringify(data))
      console.log(`Data saved: ${dataAbsolutePath}`)
    } catch (err) {
      console.error(err)
    }
  }

  console.log('Updating bundles...')
  try {
    const results = await replace({
      files: buildPath + '/*.{js,jsx}',
      from: fetchUrls,
      to: newFetchUrls,
      countMatches: true
    })
    console.log('Bundles updated! Results: ')
    results.forEach(result => {
      if (result.hasChanged) {
        console.log(result)
      }
    })
  } catch (error) {
    console.error('Error occurred:', error)
  }

  console.log('Rendering complete! 🎉')

  return true
}

module.exports = renderPages
