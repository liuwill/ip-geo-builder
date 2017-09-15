const UploadMiddleware = require('./middleware/upload')
const GeneratorController = require('./controller/generator')

module.exports = (server, app) => {
  server.get('/api/generator/json', GeneratorController.testJson)

  server.post('/api/upload.do', UploadMiddleware.resourceUpload, GeneratorController.uploadHandler)
}
