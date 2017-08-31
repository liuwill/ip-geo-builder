var http = require('http')
var session = require('express-session')

module.exports = (server, app) => {
  if (process.env.NODE_EXPRESS_SESSION === 'open') {
    installSession(server)
  }

  loadSourceFile()
}

function loadSourceFile () {
  var sourceFiles = {}
  var fields = ['CHINA_CITIES_PATH', 'ISO3166_PATH']

  for (var i = 0; i < fields.length; i++) {
    var fileType = fields[i]
    if (process.env[fileType]) {
      var filePath = `${process.env.OSS_SERVER}${process.env.BASE_RESOURCE_PATH}/${process.env[fileType]}`

      readRemoteFile(fileType, filePath, function (err, buffer, fetchedFileType) {
        if (err) {
          console.log(err)
        } else {
          sourceFiles[fetchedFileType] = buffer
          console.log('Load: ' + fetchedFileType)
          // console.log(buffer.length, buffer)
        }
      })
    }
  }
  global && (global.sourceFiles = sourceFiles)
}

/**
 * 读取远程文件
 * From: https://gist.github.com/leizongmin/6445255
 *
 * @param {String} url
 * @param {Function} cb
 *   - {Error} err
 *   - {Buffer} buf
 */
function readRemoteFile (fileType, url, cb) {
  var callback = function (err, data) {
    // 回调函数，避免重复调用
    callback = function () { }

    if (typeof cb === 'function') {
      cb(err, data, fileType)
    }
  }

  var req = http.get(url, function (res) {
    var b = []
    res.on('data', function (c) {
      b.push(c)
    })
    res.on('end', function () {
      callback(null, Buffer.concat(b))
    })
    res.on('error', callback)
  })
  req.on('error', callback)
}

function installSession (server) {
  var sessionData = {
    secret: 'keyboard cat',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie: {}
  }

  if (process.env.SESSION_SECRET) {
    sessionData.secret = process.env.SESSION_SECRET
  }

  if (process.env.SESSION_NAME) {
    sessionData.name = process.env.SESSION_NAME
  }

  if (server.get('env') === 'production') {
    server.set('trust proxy', 1) // trust first proxy
    sessionData.cookie.secure = true // serve secure cookies
  }

  server.use(session(sessionData))

  global && (global.serviceQueue = [])
}
