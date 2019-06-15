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
    //networkidle0: consider navigation to be finished when
    //there are no more than 2 network connections for at least 500 ms.
    //(https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegobackoptions)
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




(async function fetchAllPages() {

  const domain = "http://localhost:1234";
  const staticRoutes = Object.keys(routes).filter(route => !route.includes('/:'))
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const extraPages = await createPages()

  const allPages = staticRoutes.concat(extraPages)


  const crawls = allPages.map(page => crawler({
    url: `${domain}${page}`,
    browser
  }))

  const pagesHtml = await Promise.all(crawls)

  pagesHtml.forEach((html, i) => {

    const pagePath = allPages[i]

    const pageName = pagePath == '/' ? '/index.html' : `${pagePath}/index.html`

    const outputPath = path.join(__dirname, '..', 'dist', pageName)

    fse.outputFile(outputPath, html)
      .then(() => console.log(`Page created: ${outputPath}`))
      .catch(console.error)
  })


  await browser.close();

  console.log('Pages saved!')

  return true
})()
