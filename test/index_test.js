var should = require('chai').should()
var updateAndroid = require('../lib/index.js')

describe('check urls', function() {
  it('should have a valid root xml url', function(done) {
    updateAndroid.addonListUrl.should.equal('https://dl.google.com/android/repository/addons_list-2.xml')
    done();
  })
})