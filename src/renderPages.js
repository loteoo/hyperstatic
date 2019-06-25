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
      const theTempValue = err.toString()
      console.log('Page error: ' + theTempValue)
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

  console.log(`Server running at http://localhost:${port}`)

  const baseUrl = `http://localhost:${port}`

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })

  const crawls = allPages.map(page => crawler({
    url: `${baseUrl}${page}`,
    browser
  }))

  console.log(`Rendering ${crawls.length} pages...`)

  const pagesHtml = await Promise.all(crawls)

  pagesHtml.forEach((html, i) => {
    const pagePath = allPages[i]

    if (!html) {
      console.log('Empty page: ' + pagePath)
      return
    }

    const cleanedUp = html.replace(baseUrl, '')

    const pageName = pagePath === '/' ? '/index.html' : `${pagePath}/index.html`

    const outputPath = path.join(__dirname, '../../..', 'dist', pageName)

    fse.outputFile(outputPath, cleanedUp)
      .then(() => console.log(`Page created: ${outputPath}`))
      .catch(console.error)
  })

  await browser.close()

  console.log('Pages saved!')

  return true
}


module.exports = renderPages
