var bodyParser = require('body-parser')
var rapnode = require('rap-node-plugin')
var configRap = require('./config_rap.js')
global.RAP_FLAG = 1  // 开启RAP
rapnode.config(configRap.base)
var config_middle = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    if (req.method === 'OPTIONS') {
      res.end()
    } else {
      next()
    }
  })
}

var config_path = function (app) {
  app.all('/', function (req, res) {
    res.send('rap-server')
  })
  configRap.urls.forEach(function (item) {
    app.all(item, function (req, res) {
      rapnode.getRapData(item, function () {}, function(err, ret) {
          var data = ret
          res.json(data)
          // res.send(data)
      })
    })
  })
}

var config = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  config_middle(app)
  config_path(app)
} 

module.exports = config