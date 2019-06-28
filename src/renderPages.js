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
  const port = 9677

  await createStaticServer(port)

  const baseUrl = `http://localhost:${port}`

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })

  const crawls = allPages.map(page => crawler({
    url: `${baseUrl}${page}`,
    browser
  }))

  console.log(`Rendering ${crawls.length} pages...`)

  const pagesHtml = await Promise.all(crawls)

  for (let i = 0; i < pagesHtml.length; i++) {

    const html = pagesHtml[i]
    const pagePath = allPages[i]


    if (!html) {
      console.log('Empty page: ' + pagePath)
      continue;
    }

    const cleanedUp = html.replace(baseUrl, '')

    const pageName = pagePath === '/' ? '/index.html' : `${pagePath}/index.html`

    const outputPath = path.join(__dirname, '../../../dist', pageName)


    console.log(`Creating page at: ${outputPath} ...`)

    try {
      await fse.outputFile(outputPath, cleanedUp)

      console.log(`Page created: ${outputPath}`)

    } catch (err) {
      console.error(err)
    }

  }

  await browser.close()

  console.log('Pages saved!')

  return true
}

module.exports = renderPages
