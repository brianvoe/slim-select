module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.get('/ok', function (req, res) {
    res.status(200); res.send('ok')
  })
}
