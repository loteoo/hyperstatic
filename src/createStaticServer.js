const handler = require('serve-handler')
const http = require('http')

const createStaticServer = (port, buildPath) => http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, {
    public: buildPath
  })
}).listen(port)

module.exports = createStaticServer
