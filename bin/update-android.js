#!/usr/bin/env node

/**
 * Module dependencies.
 */

var updateAndroid = require('../lib/index.js')
var packageJson = require('../package.json')
 
updateAndroid.processCmd(updateAndroid.parseCmds(process.argv))