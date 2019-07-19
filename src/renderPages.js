const puppeteer = require('puppeteer')
const fse = require('fs-extra')
const path = require('path')

const createStaticServer = require('./createStaticServer')

async function crawler ({ url, browser }) {
  let page = null
  let html = false

  try {
    page = await browser.newPage()

    await page.setUserAgent('puppeteer')

    page.on('pageerror', function (err) {
      console.log(`Runtime error in page: ${url} Error: ${err.toString()}`)
    })

    await page.goto(url, { waitUntil: 'networkidle0' })

    html = await page.content()
  } catch (e) {
    debug.warn(`Not able to fetch ${url}`)
  } finally {
    if (page) {
      await page.close()
    }
    // eslint-disable-next-line no-unsafe-finally
    return html
  }
}

/**
 *
 * @param {Array} routes // List of URLs to render
 */
const renderPages = async (allPages) => {
  const port = 8080

  await createStaticServer(port)

  const baseUrl = `http://localhost:${port}`

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })

  console.log(`Rendering ${allPages.length} pages...`)

  for (let i = 0; i < allPages.length; i++) {
    const pagePath = allPages[i]

    // Render HTML
    const pageHtml = await crawler({
      url: `${baseUrl}${pagePath}`,
      browser
    })

    // Invalid pages return empty strings as HTML. Do not save those.
    if (!pageHtml) {
      console.log('Empty page: ' + pagePath)
      continue
    }

    // Convert URI path to absolute disk path in the output dir
    const pageFilePath = pagePath === '/' ? '/index.html' : `${pagePath}/index.html`
    const pageFileAbsolutePath = path.join(__dirname, '../../../dist', pageFilePath)

    // Remove basepath from rendered HTML
    // Ex: <script src="http://localhost/about" /> becomes just <script src="/about" />
    const cleanedUpHtml = pageHtml.replace(baseUrl, '')

    console.log(`Creating page at: ${pageFileAbsolutePath} ...`)
    try {
      await fse.outputFile(pageFileAbsolutePath, cleanedUpHtml)

      console.log(`Page created: ${pageFileAbsolutePath}`)
    } catch (err) {
      console.error(err)
    }
  }

  await browser.close()

  console.log('Pages saved!')

  return true
}

module.exports = renderPages
