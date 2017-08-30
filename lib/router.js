const GeneratorController = require('./controller/generator')

module.exports = (server, app) => {
  server.get('/api/generator/json', GeneratorController.testJson)
}
