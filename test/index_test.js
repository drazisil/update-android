var should = require('chai').should()
var updateAndroid = require('../lib/index.js')

describe('check functions', function() {
  it('parseArgs() should remove first two values from an array', function(done) {
    updateAndroid.parseCmds(['a', 'b', 'c', 'd']).should.eql(['c', 'd'])
    done();
  })
  it('parseArgs() should return empty array if passed only two values', function(done) {
    updateAndroid.parseCmds(['a', 'b']).should.eql([])
    done();
  })})

describe('check urls', function() {
  it('addonListFile should be a valid root xml url', function(done) {
    updateAndroid.addonListFile.should.equal('addons_list-2.xml')
    done();
  })
})