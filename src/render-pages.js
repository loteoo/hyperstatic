import puppeteer from 'puppeteer'
import fse from 'fs-extra'
import path from 'path'

import routes from '../src/routes'
import createPages from '../src/createPages'


async function crawler({ url, browser }) {
  let page = null;
  let html = false;

  try {
    page = await browser.newPage();

    await page.setUserAgent('puppeteer');

    page.on("pageerror", function(err) {
      const theTempValue = err.toString();
      console.log("Page error: " + theTempValue);
    })

    await page.goto(url, { waitUntil: "networkidle0" });

    html = await page.content();
  } catch (e) {
      debug.warn(`Not able to fetch ${url}`);
  } finally {
    if (page) {
      await page.close();
    }
    return html;
  }
}




(async function renderPages() {

  const baseUrl = 'http://localhost:8080'
  const staticRoutes = Object.keys(routes).filter(route => !route.includes('/:'))
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const allPages = await createPages(staticRoutes)

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

    const pageName = pagePath == '/' ? '/index.html' : `${pagePath}/index.html`

    const outputPath = path.join(__dirname, '..', 'dist', pageName)

    fse.outputFile(outputPath, cleanedUp)
      .then(() => console.log(`Page created: ${outputPath}`))
      .catch(console.error)
  })


  await browser.close();

  console.log('Pages saved!')

  return true
})()