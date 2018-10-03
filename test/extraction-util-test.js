const expect = require('chai').expect;
const fs = require('fs');
const rimraf = require('rimraf');

var extractionUtil = require('../lib/extraction-util');
describe("extraction-util-test for zip extraction", function() {
    it("It should extract zip at temp folder", function(done) {
        extractionUtil.extract(__dirname + "/temp/Archive.zip", __dirname + "/temp", function(dir) {
            expect(fs.readdirSync(dir).length).to.be.eq(3);
            rimraf(dir, function(err){console.log(err)});
            done();
        });
    });
});