var multer = require('multer')
var storage = multer.memoryStorage()
var uploadHandle = multer({
  storage: storage,
  limits: {
    files: 3,
    fileSize: 40000000,
    fields: 10
  }
})

const GeneratorController = require('./controller/generator')

module.exports = (server, app) => {
  server.get('/api/generator/json', GeneratorController.testJson)

  var cpUpload = uploadHandle.fields([{ name: 'core', maxCount: 1 }, { name: 'geo', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }])
  server.post('/api/upload.do', cpUpload, (req, res) => {
    console.log(req.body)
    console.log(req.files['thumbnail'][0])

    res.json(req.body)
  })
}
