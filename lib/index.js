var config = require('../config.json')
var packageJson = require('../package.json')
var winston= require('winston')

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'info' }),
      new (winston.transports.File)({
        filename: 'update-android.log',
        level: 'warn'
      })
    ]
  });

function processCmd(cmd, opts) {
	switch (cmd) {
		case 'list':
		  break
    case 'update':
      break
    case 'version':
      console.log(packageJson.name + ': ' + packageJson.version)
      break
    case null:
      opts = JSON.parse(opts)
      switch (opts[0]) {
        case '--version':
          console.log(packageJson.name + ': ' + packageJson.version)
          break
        default:
          console.dir(opts + ' ' + opts.length)
      }
      break
    default:
      logger.error('How did you get here?!')
	}
}

module.exports = {
	addonListUrl: config.addonListUrl,
  processCmd: processCmd
}