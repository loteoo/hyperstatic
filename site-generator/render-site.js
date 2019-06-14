import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

import routes from '../src/routes'


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
  const pages = Object.keys(routes)
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });


  const crawls = pages.map(page => crawler({
    url: `${domain}${page}`,
    browser
  }))

  const pagesHtml = await Promise.all(crawls)

  pagesHtml.forEach((html, i) => {
    const page = pages[i]

    const pageName = page == '/' ? 'index' : page

    const pageFile = path.join(__dirname, '..', 'dist', `${pageName}.html`)

    fs.writeFile(pageFile, html, (err) => {
      if (err) throw err
      console.log(`Page created: ${pageFile}`)
    })
  })


  await browser.close();

  console.log('Pages saved!')

  return true
})()
