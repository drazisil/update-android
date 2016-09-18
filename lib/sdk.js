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
  // var sitesUrl = config.googleSdkSite + config.addonListFile

  // fetchXml(sitesUrl, function a (err, res) {
  //   if (err) {
  //     console.error(err)
  //   }
  //   parseXml(sitesUrl, res)
  // })

  var repoUrl = config.googleSdkSite + config.repositoryFile

  fetchXml(repoUrl, function a (err, res) {
    if (err) {
      console.error(err)
    }
    parseRepoXml(repoUrl, res)
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

function parseRepoXml(url, xml) {
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
    console.log("\tListing platforms:")
    var platforms = result['sdk:sdk-repository']['sdk:platform']
    var p
    console.log("\t" + platforms.length + " found:")
    for (var i = 0; i < platforms.length; i++) {
      p = platforms[i]
      console.log("\t\t" + p['sdk:description'][0] + "\t\t" + config.googleSdkSite + p['sdk:archives'][0]['sdk:archive'][0]['sdk:url'])
    }

    console.log("\tListing build-tools:")
    var build_tools = result['sdk:sdk-repository']['sdk:build-tool']
    var b, b_version
    console.log("\t" + build_tools.length + " found:")
    for (var j = 0; j < build_tools.length; j++) {
      b = build_tools[j]
      b_version = b['sdk:revision'][0]['sdk:major'] + '.' + 
                b['sdk:revision'][0]['sdk:minor'] + '.' + 
                b['sdk:revision'][0]['sdk:micro']
      console.log("\t\t SDK Build Tools " + b_version + "\t\t" + config.googleSdkSite + b['sdk:archives'][0]['sdk:archive'][0]['sdk:url'])
    }

    console.log("\tListing tools:")
    var tools = result['sdk:sdk-repository']['sdk:tool']
    var t, t_version
    console.log("\t" + tools.length + " found:")
    for (var j = 0; j < tools.length; j++) {
      t = tools[j]
      t_version = t['sdk:revision'][0]['sdk:major'] + '.' + 
                t['sdk:revision'][0]['sdk:minor'] + '.' + 
                t['sdk:revision'][0]['sdk:micro']
      console.log("\t\t SDK Tools " + t_version + "\t\t" + config.googleSdkSite + t['sdk:archives'][0]['sdk:archive'][0]['sdk:url'])
    }
  })
}

function update(options) {
  console.log('moo')
}

module.exports = {
  list: list,
  update: update
}