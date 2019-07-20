const puppeteer = require('puppeteer')
const fse = require('fs-extra')
const path = require('path')
const slugify = require('slugify')
const replace = require('replace-in-file')

const createStaticServer = require('./createStaticServer')

async function crawler ({ url, browser }) {
  const page = await browser.newPage()

  await page.setUserAgent('puppeteer')

  page.on('pageerror', function (err) {
    console.log(`Runtime error in page: ${url} Error: ${err.toString()}`)
  })

  await page.goto(url, { waitUntil: 'networkidle0' })

  const staticData = await page.evaluate(() => window.staticData)

  const html = await page.content()

  await page.close()

  return { html, staticData }
}

/**
 *
 * @param {Array} routes // List of URLs to render
 */
const renderPages = async (allPages, port = 54321) => {
  let allStaticData = {}

  await createStaticServer(port)

  const baseUrl = `http://localhost:${port}`

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })

  console.log(`Rendering ${allPages.length} pages...`)

  for (let i = 0; i < allPages.length; i++) {
    const pagePath = allPages[i]

    console.log(`Creating page: ${pagePath} ...`)

    // Render HTML
    const { html, staticData } = await crawler({
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
    const pageFileAbsolutePath = path.join(__dirname, '../../../dist', pageFilePath)

    // Remove basepath from rendered HTML
    // Ex: <script src="http://localhost/about" /> becomes just <script src="/about" />
    const cleanedUpHtml = html.replace(baseUrl, '')

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
    const fileName = slugify(url) + '.json'
    const filePath = '/data/' + fileName

    newFetchUrls.push(filePath)

    try {
      const dataAbsolutePath = path.join(__dirname, '../../../dist', filePath)
      await fse.outputFile(dataAbsolutePath, cleanedUpHtml)
      console.log(`Data saved: ${dataAbsolutePath}`)
    } catch (err) {
      console.error(err)
    }
  }

  console.log('Updating bundles...')
  try {
    const results = await replace({
      files: path.join(__dirname, '../../../dist/*.{js,jsx}'),
      from: fetchUrls,
      to: newFetchUrls,
      countMatches: true
    })
    console.log('Update results:' + results)
  } catch (error) {
    console.error('Error occurred:', error)
  }

  console.log('Rendering complete! 🎉')

  return true
}

module.exports = renderPages
