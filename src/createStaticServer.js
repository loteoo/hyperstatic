var http = require('http')
var fs = require('fs')
var path = require('path')

const createStaticServer = (port) => http.createServer(function (request, response) {
  console.log('request ', request.url)

  var filePath = request.url
  if (filePath === '/') {
    filePath = '/index.html'
  }

  filePath = path.join(__dirname, '../../..', 'dist', filePath)

  if (!filePath.includes('.')) {
    filePath = filePath + '/index.html'
  }

  var extname = String(path.extname(filePath)).toLowerCase()
  var mimeTypes = {
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

  var contentType = mimeTypes[extname] || 'application/octet-stream'

  fs.readFile(filePath, function (error, content) {
    // If 404
    if (error) {
      // return home page
      var home = path.join(__dirname, '../../..', 'dist', 'index.html')
      fs.readFile(home, function (error, content) {
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

module.exports = createStaticServer
