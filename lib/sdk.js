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

  if (options.length !== 2) {
    console.error('You forgot something :)')
    process.exit()
  }

  if (!options.includes('--all') || !options.includes('--extended')) {
    console.log('boo!')
    process.exit()
  }

  fetchXml(config.addonListUrl, function a (err, res) {
    if (err) {
      console.error(err)
    }
    parseXml(config.addonListUrl, res)
  })
}

function fetchXml(url, callback) {
  console.log('Refresh Sources:')
  console.log("\tFetching \t"+ url)
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

function parseXml(url, xml) {
  // TODO: Maybe validate the xml first
  xml2js.parseString(xml, function (err, result) {
    console.log("\tParse XML:    \t" + url)
//   Validate XML
//   Parse XML
//   Fetched Add-ons List successfully
//   Refresh Sources
//   Fetching URL: https://dl.google.com/android/repository/repository-11.xml
//   Validate XML: https://dl.google.com/android/repository/repository-11.xml
//   Parse XML:    https://dl.google.com/android/repository/repository-11.xml
//   Fetching URL: https://dl.google.com/android/repository/addon.xml
//   Validate XML: https://dl.google.com/android/repository/addon.xml
//   Parse XML:    https://dl.google.com/android/repository/addon.xml
//   Fetching URL: https://dl.google.com/android/repository/glass/addon.xml
//   Validate XML: https://dl.google.com/android/repository/glass/addon.xml
//   Parse XML:    https://dl.google.com/android/repository/glass/addon.xml
//   Fetching URL: https://dl.google.com/android/repository/extras/intel/addon.xml
//   Validate XML: https://dl.google.com/android/repository/extras/intel/addon.xml
//   Parse XML:    https://dl.google.com/android/repository/extras/intel/addon.xml
//   Fetching URL: https://dl.google.com/android/repository/sys-img/android/sys-img.xml
//   Validate XML: https://dl.google.com/android/repository/sys-img/android/sys-img.xml
//   Parse XML:    https://dl.google.com/android/repository/sys-img/android/sys-img.xml
//   Fetching URL: https://dl.google.com/android/repository/sys-img/android-wear/sys-img.xml
//   Validate XML: https://dl.google.com/android/repository/sys-img/android-wear/sys-img.xml
//   Parse XML:    https://dl.google.com/android/repository/sys-img/android-wear/sys-img.xml
//   Fetching URL: https://dl.google.com/android/repository/sys-img/android-tv/sys-img.xml
//   Validate XML: https://dl.google.com/android/repository/sys-img/android-tv/sys-img.xml
//   Parse XML:    https://dl.google.com/android/repository/sys-img/android-tv/sys-img.xml
//   Fetching URL: https://dl.google.com/android/repository/sys-img/google_apis/sys-img.xml
//   Validate XML: https://dl.google.com/android/repository/sys-img/google_apis/sys-img.xml
//   Parse XML:    https://dl.google.com/android/repository/sys-img/google_apis/sys-img.xml
// Packages available for installation or update: 170
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