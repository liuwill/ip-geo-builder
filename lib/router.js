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
const GeoDB = require('./utils/db')

module.exports = (server, app) => {
  server.get('/api/generator/json', GeneratorController.testJson)

  var cpUpload = uploadHandle.fields([{ name: 'core', maxCount: 1 }, { name: 'geo', maxCount: 1 }])
  server.post('/api/upload.do', cpUpload, (req, res) => {
    console.log(req.body)

    if (!req.files['core'] || !req.files['core'].length || !req.files['geo'] || !req.files['geo'].length) {
      res.json({ status: false, msg: '请上传完整的两个文件' })
      return
    }

    var coreFile = req.files['core'][0]
    var geoFile = req.files['geo'][0]

    console.log(coreFile, geoFile)
    if (coreFile.mimetype !== 'text/csv' || geoFile.mimetype !== 'text/csv') {
      res.json({ status: false, msg: '上传的资源文件必须是csv格式' })
      return
    }

    if (!global || !global.sourceFiles || !global.sourceFiles['CHINA_CITIES_PATH'] || !global.sourceFiles['ISO3166_PATH']) {
      res.json({ status: false, msg: '无法找到预加载的系统文件，请检查环境' })
      return
    }

    var geoDb = GeoDB.generateDb(coreFile.buffer, geoFile.buffer, global.sourceFiles['CHINA_CITIES_PATH'], global.sourceFiles['ISO3166_PATH'])

    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-disposition', 'attachment;filename=default.db')
    res.setHeader('Content-Length', geoDb.length)

    return res.end(geoDb)
  })
}
