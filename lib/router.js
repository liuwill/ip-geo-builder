var multer = require('multer')
var storage = multer.memoryStorage()
var UPLOAD_FILE_LIMIT = 10000000
var uploadHandle = multer({
  storage: storage,
  limits: {
    files: 3,
    fileSize: UPLOAD_FILE_LIMIT,
    fields: 10
  }
})

const GeneratorController = require('./controller/generator')

module.exports = (server, app) => {
  server.get('/api/generator/json', GeneratorController.testJson)

  var cpUpload = uploadHandle.fields([{ name: 'core', maxCount: 1 }, { name: 'geo', maxCount: 1 }])
  server.post('/api/upload.do', cpUpload, GeneratorController.uploadHandler)
}
