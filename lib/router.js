var multer = require('multer')
var uploadHandle = multer({ dest: 'uploads/' })

const GeneratorController = require('./controller/generator')

module.exports = (server, app) => {
  server.get('/api/generator/json', GeneratorController.testJson)

  server.post('/api/upload.do', uploadHandle.single('thumbnail'), (req, res) => {
    console.log(req.body)
    console.log(req.files)

    res.json(req.body)
  })
}
