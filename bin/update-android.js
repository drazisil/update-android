#!/usr/bin/env node

/**
 * Module dependencies.
 */

var updateAndroid = require('../lib/index.js')
var packageJson = require('../package.json')
const commandLineCommands = require('command-line-commands')
 
const validCommands = [ null, 'list', 'update', 'help', 'version' ]
try {
	const { command, argv } = commandLineCommands(validCommands)
  updateAndroid.processCmd(command, JSON.stringify(argv))
} catch (err) {
  if (err.name === 'INVALID_COMMAND') {
    console.log('moo')
    process.exit()
  } else {
    console.dir(err)
    process.exit(1)
  }
}
