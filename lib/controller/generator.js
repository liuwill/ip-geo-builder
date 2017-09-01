const GeoDB = require('../utils/db')

exports.testJson = (req, res) => {
  res.json({ status: 'json' })
}

exports.uploadHandler = (req, res) => {
  var currentDate = (new Date()).toISOString()

  var filename = `default-${currentDate}.db`
  if (req.body.filename) {
    filename = req.body.filename
  }

  if (!req.files['core'] || !req.files['core'].length || !req.files['geo'] || !req.files['geo'].length) {
    res.json({ status: false, msg: '请上传完整的两个文件' })
    return
  }

  var coreFile = req.files['core'][0]
  var geoFile = req.files['geo'][0]

  if (coreFile.mimetype !== 'text/csv' || geoFile.mimetype !== 'text/csv') {
    res.json({ status: false, msg: '上传的资源文件的格式不正确' })
    return
  }

  if (!global || !global.sourceFiles || !global.sourceFiles['CHINA_CITIES_PATH'] || !global.sourceFiles['ISO3166_PATH']) {
    res.json({ status: false, msg: '无法找到预加载的系统文件，请检查环境' })
    return
  }

  var geoDb = GeoDB.generateDb(coreFile.buffer, geoFile.buffer, global.sourceFiles['CHINA_CITIES_PATH'], global.sourceFiles['ISO3166_PATH'])

  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader('Content-disposition', `attachment;filename=${filename}`)
  res.setHeader('Content-Length', geoDb.length)

  const logData = [currentDate, req.ip]
  logData.push(filename)
  console.log(logData.join('\t'))
  return res.end(geoDb)
}
