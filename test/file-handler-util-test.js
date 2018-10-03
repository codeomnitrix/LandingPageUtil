const expect = require('chai').expect;
const fs = require('fs');
const rimraf = require('rimraf');

var extractionUtil = require('../lib/extraction-util');
var fileHandlerUtil = require('../lib/file-handler-util');

describe("file-handler-util for file movement", function() {
    var dirName = "";
    before(function(done) {
        extractionUtil.extract(__dirname + "/temp/Archive.zip", __dirname + "/temp", function(dir) {
            dirName = dir;
            done();
        })
    })

    it("js file should be moved to js folder", function(done) {
        fileHandlerUtil.moveFileViaExtension(dirName, "bootstrap.min.js", __dirname + "/temp", function(fileName) {
            expect(fs.readdirSync(__dirname + "/temp/js")[0] == fileName);
            done();
        });
    });

    it("css file should be moved to css folder", function(done) {
        fileHandlerUtil.moveFileViaExtension(dirName, "style.css", __dirname + "/temp", function(fileName) {
            expect(fs.readdirSync(__dirname + "/temp/css")[0] == fileName);
            done();
        });
    });

    it("html file should be moved base folder", function(done) {
        fileHandlerUtil.moveFileViaExtension(dirName, "index.html", __dirname + "/temp", function(fileName) {
            expect(fs.readdirSync(__dirname + "/temp").indexOf(fileName) > -1);
            done();
        });
    });

    after(function(done) {
        if (dirName != "") 
            rimraf(dirName, function(err){});
        rimraf(__dirname + "/temp/js", function(err){});
        rimraf(__dirname + "/temp/css", function(err){});
        rimraf(__dirname + "/temp/assets", function(err){});
        rimraf(__dirname + "/temp/*.html", function(err){});
        done();
    })
})