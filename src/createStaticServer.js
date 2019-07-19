const http = require('http')
const fs = require('fs')
const path = require('path')

const createStaticServer = (port) => {
  console.log(`Running static server on http://localhost:${port}`)

  return http.createServer((request, response) => {
    // Get req path without query string
    let reqPath = request.url.split('?')[0]

    if (reqPath === '/') {
      reqPath = '/index.html'
    }

    if (!reqPath.includes('.')) {
      reqPath = reqPath + '/index.html'
    }

    const filePath = path.join(__dirname, '../../../dist', reqPath)

    // console.log('request ', filePath)

    const extname = String(path.extname(filePath)).toLowerCase()
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.svg': 'application/image/svg+xml',
      '.wasm': 'application/wasm'
    }

    const contentType = mimeTypes[extname] || 'application/octet-stream'

    fs.readFile(filePath, (error, content) => {
      // If 404
      if (error) {
        // return home page
        const home = path.join(__dirname, '../../../dist/index.html')
        fs.readFile(home, (error, content) => {
          if (error) {
            console.log(error)
          }
          response.writeHead(200, { 'Content-Type': 'text/html' })
          response.end(content, 'utf-8')
        })
      } else {
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(content, 'utf-8')
      }
    })
  }).listen(port)
}

module.exports = createStaticServer
