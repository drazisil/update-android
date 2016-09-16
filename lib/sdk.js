var config = require('../config.json')
var xml2js = require('xml2js')
var https = require('https')

var winston= require('winston')

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'info' }),
      new (winston.transports.File)({
        filename: 'update-android.log',
        level: 'warn'
      })
    ]
  })

function list(options) {

  fetchXml(config.addonListUrl, function a (err, res) {
    if (err) {
      console.error(err)
    }
    parseXml(res)
  })
}

function fetchXml(url, callback) {
  https.get(url, (res) => {
    var pageData = ""
    if (res.statusCode !== 200) {
      console.error('Unable to access ' + url + ', HTTP Response: ' + res.statusCode)
      process.exit(1)
    }
    // console.log('statusCode:', res.statusCode)
    // console.log('headers:', res.headers)

    res.on('data', (d) => {
      pageData += d
    }).on('end', (e) => {
      callback(null, pageData.toString())
    })

  }).on('error', (e) => {
    callback(e)
  })
}

function parseXml(xml) {
  xml2js.parseString(xml, function (err, result) {
    console.dir(result['sdk:sdk-addons-list']['sdk:addon-site'])
    console.dir(result['sdk:sdk-addons-list']['sdk:sys-img-site'])
  })
}

function update(options) {
  console.log('moo')
}

module.exports = {
  list: list,
  update: update
}