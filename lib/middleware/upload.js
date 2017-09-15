var multer = require('multer')
var storage = multer.memoryStorage()
var UPLOAD_FILE_LIMIT = 12000000
var uploadHandle = multer({
  storage: storage,
  limits: {
    files: 3,
    fileSize: UPLOAD_FILE_LIMIT,
    fields: 10
  }
})

exports.resourceUpload = uploadHandle.fields([{ name: 'core', maxCount: 1 }, { name: 'geo', maxCount: 1 }])
