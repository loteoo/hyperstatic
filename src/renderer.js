const renderer = async ({ url, browser }) => {
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

module.exports = renderer
