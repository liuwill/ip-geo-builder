var session = require('express-session')

module.exports = (server, app) => {
  var sessionData = {
    secret: 'keyboard cat',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie: {}
  }

  if (process.env.SESSION_SECRET){
    sessionData.secret = process.env.SESSION_SECRET
  }

  if (process.env.SESSION_NAME){
    sessionData.name = process.env.SESSION_NAME
  }

  if (server.get('env') === 'production') {
    server.set('trust proxy', 1) // trust first proxy
    sessionData.cookie.secure = true // serve secure cookies
  }

  server.use(session(sessionData))

  global && (global.serviceQueue = [])
}
