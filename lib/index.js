var config = require('../config.json')
var packageJson = require('../package.json')
var sdk = require('./sdk.js')
var winston= require('winston')
var glob = require("glob")

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'info' }),
      new (winston.transports.File)({
        filename: 'update-android.log',
        level: 'warn'
      })
    ]
  })

function parseCmds(args) {
  // remove the first two values
  args.shift()
  args.shift()

  return args
}

function processCmd(cmds) {
  if (cmds.length === 0) {
    // no commands provided
    console.log(showHelp())
    process.exit()
  }

  var cmd = cmds.shift()
	switch (cmd) {
    case 'help':
      processCmdHelp(cmds)
      break
		case 'list':
      processCmdList(cmds)
		  break
    case 'search':
      findAndroidSDK()
      break
    case 'update':
      console.log('TODO')
      break
    case 'version':
    case '--version':
      console.log(packageJson.name + ': ' + packageJson.version)
      break
    default:
      console.log(showHelp())
      process.exit()
	}
}

function processCmdHelp(cmds) {
  if (cmds.length === 0) {
    // no commands provided
    console.log(showHelp())
    process.exit()
  }

  var cmd = cmds.shift()
  switch (cmd) {
    case 'list':
      console.log(showHelpList())
      process.exit()
      break
    case 'update':
      console.log('TODO')
      break
    default:
      console.log(showHelp())
      process.exit()
  }
}

function processCmdList(cmds) {
  if (cmds.length === 0) {
    // no commands provided
    console.log(showHelpList())
    process.exit()
  }

  var cmd = cmds.shift()
  switch (cmd) {
    case 'sdk':
      sdk.list(cmds)
      break
    case 'ndk':
      ndk.list(cmds)
      break
    default:
      console.log(showHelpList())
      process.exit()
  }
}

function showHelp() {
  var help = "Usage: update-android list <options>\n" +
             "       update-android update <options>\n"
  return help
}

function showHelpList() {
  var help = "Usage: update-android list sdk <options>\n" +
             "       update-android list ndk <options>\n" +
             "\n" +
             "Options:\n" +
             "\n" +
             "    --all\t\tAll\n" +
             "    --extended\t\tExtended\n"
  return help
}

function findAndroidSDK() {
  // options is optional
  glob("/opt/**/android", function (er, files) {
    console.log(files)
  })
  glob("/usr/local/**/android", function (er, files) {
    console.log(files)
  })
  glob("/Users/drazisil/Library/Android/**/android", function (er, files) {
    console.log(files)
  })
}



module.exports = {
	addonListUrl: config.addonListUrl,
  parseCmds: parseCmds,
  processCmd: processCmd
}