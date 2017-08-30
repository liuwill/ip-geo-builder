
const express = require('express')
const next = require('next')
const router = require('./lib/router')
const bundler = require('./lib/bundler')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  bundler(server, app)
  router(server, app)

  // // custom route if need
  // server.get('/custom', (req, res) =>
  //   app.render(req, res, '/custom', {
  //     data: req.params.data,
  //   })
  // );
  server.get('/uploads', (req, res) => {
    res.json({ status: 'sorry' })
  })

  server.get('/api/json', (req, res) => {
    res.json({ status: 'json' })
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, err => {
    if (err) {
      throw err
    }
    console.log('> Ready on http://localhost:3000') // eslint-disable-line no-console
  })
})
